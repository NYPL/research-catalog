export interface DRBQueryParams {
  query: string[]
  page: number
  source: string
  sort?: string
  size?: number
  filter?: DRBFilters
}

export type DRBFilters = string[]

interface DRBWork {
  title?: string
}

export interface DRBResultsResponse {
  works?: DRBWork[]
  totalWorks?: number
}
