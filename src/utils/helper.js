import axios from 'axios'

const searchBaseURL = 'https://www.omdbapi.com/?apikey=752b08a&s='

const searchAxiosInstance = axios.create({
  baseURL: searchBaseURL
})

export const apiHelper = searchAxiosInstance
