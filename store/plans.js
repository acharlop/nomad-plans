import { StoreDB } from '@/services/firebase'

const defaultState = {
  mine: [],
  friends: [],
}

export const state = () => defaultState
export const getters = {}
export const mutations = {
  setPlans(state, payload) {
    state.mine = payload
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
    StoreDB.collection('plans')
      .where('userId', '==', rootState.auth.user.userId)
      .onSnapshot((querySnapshot) => {
        const plans = []
        querySnapshot.forEach((plan) => {
          plans.push({
            ...plan.data(),
            id: plan.id,
          })
        })
        commit('setPlans', plans)
      })
  },
}
