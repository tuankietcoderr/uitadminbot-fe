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
