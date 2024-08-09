export interface IPaginationOptions {
  page: number
  limit: number
}

export interface IPaginate extends Partial<IPaginationOptions> {
  hasNextPage?: boolean
  hasPrevPage?: boolean
  nextPage?: number | null
  prevPage?: number | null
  totalPages?: number
  totalDocuments?: number
}
