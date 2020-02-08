import { auth, FacebookAuthProvider } from '~/services/firebase'

const empty = undefined

const defaultState = {
  user: {
    displayName: empty,
    email: empty,
    photoURL: empty,
    providerId: empty,
    facebookUID: empty,
    userId: empty,
  },
  isAuthenticated: false,
  isLoading: false,
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
      userId: payload.uid,
    }
  },
  setLoggedIn(state, payload) {
    state.isAuthenticated = payload
  },
  resetUser(state) {
    state.user = defaultState.user
  },
  setLoading(state, payload) {
    state.isLoading = payload
  },
}

export const actions = {
  signInWithFacebook({ commit }) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true)
      auth
        .signInWithPopup(FacebookAuthProvider)
        .then((response) => {
          commit('setUser', response.user)
          commit('setLoggedIn', true)
          commit('setLoading', false)
          resolve()
        })
        .catch((error) => {
          commit('setLoading', false)
          reject(error)
        })
    })
  },

  signInAutomatic({ commit }) {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          commit('setUser', user)
          commit('setLoggedIn', true)
        }

        resolve(!!user)
      })
    })
  },

  signOut({ commit }) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true)

      auth
        .signOut()
        .then(() => {
          commit('resetUser')
          commit('setLoggedIn', false)
          commit('setLoading', false)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
