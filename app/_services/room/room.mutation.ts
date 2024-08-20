import { useMutation } from "@tanstack/react-query"
import { roomService } from "./room.service"

export const useDeleteRoomMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await roomService.deleteRoom()
      return res.data
    }
  })
}
