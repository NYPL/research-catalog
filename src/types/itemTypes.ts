/* eslint-disable @typescript-eslint/naming-convention */

// Item structure coming from the Search Results API response
export interface SearchResultsItem {
  "@id": string
  idNyplSourceId?: ItemSourceID
  accessMessage?: ItemAccessMessage[]
  shelfMark?: string[]
  electronicLocator?: string[]
  status?: ItemStatus[]
  enumerationChronology?: string[]
  formatLiteral: string[]
  identifier?: ItemIdentifier[]
  holdingLocation: ItemLocation[]
  aeonUrl?: string
  physRequestable?: boolean
  eddRequestable?: boolean
}

export interface ItemAccessMessage {
  "@id": string
  prefLabel?: string
}

export interface ItemSourceID {
  "@type": string
  "@value": string
}

export interface ItemStatus {
  "@id": string
  prefLabel?: string
}

export interface ItemLocation {
  "@id": string
  prefLabel?: string
  customerCode?: string
  endpoint?: ItemLocationEndpoint
}

export interface ItemIdentifier {
  "@type": string
  "@value": string
}

export type ItemLocationKey = "Schwarzman" | "Performing" | "Schomburg"

export type ItemLocationEndpoint = "schwarzman" | "lpa" | "schomburg"
