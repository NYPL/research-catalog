import type { HTTPStatusCode } from "./appTypes"
import type { SortOrder } from "./searchTypes"

export type BrowseSort = "termLabel" | "count"
export type BrowseScope = "has" | "starts_with"

export interface BrowseParams {
  q?: string
  page?: number
  sortBy?: string
  order?: string
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
  sort_direction?: SortOrder
  search_scope?: BrowseScope
  page?: string
}

export type DiscoverySubjectResult =
  | DiscoveryVariantSubjectResult
  | DiscoveryPreferredSubjectResult

export type DiscoveryPreferredTermResult = { termLabel: string; count?: number }

export type DiscoveryVariantSubjectResult = {
  "@type": string
  termLabel: string
  preferredTerms?: DiscoveryPreferredTermResult[]
}

export type DiscoveryPreferredSubjectResult = {
  "@type": string
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
