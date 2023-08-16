export interface DRBQueryParams {
  query: string[]
  page: number
  source: string
  sort?: string
  size?: number
  filter?: DRBFilters
}

export type DRBFilters = string[]

interface DRBDetails {
  count: number
  value: string
}

interface DRBWork {
  title?: string
}

export interface DRBResultsAPIResponse {
  facets?: {
    formats?: DRBDetails[]
    govDoc?: DRBDetails[]
    languages?: DRBDetails[]
  }
  paging?: {
    currentPage?: number
    firstPage?: number
    lastPage?: number
    nextPage?: number
    previousPage?: number
    recordsPerPage?: number
  }
  totalWorks?: number
  works?: DRBWork[]
}

export interface DRBResultsResponse {
  response?: DRBResultsAPIResponse
  researchNowQueryString?: string
}
