import { FETCH } from "@/_config"
import { API, APP_ROUTES, COOKIES_KEY } from "@/_lib/constants"
import { ERole } from "@/_lib/enums"
import { Admin } from "@/_lib/types/schema"
import Cookies from "js-cookie"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"

const layout = async ({ children }: PropsWithChildren) => {
  const cookieData = cookies()
  const accessToken = cookieData.get(COOKIES_KEY.ACCESS_TOKEN)

  if (accessToken) {
    const res = await FETCH.get<Admin>(API.AUTH.ME, {
      cookies
    })
    const user = res.data

    if (user.role === ERole.ADMIN) {
      redirect(APP_ROUTES.ADMIN.ROOT)
    } else {
      Cookies.remove(COOKIES_KEY.ACCESS_TOKEN)
      Cookies.remove(COOKIES_KEY.REFRESH_TOKEN)
    }
  }

  return children
}

export default layout
