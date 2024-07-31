import Image from "next/image"
import { PropsWithChildren } from "react"
import ChatUserTopBar from "./_components/ChatUserTopBar"

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='h-screen max-h-screen'>
      <div className='absolute inset-x-0 top-0 z-[-1] h-screen overflow-hidden'>
        <Image
          src='/beams-basic.png'
          alt='background'
          width={1000}
          height={1000}
          className='pointer-events-none size-full select-none object-cover opacity-50'
          priority
        />
      </div>
      <ChatUserTopBar />
      {children}
    </div>
  )
}

export default layout
