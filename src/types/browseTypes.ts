import type { HTTPStatusCode } from "./appTypes"

export type SortDirection = "asc" | "desc"
export type BrowseSort = "relevance" | "preffedTerm" | "count"
export type BrowseScope = "has" | "starts_with"

export interface BrowseParams {
  q?: string
  page?: number
  sort?: BrowseSort
  sortDirection?: SortDirection
  searchScope?: BrowseScope
}

export interface DiscoverySubjectsResponse {
  status: HTTPStatusCode
  subjects: DiscoverySubjectResult[]
}

export interface BrowseQueryParams {
  q?: string
  sort?: BrowseSort
  sort_direction?: SortDirection
  search_scope?: BrowseScope
  page?: string
}

export type DiscoverySubjectResult = {
  preferredTerm: string
  count: number
  uri: string
  variants?: string[]
  narrowerTerms?: string[]
  broaderTerms?: string[]
}
