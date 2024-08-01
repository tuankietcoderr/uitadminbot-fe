import { QUERY_KEY } from "@/_lib/constants"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { assetService } from "./asset.service"

export const useGetAllAssetQuery = (type: string, keyword: string, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: [QUERY_KEY.ASSET.GET_ALL, type, keyword, page, limit],
    queryFn: async () => {
      const res = await assetService.getAll(type, keyword, page, limit)
      return res.data
    },
    placeholderData: keepPreviousData
  })
}
