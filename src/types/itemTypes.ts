/* eslint-disable @typescript-eslint/naming-convention */
export interface SearchResultsItem {
  "@id": string
  idNyplSourceId: ItemSourceID
  accessMessage: ItemAccessMessage[]
}

export interface ItemAccessMessage {
  "@id"?: string
  prefLabel?: string
}

export interface ItemSourceID {
  "@type": string
  "@value": string
}
