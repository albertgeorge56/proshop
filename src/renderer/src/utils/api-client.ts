import { notifications } from '@mantine/notifications'
import axios from 'axios'
import { showToast } from './common'

export const port = 3000
const origin = window.location.origin
let url = ''
if (origin.startsWith('file')) {
  url = 'http://localhost'
} else {
  url = `${window.location.origin.split(':')[0]}:${window.location.origin.split(':')[1]}`
}
export const baseUrl = `${url}:${port}`

const apiClient = axios.create({
  baseURL: `${baseUrl}/api/`,
  timeout: 10000
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error: any) => {
    if (error.response?.data) {
      notifications.show({
        color: 'red',
        message: error.response?.data.message
      })
      return Promise.reject(error)
    }

    showToast('Something Went Wrong', false)
    return Promise.reject(error)
  }
)

export default apiClient
