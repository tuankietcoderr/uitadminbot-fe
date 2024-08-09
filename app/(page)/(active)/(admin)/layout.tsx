import { FETCH } from "@/_config"
import { API, APP_ROUTES, COOKIES_KEY } from "@/_lib/constants"
import { ERole } from "@/_lib/enums"
import { Admin } from "@/_lib/types/schema"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"

const layout = async ({ children }: PropsWithChildren) => {
  const cookieData = cookies()
  const accessToken = cookieData.get(COOKIES_KEY.ACCESS_TOKEN)

  if (!accessToken) {
    redirect(APP_ROUTES.AUTH.LOGIN)
  }
  const res = await FETCH.get<Admin>(API.AUTH.ME, {
    cookies
  })

  if (!res.success) {
    redirect(APP_ROUTES.AUTH.LOGIN)
  }

  if (res.data.role === ERole.CHAT_USER) {
    redirect(APP_ROUTES.AUTH.LOGIN)
  }

  if (res.data.isBanned) {
    return (
      <div className='flex h-full items-center justify-center p-4 md:p-8'>
        <h1 className='text-2xl font-semibold'>Tài khoản của bạn đã bị khóa</h1>
      </div>
    )
  }

  return <div className='h-full overflow-auto p-4 md:p-8'>{children}</div>
}

export default layout
