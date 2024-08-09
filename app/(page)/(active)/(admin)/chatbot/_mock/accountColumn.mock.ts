import { ColumnType } from "@/_components/CustomTable"

export type AccountColumnKey = "email" | "status" | "createdAt" | "actions" | "name"
export const accountColumns: ColumnType<AccountColumnKey>[] = [
  {
    label: "Email",
    key: "email"
  },
  {
    label: "Tên",
    key: "name"
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
