import { Admin } from "@/_lib/types/schema"
import { useMutation } from "@tanstack/react-query"
import { LoginRequestDto } from "./auth.dto"
import { authService } from "./auth.service"

export const useCreateChatUserMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await authService.registerChatUser()
      return res.data
    }
  })
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (formData: LoginRequestDto) => {
      const res = await authService.login(formData)
      return res.data
    }
  })
}

export const useBanAdminMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await authService.banAdmin(id)
      return res.data
    }
  })
}

export const useCreateAdminMutation = () => {
  return useMutation({
    mutationFn: async (data: Pick<Admin, "email" | "name" | "password">) => {
      const res = await authService.createAdmin(data)
      return res.data
    }
  })
}
