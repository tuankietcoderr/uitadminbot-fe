import { FETCH } from "@/_config"
import { API, COOKIES_KEY } from "@/_lib/constants"
import { ERole } from "@/_lib/enums"
import { Admin } from "@/_lib/types/schema"
import { cookies } from "next/headers"
import Image from "next/image"
import { PropsWithChildren } from "react"
import AdminSidebar from "./_components/AdminSidebar"
import ChatUserTopBar from "./_components/ChatUserTopBar"

const layout = async ({ children }: PropsWithChildren) => {
  const cookieData = cookies()
  const accessToken = cookieData.get(COOKIES_KEY.ACCESS_TOKEN)

  let user: Admin | null = null

  if (accessToken) {
    const res = await FETCH.get<Admin>(API.AUTH.ME, {
      cookies
    })

    if (res.success) {
      user = res.data
    }
  }

  return (
    <div className='flex max-h-screen min-h-screen flex-col'>
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
      {user && user.role === ERole.CHAT_USER && <ChatUserTopBar />}
      <div className='flex flex-1 overflow-hidden'>
        <AdminSidebar user={user} />
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  )
}

export default layout
