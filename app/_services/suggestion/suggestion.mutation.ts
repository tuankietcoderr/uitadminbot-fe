import { useMutation } from "@tanstack/react-query"
import { suggestionService } from "./suggestion.service"

export const useCreateSuggestionMutation = () => {
  return useMutation({
    mutationFn: async (q: string) => {
      const res = await suggestionService.create(q)
      return res.data
    }
  })
}

export const useDeleteSuggestionMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await suggestionService.delete(id)
      return res.data
    }
  })
}
