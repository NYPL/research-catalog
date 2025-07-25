import type { HTTPStatusCode } from "./appTypes"

export type SortDirection = "asc" | "desc"
export type BrowseSort = "relevance" | "preferredTerm" | "count"
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

export type DiscoverySubjectResult =
  | DiscoverySubjectVariantResult
  | DiscoverySubjectPreferredResult

export type VariantSubject = {
  variantTerm: string
  preferredTerms?: PreferredTerm[]
}

export type PreferredSubject = {
  url: string
  preferredTerm: string
  count: string
  //seeAlso: SubjectLink[]
  narrowerTerms: SubjectLink[]
  broaderTerms: SubjectLink[]
}

export type Subject = PreferredSubject | VariantSubject

export type DiscoveryPreferredTermResult = { [term: string]: number }

export type DiscoverySubjectVariantResult = {
  variantTerm?: string
  uri: string
  preferredTerms?: []
}

export type DiscoverySubjectPreferredResult = {
  preferredTerm?: string
  count: number
  uri: string
  seeAlso?: string[]
  narrowerTerms?: string[]
  broaderTerms?: string[]
}

export type SubjectLink = {
  url: string
  term: string
}

export type PreferredTerm = {
  url: string
  term: string
  count: string
}
