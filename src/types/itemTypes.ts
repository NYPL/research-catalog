/* eslint-disable @typescript-eslint/naming-convention */
export interface SearchResultsItem {
  "@id"?: string
  idNyplSourceId?: ItemSourceID
  accessMessage?: ItemAccessMessage[]
  shelfMark?: string[]
  electronicLocator?: string[]
  status?: ItemStatus[]
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
