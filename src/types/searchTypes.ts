// TODO: These should eventually outline the allowed string values for each filter
type MaterialType = string
type Language = string
type SubjectLiteral = string
type ContributorLiteral = string
type Issuance = string

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
  page?: string
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
  page?: string
  per_page?: string
}

type SearchFormField = { value: string }

export interface SearchFormEvent {
  q?: SearchFormField
  search_scope?: SearchFormField
  contributor?: SearchFormField
  subject?: SearchFormField
  language?: SearchFormField
  dateBefore?: SearchFormField
  dateAfter?: SearchFormField
  materialType?: SearchFormField
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
