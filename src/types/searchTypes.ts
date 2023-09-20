import type { ElectronicResource } from "./bibTypes"

type Language = string
type SubjectLiteral = string
type ContributorLiteral = string
type Issuance = string
type MaterialType = {
  prefLabel?: string
}

export interface SearchFilters {
  materialType?: MaterialType | MaterialType[]
  language?: Language | Language[]
  subjectLiteral?: SubjectLiteral | SubjectLiteral[]
  contributorLiteral?: ContributorLiteral | ContributorLiteral[]
  issuance?: Issuance | Issuance[]
  dateAfter?: string
  dateBefore?: string
}

export interface Identifiers {
  issn?: string
  isbn?: string
  oclc?: string
  lccn?: string
}

export interface SearchParams {
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

export interface SearchQueryParams extends Identifiers {
  q?: string
  contributor?: string
  title?: string
  subject?: string
  filters?: SearchFilters
  sort?: string
  sort_direction?: string
  sort_scope?: string
  search_scope?: string
  page?: number
  per_page?: number
}

export interface SearchFormEvent {
  q?: { value: string }
  search_scope?: { value: string }
}

export interface SearchResultsResponse {
  results?: SearchResults
  aggregations?: SearchResults
  page: number
}

export interface SearchResults {
  totalResults: number
  itemListElement: SearchResultsElement[]
}

export interface SearchResultsElement {
  result?: SearchResult
  field?: string
}

export interface SearchResult {
  "@id"?: string
  uri?: string
  titleDisplay?: string[]
  creatorLiteral?: string[]
  title?: string[]
  materialType?: MaterialType[]
  publicationStatement?: string[]
  dateStartYear?: number
  dateEndYear?: number
  electronicResources?: ElectronicResource[]
  numItemsTotal?: number
}
