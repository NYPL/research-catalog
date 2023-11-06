/* eslint-disable @typescript-eslint/naming-convention */

// Item structure coming from the Search Results API response
export interface SearchResultsItem {
  "@id": string
  idNyplSourceId?: ItemSourceID
  accessMessage?: JSONLDValue[]
  shelfMark?: string[]
  status?: JSONLDValue[]
  enumerationChronology?: string[]
  formatLiteral?: string[]
  idBarcode?: string[]
  holdingLocation?: ItemLocation[]
  aeonUrl?: string[]
  physRequestable?: boolean
  eddRequestable?: boolean
}

export interface JSONLDValue {
  "@id": string
  prefLabel?: string
}

export interface ItemSourceID {
  "@type": string
  "@value": string
}

export interface ItemLocation extends JSONLDValue {
  customerCode?: string
  endpoint?: ItemLocationEndpoint
}

export type ItemLocationKey = "Schwarzman" | "Performing" | "Schomburg"

export type ItemLocationEndpoint = "schwarzman" | "lpa" | "schomburg"
