import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customerId: ''
  },
  getters: {
  },
  mutations: {
    setCustomerId (state, customerId) {
      state.customerId = customerId
    }
  },
  actions: {
  },
  modules: {
  }
})
