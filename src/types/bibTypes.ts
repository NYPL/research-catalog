export interface ElectronicResource {
  title?: string
  url?: string
  prefLabel?: string
}

export interface BibResponse {
  bib?: Bib
  annotatedMarc?: []
  status: number
  redirectUrl?: string
}

export interface Bib {
  uri?: string
}

export interface BibParams {
  itemsFrom?: number
  itemFilterQuery?: string
  features?: string[]
}

export interface SubjectHeadingDetail {
  value: Url[][]
  label: string
}

export interface BibDetail {
  // label is the formatted name of the field, such as "Author"
  label: string
  // value is the array of metadata, such as "["Author One", "Author Two"]"
  value: string[]
}

export interface LinkedBibDetail {
  value: Url[]
  // label is the formatted name of the field, such as "Author"
  label: string
  // indicates if a linked bib detail is internal, like a link to a creator
  // literal search, or external, like supplementary content
  link?: "internal" | "external"
}

export interface Url {
  url: string
  urlLabel: string
}

export interface FieldMapping {
  label: string
  field: string
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface BibQueryParams {
  features?: string
  item_page?: number
  items_from?: number
}

