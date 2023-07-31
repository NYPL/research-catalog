export type RCPage = "search" | "shep" | "account" | ""

export interface SearchFilters {
  materialType?: string[]
  language?: string[]
  subjectLiteral?: string[]
  dateAfter: string
  dateBefore: string
}

export interface IdentifierNumbers {
  issn?: string
  isbn?: string
  oclc?: string
  lccn?: string
  redirectOnMatch?: string
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
