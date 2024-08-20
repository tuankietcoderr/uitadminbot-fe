import { EAuthStrategy, ERole } from "@/_lib/enums"

export type User = {
  _id?: string
  role: ERole
  authStrategy: EAuthStrategy
  createdAt?: string | Date
}

export type Admin = {
  email: string
  name: string
  avatar: string | null
  password?: string
  isEmailVerified?: boolean
  isBanned?: boolean
} & User

export type ChatUser = {} & User
