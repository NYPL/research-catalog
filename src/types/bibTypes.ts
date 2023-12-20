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
  itemsFrom?: number
  itemFilterQuery?: string
  features?: string[]
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface BibQueryParams {
  features?: string
  item_page?: number
  items_from?: number
}
