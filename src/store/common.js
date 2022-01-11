export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },

  getters: {
    token (state) {
      return state.token
    }
  },

  actions: {
    tokenAct ({ commit }, token) {
      commit('mutationToken', token)
    }
  },

  mutations: {
    mutationToken (state, token) {
      state.token = token
    }
  }
}
