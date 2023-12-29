import type { ElectronicResource } from "./bibTypes"
import type { DRBResults } from "./drbTypes"
import type { SearchResultsItem } from "./itemTypes"

type Language = string
type SubjectLiteral = string
type ContributorLiteral = string
type Issuance = string
type MaterialTypeFilter = string

type MaterialType = {
  value?: string
  prefLabel?: string
}

export interface SearchFilters {
  materialType?: MaterialTypeFilter | MaterialTypeFilter[]
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
  q?: string
  field?: string
  sortBy?: SortKey
  order?: SortOrder
  filters?: SearchFilters
  contributor?: string
  title?: string
  subject?: string
  page?: number
  identifiers?: Identifiers
}

export type SortKey = "relevance" | "title" | "date"
export type SortOrder = "asc" | "desc"

type SearchFormField = { value: string }

export interface SearchResultsResponse {
  results?: SearchResults
  aggregations?: SearchResults
  drbResults?: DRBResults
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

/* eslint-disable @typescript-eslint/naming-convention */

export interface SearchQueryParams extends Identifiers {
  q?: string
  contributor?: string
  title?: string
  subject?: string
  filters?: SearchFilters
  sort?: SortKey
  sort_direction?: SortOrder
  sort_scope?: string
  search_scope?: string
  page?: string
  per_page?: string
}

export interface SearchFormEvent {
  q?: SearchFormField
  search_scope?: SearchFormField
  title?: SearchFormField
  contributor?: SearchFormField
  subject?: SearchFormField
  language?: SearchFormField
  dateBefore?: SearchFormField
  dateAfter?: SearchFormField
  materialType?: SearchFormField
}

interface Note {
  "@type": string
  noteType: string
  prefLabel: string
}

export interface SearchResult {
  extent?: string[]
  dimensions?: string[]
  note?: Note[]
  identifier: object[]
  subjectLiteral?: string[]
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
  items?: SearchResultsItem[]
  parallelTitleDisplay?: string[]
  supplementaryContent?: SupplementaryContent[]
  contributorLiteral?: string[]
}

export interface ProcessedSearchResult extends SearchResult {
  compressedSubjectLiteral: string[]
  groupedNotes: object
  extent?: string[]
  dimensions?: string[]
  holdings?: object
}

export interface AnnotatedMarc {
  id: string
  nyplSource: string
  fields: AnnotatedMarcField[]
}

export interface AnnotatedMarcField {
  label: string
  values: AnnotatedMarcFieldValue[]
}

interface SupplementaryContent {
  "@type": string
  label: string
  url: string
}

export interface AnnotatedMarcFieldValue {
  content: string
  source: {
    fieldTag: string
    marcTag: string
    ind1?: string
    ind2?: string
    content: string | null
    subfields: MarcSubfield[]
  }
}

export interface MarcSubfield {
  tag: string
  content: string
}
