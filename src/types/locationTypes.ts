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

export interface DiscoveryLocationsResult {
  itemListElement?: DiscoveryLocationItem[]
}

/* eslint-disable @typescript-eslint/naming-convention */

export interface DiscoveryLocationItem {
  eddRequestable?: boolean
  deliveryLocation?: DiscoveryLocationElement[]
}

export interface DiscoveryLocationElement {
  "@id"?: string
  prefLabel?: string
}

export interface LocationDetails {
  id: string
  "full-name": string
  "short-name": string
  symbol: string
  slug: string
  phone: string
  uri: string
  address: LocationAddress
  hours: LocationHours[]
}

interface LocationAddress {
  address1: string
  address2: string
  city: string
  "postal-code": string
  latitude: number
  longitude: number
  "map-embed-uri": string
}

interface LocationHours {
  day: string
  open?: string
  close?: string
  closed?: boolean
}
