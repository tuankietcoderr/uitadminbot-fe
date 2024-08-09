import { FETCH } from "@/_config"
import { API } from "@/_lib/constants"
import { ERole } from "@/_lib/enums"
import { Admin } from "@/_lib/types/schema"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const layout = async ({ children }: any) => {
  const res = await FETCH.get<Admin>(API.AUTH.ME, {
    cookies
  })

  if (res.success && res.data.role !== ERole.SUPER_ADMIN) {
    redirect("/403")
  }

  return children
}

export default layout
