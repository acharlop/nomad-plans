const createConfig = () => ({
  googleMaps: {
    secret: process.env.GOOGLE_MAPS_API_KEY,
  },
  facebook: {
    secret: process.env.FACEBOOK_APP_ID,
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  },
})

const config = createConfig()
console.log(config)
export default config
