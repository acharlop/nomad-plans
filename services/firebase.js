import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp(process.env.firebase)
}

export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase
