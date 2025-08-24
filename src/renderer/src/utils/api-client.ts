import { notifications } from '@mantine/notifications'
import axios from 'axios'
import { showToast } from './common'

export const baseUrl = await window.api.getBaseUrl()

const apiClient = axios.create({
  baseURL: `${baseUrl}/api/`,
  withCredentials: true,
  timeout: 10000
})

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
