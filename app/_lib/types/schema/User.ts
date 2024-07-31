import { EAuthStrategy, ERole } from "@/_lib/enums"

export type User = {
  _id?: string
  role: ERole
  authStrategy: EAuthStrategy
}

export type Admin = {
  email: string
  name: string
  avatar: string | null
  isEmailVerified?: boolean
} & User

export type ChatUser = {} & User
