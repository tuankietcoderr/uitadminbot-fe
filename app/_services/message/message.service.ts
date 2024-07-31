import { apiClient } from "@/_config"
import { API } from "@/_lib/constants"
import { BaseResponse } from "@/_lib/types"
import { Message } from "@/_lib/types/schema"
import { SendMessageDto } from "./message.dto"

export const messageService = {
  sendMessage: async (data: SendMessageDto, signal?: AbortSignal) => {
    return await apiClient.post<BaseResponse<Message>>(API.MESSAGE.SEND, data, {
      signal
    })
  },
  likeMessage: async (messageId: string) => {
    return await apiClient.put<BaseResponse<Message>>(API.MESSAGE.LIKE(messageId))
  },
  dislikeMessage: async (messageId: string) => {
    return await apiClient.put<BaseResponse<Message>>(API.MESSAGE.DISLIKE(messageId))
  }
}
