/* eslint-disable @typescript-eslint/naming-convention */
import type { HTTPStatusCode } from "./appTypes"
import type { DiscoveryBibResult } from "./bibTypes"
import type { Aggregation } from "./filterTypes"

type Language = string
type SubjectLiteral = string
type ContributorLiteral = string
type CreatorLiteral = string
type Issuance = string
type FormatFilter = string
type BuildingLocationFilter = string
type CollectionFilter = string

export interface SearchFilters {
  format?: FormatFilter | FormatFilter[]
  language?: Language | Language[]
  subjectLiteral?: SubjectLiteral | SubjectLiteral[]
  contributorLiteral?: ContributorLiteral | ContributorLiteral[]
  creatorLiteral?: CreatorLiteral | CreatorLiteral[]
  issuance?: Issuance | Issuance[]
  dateFrom?: string
  dateTo?: string
  buildingLocation?: BuildingLocationFilter | BuildingLocationFilter[]
  division?: CollectionFilter | CollectionFilter[]
  collection?: CollectionFilter | CollectionFilter[] //HM
}

export interface Identifiers {
  issn?: string
  isbn?: string
  oclc?: string
  lccn?: string
}

export interface SearchParams extends AdvancedSearchQueryParams {
  q?: string
  field?: string
  sortBy?: SortKey
  order?: SortOrder
  filters?: SearchFilters
  journalTitle?: string
  page?: number
  identifiers?: Identifiers
}

export type SortKey = "relevance" | "title" | "date"
export type SortOrder = "asc" | "desc"

export interface SearchResultsResponse {
  status: HTTPStatusCode
  results?: DiscoverySearchResults
  aggregations?: DiscoveryAggregationResults
  page?: number
}

export interface DiscoveryAggregationResults {
  totalResults: number
  itemListElement: Aggregation[]
}
export interface DiscoverySearchResults {
  totalResults: number
  itemListElement: DiscoverySearchResultsElement[]
}

export interface DiscoverySearchResultsElement {
  result?: DiscoveryBibResult
  field?: string
}

export interface SearchFormInputField {
  name: string
  label: string
}

export type SearchFormActionType =
  | "input_change"
  | "filter_change"
  | "form_reset"

export interface SearchFormAction {
  type: SearchFormActionType
  field?: string
  payload: SearchParams | SearchFilters | string | string[]
}

export interface AdvancedSearchQueryParams {
  callnumber?: string
  standard_number?: string
  contributor?: string
  title?: string
  subject?: string
}

export interface SearchQueryParams
  extends Identifiers,
    AdvancedSearchQueryParams {
  q?: string
  sort?: SortKey
  sort_direction?: SortOrder
  search_scope?: string
  page?: string
}
