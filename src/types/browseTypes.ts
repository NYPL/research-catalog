import type { HTTPStatusCode } from "./appTypes"

export type SortDirection = "asc" | "desc"
export type BrowseSort = "relevance" | "preferredTerm" | "count"
export type BrowseScope = "has" | "starts_with"

export interface BrowseParams {
  q?: string
  page?: number
  sort?: string
  sortDirection?: string
  searchScope?: string
}

export interface DiscoverySubjectsResponse {
  status: HTTPStatusCode
  totalResults: number
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

export type DiscoveryPreferredTermResult = { [term: string]: number }

export type DiscoverySubjectVariantResult = {
  variantTerm: string
  preferredTerms?: DiscoveryPreferredTermResult[]
}

export type DiscoverySubjectPreferredResult = {
  preferredTerm: string
  count: number
  uri: string
  seeAlso?: string[]
  narrowerTerms?: string[]
  broaderTerms?: string[]
}

export type VariantSubject = {
  termLabel: string
  preferredTerms?: PreferredTerm[]
}

export type PreferredTerm = {
  url: string
  termLabel: string
  count: string
}

export interface PreferredSubject extends PreferredTerm {
  seeAlso?: { label: string; terms: SubjectLink[] }
  narrowerTerms?: { label: string; terms: SubjectLink[] }
  broaderTerms?: { label: string; terms: SubjectLink[] }
}

export type Subject = PreferredSubject | VariantSubject

export type SubjectLink = {
  url: string
  term: string
}
