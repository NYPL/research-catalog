import { Identifiers, SearchFilters } from "./searchTypes"

export interface DRBParams {
  searchKeywords?: string
  field?: string
  sortBy?: string
  order?: string
  selectedFilters?: SearchFilters
  contributor?: string
  title?: string
  subject?: string
  page?: number
  identifiers?: Identifiers
}

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
