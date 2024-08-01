import { apiClient } from "@/_config"
import { API } from "@/_lib/constants"
import { BaseResponse } from "@/_lib/types"
import { Asset } from "@/_lib/types/schema"

export const assetService = {
  getAll: async (type: string, keyword: string, page: number = 1, limit: number = 10) => {
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
