import { apiClient } from "@/_config"
import { API } from "@/_lib/constants"
import { BaseResponse } from "@/_lib/types"
import { Message, Room } from "@/_lib/types/schema"

export const roomService = {
  getCurrentChatUserRoom: async () => {
    return await apiClient.get<BaseResponse<Room>>(API.ROOM.CHAT_USER.GET)
  },
  getRoomMessages: async (roomId: string) => {
    return await apiClient.get<BaseResponse<Message[]>>(API.ROOM.GET_MESSAGES(roomId))
  }
}
