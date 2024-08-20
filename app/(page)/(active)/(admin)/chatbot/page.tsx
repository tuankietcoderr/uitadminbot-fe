import { COOKIES_KEY } from "@/_lib/constants"
import { ERole } from "@/_lib/enums"
import { parseJwt } from "@/_lib/utils"
import { cookies } from "next/headers"
import Title from "../_components/Title"
import AccountListData from "./_components/AccountListData"
import IntegrationListData from "./_components/IntegrationListData"

const page = () => {
  const cookie = cookies()
  const accessToken = cookie.get(COOKIES_KEY.ACCESS_TOKEN)
  const { role } = parseJwt(accessToken?.value!)

  const isSuperAdmin = role === ERole.SUPER_ADMIN

  return (
    <div>
      {isSuperAdmin && (
        <>
          <Title>Quản lý tài khoản quản trị chatbot</Title>
          <AccountListData />
        </>
      )}
      <Title className='mt-8'>Quản lý tích hợp chatbot</Title>
      <IntegrationListData />
    </div>
  )
}

export default page
