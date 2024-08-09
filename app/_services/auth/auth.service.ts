import { apiClient } from "@/_config"
import { API } from "@/_lib/constants"
import { IDataFilter } from "@/_lib/interfaces"
import { BaseResponse } from "@/_lib/types"
import { Admin } from "@/_lib/types/schema"
import { LoginRequestDto, LoginResponseDto, RegisterChatUserResponseDto } from "./auth.dto"

export const authService = {
  refreshToken: async (refreshToken: string) => {
    return await apiClient.post(API.AUTH.REFRESH_TOKEN, { refreshToken })
  },
  login: async (data: LoginRequestDto) => {
    return await apiClient.post<BaseResponse<LoginResponseDto>>(API.AUTH.LOGIN, data)
  },
  registerChatUser: async () => {
    return await apiClient.post<BaseResponse<RegisterChatUserResponseDto>>(API.AUTH.REGISTER.CHAT_USER)
  },
  me: async () => {
    return await apiClient.get<BaseResponse<Admin>>(API.AUTH.ME)
  },
  meServer: async (token: string) => {
    return await apiClient.get<BaseResponse<Admin>>(API.AUTH.ME, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  getAdmins: async ({ keyword = "", page = 1, limit = 10 }: IDataFilter) => {
    return await apiClient.get<BaseResponse<Admin[]>>(API.AUTH.GET_ADMINS, {
      params: {
        keyword,
        page,
        limit
      }
    })
  },
  banAdmin: async (id: string) => {
    return await apiClient.put<BaseResponse<Admin>>(API.AUTH.BAN_ADMIN(id))
  }
}
