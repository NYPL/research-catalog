export interface ElectronicResource {
  title?: string
}

export interface BibResponse {
  bib: []
}

export interface BibParams {
  id: string
  itemFrom?: number
  filterItems?: string
}
