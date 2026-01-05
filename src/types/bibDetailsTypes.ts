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

export interface MarcDetail {
  // label is the formatted name of the field, such as "Author"
  label: string
  // value is the array of metadata, such as "["Author One", "Author Two"]"
  value: string[]
  // associated marc tags on this field– since this detail comes from the annotated MARC
  marcTags: string[]
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

export interface AnnotatedMarc {
  id: string
  nyplSource: string
  fields: AnnotatedMarcField[]
}

export interface Marc {
  id: string
  nyplSource: string
  fields: MarcField[]
}

export interface AnnotatedMarcField {
  label: string
  values: AnnotatedMarcFieldValue[]
}

export interface MarcField {
  fieldTag: string
  marcTag: string
  ind1?: string
  ind2?: string
  content: string | null
  subfields: MarcSubfield[]
}

export interface LeaderField {
  fieldTag: string
  content: string
}

export interface ControlField {
  marcTag: string
  content: string
}

export interface AnnotatedMarcFieldValue {
  label?: string
  content: string
  source: MarcField
}

export interface MarcSubfield {
  tag: string
  content: string
}
