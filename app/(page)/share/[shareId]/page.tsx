import { FETCH } from "@/_config"
import { API, COOKIES_KEY } from "@/_lib/constants"
import { Share, User } from "@/_lib/types/schema"
import { Spinner } from "@nextui-org/react"
import { Metadata, ResolvingMetadata } from "next"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import TopInfo from "./_components/TopInfo"

const ChatList = dynamic(() => import("./_components/ChatList"), {
  ssr: true,
  loading: () => <Spinner />
})

export async function generateMetadata({ params }: any, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.shareId

  return {
    title: `UITAdminBot | Share - ${id}`,
    description: `Share room with id ${id}`
  }
}

const page = async ({ params }: any) => {
  const shareId = params.shareId
  const res = await FETCH.get<Share>(API.SHARE.GET_SHARED_ROOM(shareId), {
    cache: "no-cache"
  })

  const cookieData = cookies()
  const accessToken = cookieData.get(COOKIES_KEY.ACCESS_TOKEN)

  let user: User | null = null

  if (accessToken) {
    const res = await FETCH.get<User>(API.AUTH.ME, {
      cookies
    })

    if (res.success) {
      user = res.data
    }
  }

  if (!res.success) {
    redirect(`/${res.statusCode}`)
  }

  const share = res.data!
  const isOwner = user && user._id === share.owner

  const messages = share.messages || []
  const { isExpired, isShared } = share
  return (
    <div>
      <TopInfo share={share} isOwner={!!isOwner} />
      {(isOwner || (!isExpired && isShared)) && <ChatList messages={messages} />}
    </div>
  )
}

export default page
