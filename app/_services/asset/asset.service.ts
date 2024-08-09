import { apiClient } from "@/_config"
import { API } from "@/_lib/constants"
import { IDataFilter } from "@/_lib/interfaces"
import { BaseResponse } from "@/_lib/types"
import { Asset } from "@/_lib/types/schema"

export const assetService = {
  getAll: async (type: string, { keyword = "", page = 1, limit = 10 }: IDataFilter) => {
    return await apiClient.get<BaseResponse<Asset[]>>(API.ASSET.GET_ALL, {
      params: {
        type,
        keyword,
        page,
        limit
      }
    })
  }
}
