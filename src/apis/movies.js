import axios from 'axios'
const baseURL = 'https://www.omdbapi.com/'
const axiosInstance = axios.create({
  baseURL: baseURL
})

export default {
  getMovies ({ keyword }) {
    return axiosInstance.get(`?apikey=752b08a&s=${keyword}`)
  },
  getMoviesByPage ({ keyword, page }) {
    return axiosInstance.get(`?apikey=752b08a&s=${keyword}&page=${page}`)
  },
  getMoviesByType ({ keyword, type }) {
    return axiosInstance.get(`?apikey=752b08a&s=${keyword}&type=${type}`)
  },
  getMovieDetail ({ id }) {
    return axiosInstance.get(`?apikey=752b08a&i=${id}&plot=full`)
  }
}
