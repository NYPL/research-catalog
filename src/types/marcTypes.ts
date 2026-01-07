import type { HTTPStatusCode } from "./appTypes"

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

export interface MarcResponse {
  discoveryMarcResult?: DiscoveryMarcResult
  status: HTTPStatusCode
}

export interface DiscoveryMarcResult {
  bib: Marc
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

export interface MarcDetail {
  // label is the formatted name of the field, such as "Author"
  label: string
  // value is the array of metadata, such as "["Author One", "Author Two"]"
  value: string[]
  // associated marc tags on this field– since this detail comes from the annotated MARC
  marcTags: string[]
}
