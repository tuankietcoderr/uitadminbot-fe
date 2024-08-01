"use client"
import { useGetRoomMessagesQuery } from "@/_services/room/room.query"
import { useMessageStore } from "@/_store"
import { Spinner } from "@nextui-org/react"
import { useEffect, useMemo } from "react"
import ChatItem from "./ChatItem"
import EmptyRoomMessages from "./EmptyRoomMessages"

type Props = {
  roomId: string
}

const ChatList = ({ roomId }: Props) => {
  const { data, isLoading } = useGetRoomMessagesQuery(roomId)
  const { messages, setMessages } = useMessageStore()

  const _messages = useMemo(() => data?.data || [], [data])

  useEffect(() => {
    setMessages(_messages)
  }, [_messages, setMessages])

  return (
    <div className='flex size-full max-h-full justify-center overflow-auto p-4'>
      <div className='w-full max-w-3xl space-y-4 pt-40'>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center gap-2'>
            <Spinner className='m-auto' size='lg' />
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : messages.length > 0 ? (
          messages.map((message) => <ChatItem key={message._id} message={message} />)
        ) : (
          <EmptyRoomMessages />
        )}
        <div id='last-message' className='h-40' />
      </div>
    </div>
  )
}

export default ChatList
