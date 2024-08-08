"use client"
import { SendMessageDto, useSendMessageMutation } from "@/_services/message"
import { useMessageStore } from "@/_store"
import { CanceledError } from "axios"
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

type ChatContextType = {
  content: string
  setContent: (content: string) => void
  sendMessage: (data: SendMessageDto) => void
  hasContent: boolean
  inputRef?: React.RefObject<HTMLTextAreaElement>
  abortResponse: () => void
  isSending: boolean
  nativeScrollToBottom: () => void
  scrollToBottom: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider")
  }
  return context
}

export const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [content, setContent] = useState<string>("")
  const { messages, setMessages } = useMessageStore()
  const hasContent = !!content.trim().length

  const abortControllerRef = useRef<AbortController>(new AbortController())
  const fromSendingMessageRef = useRef(true)

  const sendMessageMutation = useSendMessageMutation(abortControllerRef.current.signal)
  const isSending = sendMessageMutation.isPending

  const nativeScrollToBottom = () => {
    const messagesArea = document.getElementById("last-message")
    messagesArea?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  const scrollToBottom = useCallback(() => {
    if (messages.length === 0 || !fromSendingMessageRef.current) return
    const messagesArea = document.getElementById("last-message")
    messagesArea?.scrollIntoView({ behavior: "instant", block: "end" })
    fromSendingMessageRef.current = false
  }, [messages])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const sendMessage = useCallback(
    (data: SendMessageDto) => {
      if (!hasContent) return
      if (isSending) return

      setContent("")
      fromSendingMessageRef.current = true

      const prevState = messages

      setMessages([
        ...prevState,
        {
          ...data,
          _id: crypto.randomUUID()
        }
      ])

      sendMessageMutation.mutate(data, {
        onSuccess: ({ data }) => {
          fromSendingMessageRef.current = true
          inputRef.current?.focus()
          setMessages([...prevState, data])
        },
        onError: (err: any) => {
          console.log(err)
          setMessages(prevState)
          if (err instanceof CanceledError) {
            return
          }
          inputRef.current?.focus()
          toast.error("Có lỗi xảy ra khi gửi tin nhắn", {
            description: err.response?.data?.message ?? err.message
          })
        }
      })
    },
    [hasContent, isSending, messages, sendMessageMutation, setMessages]
  )

  const abortResponse = () => {
    console.log("aborting...")
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = new AbortController()
    }
  }

  const value: ChatContextType = {
    content,
    setContent,
    sendMessage,
    hasContent,
    inputRef,
    abortResponse,
    isSending,
    nativeScrollToBottom,
    scrollToBottom
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
