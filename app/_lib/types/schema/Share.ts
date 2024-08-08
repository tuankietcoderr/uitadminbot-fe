import { Message } from "./Message"

export type Share = {
  _id?: string
  owner?: string
  isShared?: boolean
  isExpired?: boolean
  expiredAt?: Date | string
  createdAt?: Date | string
  messages?: Message[]
}
