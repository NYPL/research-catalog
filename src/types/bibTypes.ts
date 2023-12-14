export interface ElectronicResource {
  title?: string
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
  id: string
  itemsFrom?: number
  itemFilterQuery?: string
}
