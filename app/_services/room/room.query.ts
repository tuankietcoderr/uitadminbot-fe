import { QUERY_KEY } from "@/_lib/constants"
import { useQuery } from "@tanstack/react-query"
import { roomService } from "./room.service"

export const useGetChatUserRoomQuery = (isEnabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEY.ROOM.GET_CHAT_USER],
    queryFn: async () => {
      const res = await roomService.getCurrentChatUserRoom()
      return res.data
    },
    enabled: isEnabled
  })
}

export const useGetRoomMessagesQuery = (roomId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.ROOM.GET_MESSAGES, roomId],
    queryFn: async () => {
      const res = await roomService.getRoomMessages(roomId)
      return res.data
    }
  })
}
