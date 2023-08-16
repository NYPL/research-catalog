import type { SearchResultsAPIResponse } from "./searchTypes"

export interface DRBQueryParams {
  query: string[]
  page: number
  source: string
  sort?: string
  size?: string
  filter?: DRBFilters
}

export type DRBFilters = string[]

export interface DRBResultsResponse {
  response?: SearchResultsAPIResponse
  researchNowQueryString?: string
}
