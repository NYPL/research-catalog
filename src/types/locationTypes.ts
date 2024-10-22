import type { HTTPStatusCode } from "./appTypes"

export interface DeliveryLocationsResponse {
  deliveryLocations?: DeliveryLocation[]
  eddRequestable?: boolean
  status: HTTPStatusCode
}

export interface DeliveryLocation {
  address: string
  shortName: string
  label: string
}

export type NYPLocationKey = "lpa" | "schwarzman" | "schomburg" | "all"

export interface DiscoveryLocationsResult {
  itemListElement?: DiscoveryLocationItem[]
}

export interface DiscoveryLocationItem {
  eddRequestable?: boolean
  deliveryLocation?: DiscoveryLocationElement[]
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface DiscoveryLocationElement {
  "@id"?: string
  prefLabel?: string
}
