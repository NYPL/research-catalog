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

export interface AnnotatedMarc {
  bib: { id: string; nyplSource: string; fields: AnnotatedMarcField[] }
}

export interface AnnotatedMarcField {
  label: string
  values: AnnotatedMarcFieldValue[]
}

export interface AnnotatedMarcFieldValue {
  label?: string
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
