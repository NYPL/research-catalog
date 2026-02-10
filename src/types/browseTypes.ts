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

export interface BrowseQueryParams {
  q?: string
  sort?: BrowseSort
  sort_direction?: SortOrder
  search_scope?: BrowseScope
  page?: string
}

export type DiscoveryContributorResult =
  | DiscoveryVariantContributorResult
  | DiscoveryPreferredContributorResult

export type DiscoveryVariantContributorResult = {
  "@type": string
  termLabel: string
  preferredTerms?: DiscoveryPreferredTermResult[]
}

export type DiscoveryPreferredContributorResult = {
  "@type": string
  termLabel: string
  count?: number
  roleCounts?: ContributorRole[]
  seeAlso?: DiscoveryPreferredTermResult[]
  earlierHeadings?: DiscoveryPreferredTermResult[]
  laterHeadings?: DiscoveryPreferredTermResult[]
}

export type ContributorRole = {
  role: string
  count: number
}

export type ContributorLink = {
  url: string
  termLabel: string
  count?: string
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

export type VariantContributor = {
  termLabel: string
  preferredTerms?: ContributorLink[]
}

export interface PreferredContributor extends ContributorLink {
  seeAlso?: { label: string; terms: ContributorLink[] }
  earlierHeadings?: { label: string; terms: ContributorLink[] }
  laterHeadings?: { label: string; terms: ContributorLink[] }
}

export interface PreferredSubject extends SubjectLink {
  seeAlso?: { label: string; terms: SubjectLink[] }
  narrowerTerms?: { label: string; terms: SubjectLink[] }
  broaderTerms?: { label: string; terms: SubjectLink[] }
}

export type Subject = PreferredSubject | VariantSubject
export type Contributor = PreferredContributor | VariantContributor
