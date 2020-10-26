import { createStore } from 'vuex'

export default createStore({
  state: {
    authenticated: false,
    user: {}
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status;
    },

    setUser(state, data) {
      state.user = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
