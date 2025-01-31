/* eslint-disable @typescript-eslint/naming-convention */
import type { DiscoveryItemResult, JSONLDValue } from "./itemTypes"
import type { AnnotatedMarc } from "./bibDetailsTypes"
import type { Aggregation, ItemFilterQueryParams } from "./filterTypes"
import type { HTTPStatusCode } from "./appTypes"

export interface DiscoveryBibResult {
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
  numItemsMatched?: number
  items?: DiscoveryItemResult[]
  itemAggregations?: Aggregation[]
  parallelTitleDisplay?: string[]
  supplementaryContent?: SupplementaryContent[]
  contributorLiteral?: string[]
  holdings?: object
  owner?: { "@id": string; prefLabel: string }
  subjectHeadings?: SubjectHeading[]
  hasItemDates?: boolean
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
  label?: string
  url: string
}

export interface ElectronicResource {
  title?: string
  url?: string
  prefLabel?: string
}

export interface BibResponse {
  discoveryBibResult?: DiscoveryBibResult
  annotatedMarc?: AnnotatedMarc
  status: HTTPStatusCode
  redirectUrl?: string
}

export interface BibQueryParams extends ItemFilterQueryParams {
  id?: string
  features?: string
  item_page?: number
  items_size?: number
  items_from?: number
  all_items?: boolean
  batch_size?: number
}

export type SubjectHeading = {
  label?: string
  uuid?: string
  bib_count?: number
  desc_count?: number
}
