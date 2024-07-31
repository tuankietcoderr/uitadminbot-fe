import { ChatUser } from "./User"

export type Room = {
  _id?: string
  title: string
  creator?: string | ChatUser
}
