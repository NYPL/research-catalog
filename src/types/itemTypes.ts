// Item structure coming from the Discovery API search response
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
  collection?: Collection[]
  buildingLocation?: JSONLDValue[]
}

export interface Collection {
  "@id": string
  prefLabel?: string
  buildingLocationLabel?: string
  locationsPath?: string
}

export interface ItemLocation extends JSONLDValue {
  customerCode?: string
  prefLabel?: string
  endpoint?: string
  collectionAccessType?: string
}

export type ItemLocationKey = "Schwarzman" | "Performing" | "Schomburg"

export interface ItemTableParams {
  isDesktop?: boolean
  inSearchResult?: boolean
  isArchiveCollection?: boolean
  collection?: Collection
}

export type ItemCollectionAccess = "shelf" | "desk" | "special" | null

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

export interface JSONLDValue {
  "@id": string
  prefLabel?: string
}

export interface ItemSourceID {
  "@type": string
  "@value": string
}
