const MINE = 'mine'
const FRIENDS = 'friends'

const defaultState = {
  showSideDrawer: true,
  sideDrawerTab: MINE,
  dialogs: {
    legal: false,
    invite: false,
    planForm: false,
  },
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
  showDialogLegal(state) {
    state.dialogs.legal = true
  },
  showDialogInvite(state) {
    state.dialogs.invite = true
  },
  showDialogPlanForm(state) {
    state.dialogs.planForm = true
  },
  closeDialogs(state) {
    Object.keys(state.dialogs).forEach((dialog) => {
      state.dialogs[dialog] = false
    })
  },
}

export const actions = {}
