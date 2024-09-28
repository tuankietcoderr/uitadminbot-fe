import { ColumnType } from "@/_components/CustomTable"

export type SuggestionColumnKey = "question" | "actions"
export const suggestionColumns: ColumnType<SuggestionColumnKey>[] = [
  {
    label: "Gợi ý",
    key: "question"
  },
  {
    label: "Hành động",
    key: "actions"
  }
]
