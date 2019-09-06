const colors = require('vuetify/es5/util/colors').default
const env = require('dotenv').config()

console.log(process.env.GOOGLE_MAPS_API_KEY)

module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Variables from .env file
   */
  env: {
    ...env.parsed,
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    },
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/google-maps', '~/plugins/local-storage'],
  /*
   ** Router configuration
   */
  router: {
    middleware: 'route-auth',
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    [
      'nuxt-env',
      {
        keys: [
          { key: 'GOOGLE_MAPS_API_KEY', default: env.GOOGLE_MAPS_API_KEY },
          { key: 'FACEBOOK_APP_ID', default: env.FACEBOOK_APP_ID },
          { key: 'FIREBASE_API_KEY', default: env.FIREBASE_API_KEY },
          { key: 'FIREBASE_AUTH_DOMAIN', default: env.FIREBASE_AUTH_DOMAIN },
          { key: 'FIREBASE_DATABASE_URL', default: env.FIREBASE_DATABASE_URL },
          { key: 'FIREBASE_PROJECT_ID', default: env.FIREBASE_PROJECT_ID },
          { key: 'FIREBASE_STORAGE_BUCKET', default: env.FIREBASE_STORAGE_BUCKET },
          { key: 'FIREBASE_MESSAGING_SENDER_ID', default: env.FIREBASE_MESSAGING_SENDER_ID },
        ],
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    splitChunks: {
      layouts: true,
      pages: true,
    },
  },
}
