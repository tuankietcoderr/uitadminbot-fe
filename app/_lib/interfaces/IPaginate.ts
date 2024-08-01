export interface IPaginate {
  page?: number
  limit?: number
  hasNextPage?: boolean
  hasPrevPage?: boolean
  nextPage?: number | null
  prevPage?: number | null
  totalPages?: number
  totalDocuments?: number
}
