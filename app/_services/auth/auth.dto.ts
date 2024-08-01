import { Admin, ChatUser } from "@/_lib/types/schema"

export type LoginRequestDto = {
  email: string
  password: string
}

export type LoginResponseDto = {
  accessToken: string
  refreshToken: string
  user: Admin | ChatUser
  accessTokenExpiration: number
  refreshTokenExpiration: number
}

export type RegisterChatUserResponseDto = LoginResponseDto
