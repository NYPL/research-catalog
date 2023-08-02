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
  page?: string
  identifierNumbers?: IdentifierNumbers
}

export interface QueryParams extends SearchParams, IdentifierNumbers {
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
  itemListElement: SearchResultsItem[]
}

export interface SearchResultsItem {
  result?: {
    uri?: string
  }
  field?: string
}
