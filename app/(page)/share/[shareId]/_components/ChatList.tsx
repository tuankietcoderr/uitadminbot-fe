"use client"
import ChatItem from "@/(page)/(active)/(chat-user)/_components/ChatItem"
import EmptyRoomMessages from "@/(page)/(active)/(chat-user)/_components/EmptyRoomMessages"
import { Message } from "@/_lib/types/schema"

type Props = {
  messages: Message[]
}

const ChatList = ({ messages }: Props) => {
  return (
    <div className='flex size-full max-h-full justify-center overflow-auto p-4'>
      <div className='w-full space-y-4 pt-40'>
        {messages.length > 0 ? (
          messages.map((message) => <ChatItem message={message} key={message._id} canShowActions={false} />)
        ) : (
          <EmptyRoomMessages />
        )}
      </div>
    </div>
  )
}

export default ChatList
