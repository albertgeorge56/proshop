import { notifications } from '@mantine/notifications'
import axios from 'axios'
import { showToast } from './common'

export const port = 3000
export const baseUrl = `http://localhost:${port}`
const apiClient = axios.create({
  baseURL: `${baseUrl}/api/`,
  withCredentials: true,
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
