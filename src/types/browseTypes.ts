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
  | DiscoveryVariantSubjectResult
  | DiscoveryPreferredSubjectResult

export type DiscoveryPreferredTermResult = { label: string; count?: number }

export type DiscoveryVariantSubjectResult = {
  termLabel: string
  preferredTerms?: DiscoveryPreferredTermResult[]
}

export type DiscoveryPreferredSubjectResult = {
  termLabel: string
  count: number
  uri: string
  seeAlso?: DiscoveryPreferredTermResult[]
  narrowerTerms?: DiscoveryPreferredTermResult[]
  broaderTerms?: DiscoveryPreferredTermResult[]
}

export type SubjectLink = {
  url: string
  termLabel: string
  count?: string
}

export type VariantSubject = {
  termLabel: string
  preferredTerms?: SubjectLink[]
}

export interface PreferredSubject extends SubjectLink {
  seeAlso?: { label: string; terms: SubjectLink[] }
  narrowerTerms?: { label: string; terms: SubjectLink[] }
  broaderTerms?: { label: string; terms: SubjectLink[] }
}

export type Subject = PreferredSubject | VariantSubject
