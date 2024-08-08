import { useMutation } from "@tanstack/react-query"
import { shareService } from "./share.service"

export const useCreateShareLinkMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await shareService.createShareLink()
      return res.data
    }
  })
}

export const useCancelShareMutation = () => {
  return useMutation({
    mutationFn: async (link: string) => {
      const res = await shareService.cancelShare(link)
      return res.data
    }
  })
}
