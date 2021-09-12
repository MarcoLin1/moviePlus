import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalMovies: 0,
    input: '',
    showModal: false,
    movie: {
      title: '',
      year: '',
      type: '',
      rating: '',
      description: '',
      image: ''
    }
  },
  mutations: {
    searchingResults (state, data) {
      state.totalMovies = Math.ceil(data / 10)
    },
    getInput (state, text) {
      state.input = text
    },
    openModal (state) {
      state.showModal = true
    },
    closeModal (state) {
      state.showModal = false
    },
    getMovieDetailed (state, data) {
      state.movie = {
        title: data.Title,
        year: data.Year,
        type: data.Type,
        rating: data.imdbRating,
        description: data.Plot,
        image: data.Poster
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
