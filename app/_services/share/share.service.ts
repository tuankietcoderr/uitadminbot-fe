import { apiClient } from "@/_config"
import { API } from "@/_lib/constants"
import { IDataFilter } from "@/_lib/interfaces"
import { BaseResponse } from "@/_lib/types"
import { Share } from "@/_lib/types/schema"

export const shareService = {
  createShareLink: async () => {
    return apiClient.post<BaseResponse<string>>(API.SHARE.CREATE)
  },
  getSharedRoom: async (link: string) => {
    return apiClient.get<BaseResponse<Share>>(API.SHARE.GET_SHARED_ROOM(link))
  },
  cancelShare: async (link: string) => {
    return apiClient.delete<BaseResponse<void>>(API.SHARE.CANCEL_SHARE(link))
  },
  getUserShares: async ({ keyword = "", page = 1, limit = 10 }: IDataFilter) => {
    return apiClient.get<BaseResponse<Share[]>>(API.SHARE.GET_USER_SHARES, {
      params: {
        keyword,
        page,
        limit
      }
    })
  }
}
