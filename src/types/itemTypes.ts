/* eslint-disable @typescript-eslint/naming-convention */

// Item structure coming from the Search Results API response

export interface DiscoveryItemResult {
  uri?: string
  idNyplSourceId?: ItemSourceID
  accessMessage?: JSONLDValue[]
  shelfMark?: string[]
  status?: JSONLDValue[]
  enumerationChronology?: string[]
  formatLiteral?: string[]
  idBarcode?: string[]
  holdingLocation?: ItemLocation[]
  aeonUrl?: string[]
  dueDate?: string[]
  physRequestable?: boolean
  specRequestable?: boolean
  requestable?: boolean[]
  eddRequestable?: boolean
  catalogItemType?: JSONLDValue[]
  dateRange?: ItemDateRange[]
  identifier?: ItemSourceID[]
  owner?: JSONLDValue[]
  physicalLocation?: string[]
  recapCustomerCode?: string[]
}

export interface ItemLocation extends JSONLDValue {
  customerCode?: string
  prefLabel?: string
  endpoint?: string
}

export type ItemLocationKey = "Schwarzman" | "Performing" | "Schomburg"

export interface ItemTableParams {
  isDesktop?: boolean
  inSearchResult?: boolean
  isArchiveCollection?: boolean
}

export interface ItemMetadata {
  id?: string
  barcode?: string
  callNumber?: string
  bibId?: string
  volume?: string
  notificationText?: string
}

export interface ItemDateRange {
  gte: string
  lte: string
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface JSONLDValue {
  "@id": string
  prefLabel?: string
}

export interface ItemSourceID {
  "@type": string
  "@value": string
}
