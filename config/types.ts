export type RCPage = "search" | "shep" | "account" | ""

export interface searchParams {
  sortBy?: string
  field?: string
  selectedFilters?: Record<string, Record<string, string>>
  searchKeywords?: string
  contributor?: string
  title?: string
  subject?: string
  page?: string
  clearTitle?: string
  clearSubject?: string
  clearContributor?: string
  identifierNumbers?: Record<string, string>
}
