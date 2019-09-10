const MINE = 'mine'
const FRIENDS = 'friends'

const defaultState = {
  showSideDrawer: true,
  sideDrawerTab: MINE,
}

export const state = () => defaultState

export const getters = {}

export const mutations = {
  toggleSideDrawer(state) {
    state.showSideDrawer = !state.showSideDrawer
  },
  toggleSideDrawerTab(state) {
    state.sideDrawerTab = state.sideDrawerTab === MINE ? FRIENDS : MINE
  },
}

export const actions = {}
