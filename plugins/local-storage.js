import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'nomad-plans',
      paths: ['auth', 'layout'],
    })(store)
  })
}
