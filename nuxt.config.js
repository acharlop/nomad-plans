if (process.env.NODE_ENV !== 'production') require('dotenv').config()

module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `Nomad Plans`,
    title: `Nomad Plans`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nomad plans',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
  },
  /*
   ** Variables from .env file
   */
  env: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    facebookAppId: process.env.FACEBOOK_APP_ID,
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
  css: ['~/assets/global.css'],
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
    '@nuxtjs/date-fns',
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
    optionsPath: '~/assets/vuetify.options.js',
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
    transpile: ['vue-clamp', 'resize-detector'],
  },
}
