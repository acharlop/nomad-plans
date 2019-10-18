import { StoreDB } from '@/services/firebase'
import Place from '~/models/place'

const defaultState = {
  mine: [],
  friends: [],
  editId: undefined,
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
      })
  },
  editPlan({ state }, plan) {
    return StoreDB.collection('plans')
      .doc(state.editId)
      .set(plan, { merge: true })
  },
  confirmPlan({ state }, planId) {
    const plan = { confirmation: 1 }

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
