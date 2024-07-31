import { Admin, ChatUser } from "@/_lib/types/schema"

export type LoginResponseDto = {
  accessToken: string
  refreshToken: string
  user: Admin | ChatUser
  accessTokenExpiration: number
  refreshTokenExpiration: number
}

export type RegisterChatUserResponseDto = LoginResponseDto
