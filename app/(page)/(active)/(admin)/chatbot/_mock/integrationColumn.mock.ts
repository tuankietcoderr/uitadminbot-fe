import { ColumnType } from "@/_components/CustomTable"

export type IntegrationColumnKey = "name" | "url" | "createdAt" | "status" | "actions"
export const integrationColumns: ColumnType<IntegrationColumnKey>[] = [
  {
    label: "Tên",
    key: "name"
  },
  {
    label: "URL",
    key: "url"
  },
  {
    label: "Ngày tạo",
    key: "createdAt"
  },
  {
    label: "Trạng thái",
    key: "status"
  },
  {
    label: "Hành động",
    key: "actions"
  }
]
