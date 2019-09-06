import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import config from '~/config'
console.log(JSON.stringify(config, null, 2))
console.log(process)
console.log(process.env)
if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase)
}

export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase
