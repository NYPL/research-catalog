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

export interface SearchResultsResponse {
  totalResults: number
  itemListElement: Item[]
}
