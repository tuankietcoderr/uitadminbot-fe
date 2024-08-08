import { ColumnType } from "@/_components/CustomTable"

export type ShareColumnKey = "_id" | "expiredAt" | "createdAt" | "actions" | "isShared"
export const shareShareColumns: ColumnType<ShareColumnKey>[] = [
  {
    label: "ID",
    key: "_id"
  },
  {
    label: "Ngày tạo",
    key: "createdAt"
  },
  {
    label: "Ngày hết hạn",
    key: "expiredAt"
  },
  {
    label: "Tình trạng",
    key: "isShared"
  },
  {
    label: "Hành động",
    key: "actions"
  }
]
