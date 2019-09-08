import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp(process.env.firebase)
}

const authProvider = new firebase.auth.FacebookAuthProvider()
authProvider.addScope('email')
authProvider.addScope('user_birthday')
authProvider.addScope('user_friends')
authProvider.addScope('user_hometown')
authProvider.addScope('user_location')
authProvider.addScope('user_link')

export const FacebookAuthProvider = authProvider

export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase
