export interface DRBQueryParams {
  query: string[]
  page: number
  source: string
  sort?: string
  size?: number
  filter?: DRBFilters
}

export type DRBFilters = string[]

export interface DRBWork {
  title?: string
  uuid?: string
}

export interface DRBResultsResponse {
  works?: DRBWork[]
  totalWorks?: number
}
