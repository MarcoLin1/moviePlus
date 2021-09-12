import axios from 'axios'

const searchBaseURL = 'http://www.omdbapi.com/?apikey=752b08a&s='

const searchAxiosInstance = axios.create({
  baseURL: searchBaseURL
})

export const apiHelper = searchAxiosInstance
