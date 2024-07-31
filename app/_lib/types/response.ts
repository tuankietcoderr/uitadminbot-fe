import { IPaginate } from "../interfaces"

export interface BaseResponse<Data> extends Partial<IPaginate> {
  success: boolean
  statusCode: number
  message: string
  timestamp: number
  stackTrace?: string
  data: Data
}
