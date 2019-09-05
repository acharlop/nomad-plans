const fs = require('fs')
const path = require('path')
const { Nuxt, Builder } = require('nuxt')

const isDev = process.env.NODE_ENV !== 'production'

let fastifyConfig = {
  logger: {
    prettyPrint: {
      levelFirst: true,
    },
  },
}

const devFastifyConfig = {
  http2: true,
  https: {
    allowHTTP1: true, // fallback support for HTTP1
    key: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.key')),
    cert: fs.readFileSync(path.join(__dirname, '..', 'https', 'fastify.cert')),
    passphrase: '1234',
  },
}

if (isDev) {
  fastifyConfig = { ...fastifyConfig, ...devFastifyConfig }
}
const fastify = require('fastify')(fastifyConfig)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = isDev

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000,
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  fastify.use(nuxt.render)

  fastify.listen(port, host, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}

start()
