import { QUERY_KEY } from "@/_lib/constants"
import { useQuery } from "@tanstack/react-query"
import { suggestionService } from "./suggestion.service"

export const useGetAllSuggestionsQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEY.SUGGESTION.GET_ALL],
    queryFn: async () => {
      const res = await suggestionService.getAll()
      return res.data
    },
    enabled
  })
}
