import { IPaginationOptions } from "./IPaginate"

export interface IDataFilter extends Partial<IPaginationOptions> {
  keyword?: string
}
