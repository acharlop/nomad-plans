import { auth, FacebookAuthProvider } from '~/services/firebase'

const empty = undefined

const defaultState = {
  user: {
    displayName: empty,
    email: empty,
    photoURL: empty,
    providerId: empty,
    facebookUID: empty,
    firebaseUID: empty,
  },
  isAuthenticated: false,
  isNewUser: true,
}

export const state = () => defaultState

export const getters = {
  activeUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return !!state.user.displayName && state.isAuthenticated
  },
}

export const mutations = {
  setUser(state, payload) {
    const newUser = payload.providerData[0]

    state.user = {
      displayName: newUser.displayName,
      email: newUser.email,
      photoURL: newUser.photoURL,
      providerId: newUser.providerId,
      facebookUID: newUser.uid,
      firebaseUID: payload.uid,
    }
  },
  setNewUser(state, payload) {
    state.isNewUser = payload
  },
  setLoggedIn(state, payload) {
    state.isAuthenticated = payload
  },
  resetUser(state) {
    state.user = defaultState.user
  },
}

export const actions = {
  signInWithFacebook({ commit }) {
    return new Promise((resolve, reject) => {
      auth.signInWithPopup(FacebookAuthProvider).then((response) => {
        commit('setUser', response.user)
        commit('setNewUser', false)
        commit('setLoggedIn', true)
        resolve()
      })
    })
  },

  signInAutomatic({ commit }) {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          commit('setUser', user)
          commit('setNewUser', false)
          commit('setLoggedIn', true)
          resolve(true)
        }
        resolve(false)
      })
    })
  },

  signOut({ commit }) {
    return new Promise((resolve, reject) => {
      auth.signOut().then(() => {
        commit('resetUser')
        commit('setLoggedIn', false)
        resolve()
      })
    })
  },
}
