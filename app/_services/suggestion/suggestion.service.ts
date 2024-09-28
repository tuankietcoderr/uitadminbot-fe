import { apiClient } from "@/_config"
import { API } from "@/_lib/constants"
import { BaseResponse } from "@/_lib/types"

export const suggestionService = {
  getAll: async () => {
    return apiClient.get<
      BaseResponse<
        {
          question: string
        }[]
      >
    >(API.SUGGESTION.GET_ALL)
  },
  create: async (q: string) => {
    return apiClient.post<BaseResponse<string>>(API.SUGGESTION.CREATE, {
      question: q
    })
  },
  delete: async (id: string) => {
    return apiClient.delete<BaseResponse<string>>(API.SUGGESTION.DELETE(id))
  }
}
