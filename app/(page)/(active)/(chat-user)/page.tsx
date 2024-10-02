"use client"
import { COOKIES_KEY } from "@/_lib/constants"
import { timezoneDate } from "@/_lib/utils"
import { useCreateChatUserMutation, useGetMeQuery } from "@/_services/auth"
import { useGetChatUserRoomQuery } from "@/_services/room"
import { Spinner } from "@nextui-org/react"
import Cookies from "js-cookie"
import { useEffect } from "react"
import ChatArea from "./_components/ChatArea"
import ChatList from "./_components/ChatList"

const page = () => {
  const createChatUserMutation = useCreateChatUserMutation()
  const { isLoading, isError, isSuccess, data } = useGetMeQuery()
  const getUserChatRoomQuery = useGetChatUserRoomQuery(isSuccess)

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (isError) {
      createChatUserMutation.mutate(undefined, {
        onSuccess: ({ data }) => {
          Cookies.set(COOKIES_KEY.ACCESS_TOKEN, data.accessToken, {
            expires: timezoneDate(data.accessTokenExpiration),
            secure: process.env.NODE_ENV === "production"
          })
          Cookies.set(COOKIES_KEY.REFRESH_TOKEN, data.refreshToken, {
            expires: timezoneDate(data.refreshTokenExpiration),
            secure: process.env.NODE_ENV === "production"
          })

          location.reload()
        },
        onError: () => {
          console.log("error")
        }
      })
    }
    return () => {
      createChatUserMutation.reset()
    }
  }, [isError, isLoading])

  const room = getUserChatRoomQuery.data?.data

  const hasError = isError || getUserChatRoomQuery.isError || createChatUserMutation.isError
  const hasSuccess = isSuccess && getUserChatRoomQuery.isSuccess
  const hasLoading = isLoading || getUserChatRoomQuery.isLoading || createChatUserMutation.isPending

  return (
    <div className='flex h-full flex-col'>
      <div className='flex w-full flex-1 overflow-auto md:p-0' id='messages-area'>
        {hasLoading ? <Spinner className='m-auto' size='lg' /> : hasSuccess ? <ChatList roomId={room?._id!} /> : null}
      </div>
      <ChatArea roomId={room?._id!} />
    </div>
  )
}

export default page
