import { apiClient } from "@/_config"
import { API } from "@/_lib/constants"
import { IDataFilter } from "@/_lib/interfaces"
import { CreateIntegrationDto } from "./integration.dto"

export const integrationService = {
  create: async (data: CreateIntegrationDto) => {
    return await apiClient.post(API.INTEGRATION.CREATE, data)
  },
  getAll: async ({ keyword = "", page = 1, limit = 10 }: IDataFilter) => {
    return await apiClient.get(API.INTEGRATION.GET_ALL, {
      params: {
        keyword,
        page,
        limit
      }
    })
  },
  banIntegration: async (id: string) => {
    return await apiClient.put(API.INTEGRATION.BAN(id))
  },
  deleteIntegration: async (id: string) => {
    return await apiClient.delete(API.INTEGRATION.DELETE(id))
  }
}
