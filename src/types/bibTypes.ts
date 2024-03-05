/* eslint-disable @typescript-eslint/naming-convention */
import type { SearchResultsItem, JSONLDValue } from "./itemTypes"
import type { AnnotatedMarc } from "./bibDetailsTypes"

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
  subjectHeadings?: SubjectHeading[]
}

// export interface Holding {
//   checkInBoxes: {
//     coverage: string
//     position: number
//     type: string
//     shelfMark: string[]
//     status: string
//   }[]
//   holdingStatment: string[]
//   identifier: { type: string; value: string }[]
//   notes: string[]
//   physicalLocation: string[]
//   format: string[]
//   location: { code: string; label: string }[]
//   shelfmark: string[]
//   uri: string
// }

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
  annotatedMarc?: AnnotatedMarc
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

type SubjectHeading = {
  label?: string
  uuid?: string
  bib_count?: 10
  desc_count?: 0
}
