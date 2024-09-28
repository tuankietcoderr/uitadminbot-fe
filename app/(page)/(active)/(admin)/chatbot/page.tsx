import { COOKIES_KEY } from "@/_lib/constants"
import { ERole } from "@/_lib/enums"
import { parseJwt } from "@/_lib/utils"
import { Spinner } from "@nextui-org/react"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import Title from "../_components/Title"
import IntegrationListData from "./_components/IntegrationListData"

const AccountListData = dynamic(() => import("./_components/AccountListData"), {
  ssr: true,
  loading: () => <Spinner />
})

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
      {/* <Title className='mt-8'>Quản lý các gợi ý</Title> */}
      {/* <SuggestionListData /> */}
      <Title className='mt-8'>Quản lý tích hợp chatbot</Title>
      <IntegrationListData />
    </div>
  )
}

export default page
