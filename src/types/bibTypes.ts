/* eslint-disable @typescript-eslint/naming-convention */
import type { SearchResultsItem, JSONLDValue } from "./itemTypes"

export interface Bib {
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
  issuance?: JSONLDValue[]
  numItemsTotal?: number
  items?: SearchResultsItem[]
  parallelTitleDisplay?: string[]
  supplementaryContent?: SupplementaryContent[]
  contributorLiteral?: string[]
  holdings?: object
  owner?: { "@id": string; prefLabel: string }
}

type MaterialType = {
  value?: string
  prefLabel?: string
}

export interface Note {
  "@type": string
  noteType: string
  prefLabel: string
}

interface SupplementaryContent {
  "@type": string
  label: string
  url: string
}

export interface ElectronicResource {
  title?: string
  url?: string
  prefLabel?: string
}

export interface BibResponse {
  bib?: Bib
  annotatedMarc?: []
  status: 200 | 307 | 404
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

export interface BibQueryParams {
  features?: string
  item_page?: number
  items_from?: number
}
