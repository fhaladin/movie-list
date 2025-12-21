import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonmock.hackerrank.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

api.interceptors.response.use(response => {
  return response
}, error => {
  console.error('API Error:', error)
  return Promise.reject(error)
})

export default api