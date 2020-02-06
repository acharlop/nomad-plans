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
      { name: 'apple-mobile-web-app-title', content: 'Nomad Plans' },
      { name: 'application-name', content: 'Nomad Plans' },
      { name: 'msapplication-TileColor', content: '#5a9216' },
      { name: 'theme-color', content: '#ffffff' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nomad plans',
      },
    ],
    link: [
      {
        href: 'https://fonts.googleapis.com/css?family=Secular One',
        rel: 'stylesheet',
      },
      {
        href: 'https://fonts.googleapis.com/css?family=Ubuntu',
        rel: 'stylesheet',
      },

      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
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
  loading: '~/components/loader/index.vue',
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
   * PWA configuration
   */
  // pwa: {
  //   manifest: {
  //     name: 'Nomad Plans',
  //     lang: 'en',
  //   },
  //   icons: {
  //     // https://pwa.nuxtjs.org/modules/icon.html#options
  //   },
  // },
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
