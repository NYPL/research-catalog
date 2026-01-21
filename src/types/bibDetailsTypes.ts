import type { MarcDetail } from "./marcTypes"

export type AnyBibDetail = BibDetail | LinkedBibDetail | SubjectHeadingDetail

export type AnyMarcDetail = MarcDetail | MarcLinkedDetail

export interface SubjectHeadingDetail {
  value: BibDetailURL[][]
  label: string
}

export interface BibDetail {
  // label is the formatted name of the field, such as "Author"
  label: string
  // value is the array of metadata, such as "["Author One", "Author Two"]"
  value: string[]
}

export interface LinkedBibDetail {
  value: BibDetailURL[]
  // label is the formatted name of the field, such as "Author"
  label: string
  // indicates if a linked bib detail is internal, like a link to a creator
  // literal search, or external, like supplementary content
  link?: "internal" | "external"
}

export interface MarcLinkedDetail {
  value: BibDetailURL[]
  // label is the formatted name of the field, such as "Author"
  label: string
  // indicates if a linked bib detail is internal, like a link to a creator
  // literal search, or external, like supplementary content
  link?: "internal" | "external"
  // associated marc tags on this field– since this detail comes from the annotated MARC
  marcTags: string[]
}

export interface BibDetailURL {
  url: string
  urlLabel?: string
}

export interface FieldMapping {
  label: string
  field: string
}
