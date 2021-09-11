import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalMovies: 0,
    input: ''
  },
  mutations: {
    searchingResults (state, data) {
      state.totalMovies = Math.ceil(data / 10)
    },
    getInput (state, text) {
      state.input = text
    }
  },
  actions: {
  },
  modules: {
  }
})
