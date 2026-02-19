import type { HTTPStatusCode } from "./appTypes"
import type { SortOrder } from "./searchTypes"

export type BrowseType = "subjects" | "contributors"
export type BrowseSort = "termLabel" | "count"
export type BrowseScope = "has" | "starts_with"

export interface BrowseParams {
  q?: string
  page?: number
  sortBy?: string
  order?: string
  searchScope?: string
}

export interface BrowseQueryParams {
  q?: string
  sort?: BrowseSort
  sort_direction?: SortOrder
  search_scope?: BrowseScope
  page?: string
}

export interface DiscoverySubjectsResponse {
  status: HTTPStatusCode
  totalResults: number
  subjects: DiscoverySubjectResult[]
}

export interface DiscoveryContributorsResponse {
  status: HTTPStatusCode
  totalResults: number
  contributors: DiscoveryContributorResult[]
}

export type DiscoveryContributorResult =
  | DiscoveryVariantResult
  | DiscoveryPreferredContributorResult

export type DiscoveryVariantResult = {
  "@type": string
  termLabel: string
  preferredTerms?: DiscoveryPreferredTermResult[]
}

export type DiscoveryPreferredContributorResult = {
  "@type": string
  termLabel: string
  count?: number
  roleCounts?: { role: string; count: number }[]
  seeAlso?: DiscoveryPreferredTermResult[]
  earlierHeadings?: DiscoveryPreferredTermResult[]
  laterHeadings?: DiscoveryPreferredTermResult[]
}

export type DiscoverySubjectResult =
  | DiscoveryVariantResult
  | DiscoveryPreferredSubjectResult

export type DiscoveryPreferredTermResult = { termLabel: string; count?: number }

export type DiscoveryPreferredSubjectResult = {
  "@type": string
  termLabel: string
  count: number
  uri: string
  seeAlso?: DiscoveryPreferredTermResult[]
  narrowerTerms?: DiscoveryPreferredTermResult[]
  broaderTerms?: DiscoveryPreferredTermResult[]
}

export type ContributorRole = {
  roleLabel: string
  url: string
  count: number
}

export type TermLink = {
  url: string
  termLabel: string
  count?: string
}

export type Variant = {
  termLabel: string
  preferredTerms?: TermLink[]
}

export interface PreferredContributor extends TermLink {
  roles?: ContributorRole[]
  seeAlso?: { label: string; terms: TermLink[] }
  earlierHeadings?: { label: string; terms: TermLink[] }
  laterHeadings?: { label: string; terms: TermLink[] }
}

export interface PreferredSubject extends TermLink {
  seeAlso?: { label: string; terms: TermLink[] }
  narrowerTerms?: { label: string; terms: TermLink[] }
  broaderTerms?: { label: string; terms: TermLink[] }
}

export type Subject = PreferredSubject | Variant
export type Contributor = PreferredContributor | Variant
