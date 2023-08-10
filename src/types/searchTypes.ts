// TODO: These should eventually outline the allowed string values for each filter
type MaterialType = string
type Language = string
type SubjectLiteral = string
type Issuance = string

export interface SearchFilters {
  materialType?: MaterialType | MaterialType[]
  language?: Language | Language[]
  subjectLiteral?: SubjectLiteral | SubjectLiteral[]
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
  page?: string
  identifiers?: Identifiers
}

export interface QueryParams extends SearchParams, Identifiers {
  per_page?: string
  q?: string
  sort?: string
  sort_direction?: string
  sort_scope?: string
  search_scope?: string
  filters?: SearchFilters
}

export interface SearchFormEvent {
  q: { value: string }
}

export interface SearchResultsResponse {
  results?: SearchResultsAPIResponse
  aggregations?: SearchResultsAPIResponse
  page: string
}

export interface SearchResultsAPIResponse {
  totalResults: number
  itemListElement: SearchResultsItem[]
}

export interface SearchResultsItem {
  result?: {
    uri?: string
  }
  field?: string
}
