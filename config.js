const env = require('dotenv').config()

const base = env.error ? process.env : env.parsed

const config = {
  googleMaps: {
    secret: base.GOOGLE_MAPS_API_KEY,
  },
  facebook: {
    secret: base.FACEBOOK_APP_ID,
  },
  firebase: {
    apiKey: base.FIREBASE_API_KEY,
    authDomain: base.FIREBASE_AUTH_DOMAIN,
    databaseURL: base.FIREBASE_DATABASE_URL,
    projectId: base.FIREBASE_PROJECT_ID,
    storageBucket: base.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: base.FIREBASE_MESSAGING_SENDER_ID,
  },
}

console.log(config)

export default config
