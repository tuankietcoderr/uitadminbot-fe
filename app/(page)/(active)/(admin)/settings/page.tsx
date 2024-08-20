import { COOKIES_KEY } from "@/_lib/constants"
import { ERole } from "@/_lib/enums"
import { parseJwt } from "@/_lib/utils"
import { cookies } from "next/headers"
import Title from "../_components/Title"
import Settings from "./_components/Settings"

const page = () => {
  const cookie = cookies()
  const accessToken = cookie.get(COOKIES_KEY.ACCESS_TOKEN)
  const { role } = parseJwt(accessToken?.value!)

  const isSuperAdmin = role === ERole.SUPER_ADMIN
  return (
    <div>
      <Title>Cài đặt hệ thống</Title>
      <Settings isSuperAdmin={isSuperAdmin} />
    </div>
  )
}

export default page
