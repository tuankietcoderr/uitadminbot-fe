import { useMutation } from "@tanstack/react-query"
import { CreateIntegrationDto } from "./integration.dto"
import { integrationService } from "./integration.service"

export const useCreateIntegrationMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateIntegrationDto) => {
      const res = await integrationService.create(data)
      return res.data
    }
  })
}

export const useBanIntegrationMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await integrationService.banIntegration(id)
      return res.data
    }
  })
}

export const useDeleteIntegrationMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await integrationService.deleteIntegration(id)
      return res.data
    }
  })
}
