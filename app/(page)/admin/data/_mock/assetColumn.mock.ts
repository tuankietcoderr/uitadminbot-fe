import { ColumnType } from "@/_components/CustomTable"

export type AssetColumnKey = "name" | "uploader" | "createdAt" | "actions"
export const assetColumns: ColumnType<AssetColumnKey>[] = [
  {
    label: "Tên file",
    key: "name"
  },
  {
    label: "Người tải lên",
    key: "uploader"
  },
  {
    label: "Ngày tạo",
    key: "createdAt"
  },
  {
    label: "Hành động",
    key: "actions"
  }
]
