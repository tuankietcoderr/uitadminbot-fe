import { FETCH } from "@/_config"
import { API, APP_ROUTES, COOKIES_KEY } from "@/_lib/constants"
import { ERole } from "@/_lib/enums"
import { Admin } from "@/_lib/types/schema"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"
import AdminSidebar from "./_components/AdminSidebar"

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

  const user = res.data

  if (user.role !== ERole.ADMIN) {
    redirect(APP_ROUTES.AUTH.LOGIN)
  }

  return (
    <div className='flex max-h-screen min-h-screen'>
      <AdminSidebar user={user} />
      <div className='flex-1 overflow-auto p-8 md:px-12'>{children}</div>
    </div>
  )
}

export default layout
