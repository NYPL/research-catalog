/* eslint-disable @typescript-eslint/naming-convention */

// Item structure coming from the Search Results API response
export interface SearchResultsItem {
  "@id"?: string
  idNyplSourceId?: ItemSourceID
  accessMessage?: ItemAccessMessage[]
  shelfMark?: string[]
  electronicLocator?: string[]
  status?: ItemStatus[]
  enumerationChronology?: string[]
  formatLiteral: string[]
  holdingLocation: ItemLocation[]
}

export interface ItemAccessMessage {
  "@id"?: string
  prefLabel?: string
}

export interface ItemSourceID {
  "@type": string
  "@value": string
}

export interface ItemStatus {
  "@id"?: string
  prefLabel?: string
}

export interface ItemLocation {
  "@id"?: string
  prefLabel?: string
  customerCode?: string
  branchEndpoint?: ItemLocationEndpoint
}

export type ItemLocationKey = "Schwarzman" | "Performing" | "Schomburg"

export type ItemLocationEndpoint = "schwarzman" | "lpa" | "schomburg"
