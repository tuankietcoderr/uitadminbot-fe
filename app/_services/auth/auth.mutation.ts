import { useMutation } from "@tanstack/react-query"
import { authService } from "./auth.service"

export const useCreateChatUserMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await authService.registerChatUser()
      return res.data
    }
  })
}
