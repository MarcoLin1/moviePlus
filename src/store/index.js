import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalMovies: 0,
    input: '',
    showModal: false,
    showData: false,
    isLoading: false,
    typeValue: '',
    nowPage: 0,
    movie: {
      title: '',
      year: '',
      type: '',
      rating: '',
      description: '',
      image: ''
    },
    movies: []
  },
  mutations: {
    searchingResults (state, data) {
      state.totalMovies = Math.ceil(data / 10)
    },
    showTable (state) {
      state.showData = true
    },
    closeTable (state) {
      state.showData = false
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
    },
    nowIsLoading (state) {
      state.isLoading = !state.isLoading
    },
    getType (state, data) {
      state.typeValue = data
    },
    getPageNum (state, data) {
      state.nowPage = data
    },
    getMovies (state, data) {
      state.movies = data
    }
  },
  actions: {
  },
  modules: {
  }
})
