import { Admin } from "../types/schema"

export type CreateAdminAccountRequestDto = {
  authKey: string
} & Admin

export type CreateAdminAccountResponseDto = {
  accessToken: string
  refreshToken: string
  user: Admin
}

export type RefreshTokenResponseDto = {
  accessToken: string
  refreshToken: string
}
