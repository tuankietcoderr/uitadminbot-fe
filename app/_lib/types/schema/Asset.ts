import { Admin } from "./User"

export type Asset = {
  _id?: string
  publicId: string
  url: string
  assetType: string
  format: string
  size: number
  originalFilename: string
  uploader: Admin
  createdAt?: Date | string
}
