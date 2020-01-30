import { StoreDB } from '@/services/firebase'
import Place from '~/models/place'

const defaultState = {
  mine: [],
  friends: [],
  editId: undefined,
  highlightId: undefined,
  filters: {
    hidePast: false,
    hideUnconfirmed: false,
  },
  isLoading: false,
}

export const state = () => defaultState
export const getters = {
  editPlan(state) {
    return state.mine.filter((plan) => plan.id === state.editId)[0]
  },
  plannedDates(state) {
    const dates = []

    state.mine.forEach((plan) => {
      if (state.editId !== plan.id) {
        dates.push({ startAt: plan.startAt, endAt: plan.endAt })
      } else {
        dates.push()
      }
    })

    return dates.filter((d) => d)
  },
  highlightedPlanIndex(state) {
    if (!state.mine.length || !state.highlightId) return undefined

    const index = state.mine.findIndex((plan) => plan.id === state.highlightId)

    return index >= 0 ? index : undefined
  },
  myFilteredPlans(state) {
    const { hidePast, hideUnconfirmed } = state.filters
    const today = new Date().toISOString().split('T')[0]

    return state.mine
      .filter((plan) => !hideUnconfirmed || plan.confirmed)
      .filter((plan) => !hidePast || plan.endAt >= today)
  },
}
export const mutations = {
  setPlans(state, payload) {
    state.mine = payload
  },
  setPlanEditId(state, payload) {
    state.editId = payload
  },
  removePlanEditId(state) {
    state.editId = undefined
  },
  setHighlightedId(state, payload) {
    state.highlightId = state.highlightId = payload
  },
  toggleHighlightedId(state, payload) {
    state.highlightId = state.highlightId === payload ? undefined : payload
  },
  setUnconfirmedFilter(state, payload) {
    state.filters.hideUnconfirmed = payload
  },
  setPastFilter(state, payload) {
    state.filters.hidePast = payload
  },
  setLoading(state, payload) {
    state.isLoading = payload
  },
}

export const actions = {
  createPlan({ rootState, state }, plan) {
    return StoreDB.collection('plans').add({
      userId: rootState.auth.user.userId,
      ...plan,
    })
  },
  getPlans({ commit, rootState }) {
    commit('setLoading', true)

    StoreDB.collection('plans')
      .where('userId', '==', rootState.auth.user.userId)
      .orderBy('startAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const plans = []
        // build plans array from response
        querySnapshot.forEach((plan) => {
          plans.push({
            ...plan.data(),
            id: plan.id,
            place: new Place(plan.data().place),
          })
        })
        commit('setPlans', plans)
        commit('setLoading', false)
      })
  },
  editPlan({ state }, plan) {
    return StoreDB.collection('plans')
      .doc(state.editId)
      .set(plan, { merge: true })
  },
  confirmPlan({ state }, planId) {
    const plan = { confirmed: true }

    return StoreDB.collection('plans')
      .doc(planId)
      .set(plan, { merge: true })
  },
  deletePlan({ state }) {
    return StoreDB.collection('plans')
      .doc(state.editId)
      .delete()
  },
}
