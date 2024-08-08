import { QUERY_KEY } from "@/_lib/constants"
import { useQuery } from "@tanstack/react-query"
import { shareService } from "./share.service"

export const useGetSharedRoomQuery = (link: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SHARE.GET_SHARED_ROOM, link],
    queryFn: async () => {
      const res = await shareService.getSharedRoom(link)
      return res.data
    }
  })
}
