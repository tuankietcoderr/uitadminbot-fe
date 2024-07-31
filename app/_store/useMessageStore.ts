import { Message } from "@/_lib/types/schema"
import { create } from "zustand"

type MessageAction = {
  setMessages: (messages: Message[]) => void
  likeMessage: (messageId: string, likeState: boolean) => void
  dislikeMessage: (messageId: string, dislikeState: boolean) => void
}

type MessageState = {
  messages: Message[]
}

type MessageStore = MessageState & MessageAction

const initialState: MessageState = {
  messages: []
}

export const useMessageStore = create<MessageStore>((set) => ({
  ...initialState,
  setMessages: (messages: Message[]) => set({ messages }),
  likeMessage: async (messageId: string, likeState: boolean) => {
    set((state) => ({
      messages: state.messages.map((message) => {
        if (message._id === messageId) {
          return {
            ...message,
            isLiked: likeState,
            isDisliked: false
          }
        }
        return message
      })
    }))
  },
  dislikeMessage: async (messageId: string, dislikeState: boolean) => {
    set((state) => ({
      messages: state.messages.map((message) => {
        if (message._id === messageId) {
          return {
            ...message,
            isDisliked: dislikeState,
            isLiked: false
          }
        }
        return message
      })
    }))
  }
}))
