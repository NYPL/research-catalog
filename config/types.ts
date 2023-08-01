export type RCPage = "search" | "shep" | "account" | ""

export interface Item {
  result: {
    uri: string
  }
}

export interface SearchFilters {
  materialType?: string[]
  language?: string[]
  subjectLiteral?: string[]
  dateAfter?: string
  dateBefore?: string
  issuance?: string[]
}

export interface IdentifierNumbers {
  issn?: string
  isbn?: string
  oclc?: string
  lccn?: string
  redirectOnMatch?: boolean
}

export interface SearchParams {
  sortBy?: string
  field?: string
  selectedFilters?: SearchFilters
  searchKeywords?: string
  contributor?: string
  title?: string
  subject?: string
  page?: string
  clearTitle?: string
  clearSubject?: string
  clearContributor?: string
  identifierNumbers?: IdentifierNumbers
}

export interface SearchQueryParams extends SearchParams, IdentifierNumbers {
  per_page?: string
  q?: string
  sort?: string
  sort_direction?: string
  sort_scope?: string
  search_scope?: string
  filters?: SearchFilters
}

export interface SearchResultsResponse {
  totalResults: number
  itemListElement: Item[]
}
