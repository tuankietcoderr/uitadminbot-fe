import { EContentType } from "@/_lib/enums"
import { Room } from "./Room"

export type Message = {
  _id?: string
  question: MessageContent
  answer?: MessageContent
  room?: string | Room
  isLiked?: boolean
  isDisliked?: boolean
  session?: string
  createdAt?: Date | string
}

export type MessageExtra = {
  file?: string
}

export type MessageContent = {
  content: string
  contentType: EContentType
  extra?: MessageExtra
}
