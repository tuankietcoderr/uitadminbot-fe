import { QUERY_KEY } from "@/_lib/constants"
import { useQuery } from "@tanstack/react-query"
import { authService } from "./auth.service"

export const useGetMeQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.AUTH.GET_ME],
    queryFn: async () => {
      const res = await authService.me()
      return res.data
    }
  })
}
