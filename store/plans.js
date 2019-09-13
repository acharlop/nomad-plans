const date = new Date()

const defaultState = {
  mine: [],
  friends: [
    {
      id: 1,
      place: 'Chaing Mai, Thailand',
      startAt: date,
      endAt: date,
      description:
        'Will stay there for a month or two at most. Although when I get there I usually end up wanting to stay longer.',
      friends: [],
      confirmed: false,
    },
  ],
}

export const state = () => defaultState
export const getters = {}
export const mutations = {
  addPlan(state, payload) {
    state.mine.push(payload)
  },
}
export const actions = {
  createPlan({ commit, state }, plan) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('addPlan', { ...plan, friends: [], id: state.mine.length + 1 })
        resolve()
      }, 2000)
    })
  },
}
