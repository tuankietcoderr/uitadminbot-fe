import { useMutation } from "@tanstack/react-query"
import { SendMessageDto } from "./message.dto"
import { messageService } from "./message.service"

export const useSendMessageMutation = (signal?: AbortSignal) => {
  return useMutation({
    mutationFn: async (data: SendMessageDto) => {
      const res = await messageService.sendMessage(data, signal)

      return res.data
    }
  })
}

export const useLikeMessageMutation = () => {
  return useMutation({
    mutationFn: async (messageId: string) => {
      const res = await messageService.likeMessage(messageId)

      return res.data
    }
  })
}

export const useDislikeMessageMutation = () => {
  return useMutation({
    mutationFn: async (messageId: string) => {
      const res = await messageService.dislikeMessage(messageId)

      return res.data
    }
  })
}
