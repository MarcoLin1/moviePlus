import axios from 'axios'

const baseURL = 'http://www.omdbapi.com/?apikey=752b08a&s='

const axiosInstance = axios.create({
  baseURL
})

export const apiHelper = axiosInstance
