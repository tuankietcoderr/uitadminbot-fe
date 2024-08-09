import { QUERY_KEY } from "@/_lib/constants"
import { IDataFilter } from "@/_lib/interfaces"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { assetService } from "./asset.service"

export const useGetAllAssetQuery = (type: string, { keyword = "", page = 1, limit = 10 }: IDataFilter) => {
  return useQuery({
    queryKey: [QUERY_KEY.ASSET.GET_ALL, type, keyword, page, limit],
    queryFn: async () => {
      const res = await assetService.getAll(type, {
        keyword,
        page,
        limit
      })
      return res.data
    },
    placeholderData: keepPreviousData
  })
}
