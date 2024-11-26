/* eslint-disable @typescript-eslint/naming-convention */
import type { DiscoveryBibResult } from "./bibTypes"
import type { DRBResults } from "./drbTypes"
import type { Aggregation } from "./filterTypes"

type Language = string
type SubjectLiteral = string
type ContributorLiteral = string
type CreatorLiteral = string
type Issuance = string
type MaterialTypeFilter = string
type BuildingLocationFilter = string

export interface SearchFilters {
  materialType?: MaterialTypeFilter | MaterialTypeFilter[]
  language?: Language | Language[]
  subjectLiteral?: SubjectLiteral | SubjectLiteral[]
  contributorLiteral?: ContributorLiteral | ContributorLiteral[]
  creatorLiteral?: CreatorLiteral | CreatorLiteral[]
  issuance?: Issuance | Issuance[]
  dateAfter?: string
  dateBefore?: string
  buildingLocation?: BuildingLocationFilter | BuildingLocationFilter[]
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
  results?: SearchResults
  aggregations?: AggregationResults
  drbResults?: DRBResults
  page?: number
}

export interface AggregationResults {
  totalResults: number
  itemListElement: Aggregation[]
}
export interface SearchResults {
  totalResults: number
  itemListElement: SearchResultsElement[]
}

export interface SearchResultsElement {
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
