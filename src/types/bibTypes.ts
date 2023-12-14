export interface ElectronicResource {
  title?: string
}

export interface BibResponse {
  bib: []
  annotatedMarc?: []
}

export interface BibParams {
  id: string
  itemsFrom?: number
  itemFilterQuery?: string
}
