import { COOKIES_KEY, ENV_CONFIG } from "@/_lib/constants"
import { authService } from "@/_services/auth"
import axios from "axios"
import Cookies from "js-cookie"

const apiClient = axios.create({
  baseURL: ENV_CONFIG.BE_URL,
  withCredentials: true
})

apiClient.interceptors.request.use((config) => {
  const accessToken = Cookies.get(COOKIES_KEY.ACCESS_TOKEN)
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: any) => {
    const config = error?.config
    if (error.response?.status === 401 && !config?.sent && error.response?.data?.message === "Access token expired") {
      config.sent = true
      const refreshToken = Cookies.get(COOKIES_KEY.REFRESH_TOKEN)
      if (!refreshToken) {
        return Promise.reject(error)
      }
      return authService
        .refreshToken(refreshToken)
        .then((res) => res.data)
        .then((res) => {
          if (res.success) {
            Cookies.set(COOKIES_KEY.ACCESS_TOKEN, res.data.accessToken)
            Cookies.set(COOKIES_KEY.REFRESH_TOKEN, res.data.refreshToken)
            return apiClient(config)
          }
          return Promise.reject(error)
        })
        .catch((err: any) => {
          if (err.response.status === 401 && err.response?.data?.message === "Refresh token expired") {
            Cookies.remove(COOKIES_KEY.ACCESS_TOKEN)
            Cookies.remove(COOKIES_KEY.REFRESH_TOKEN)
          }
        })
    }
    return Promise.reject(error)
  }
)

export { apiClient }
