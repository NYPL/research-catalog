export interface DeliveryLocation {
  label: string
  address: string
  shortName: string
  eddRequestable: boolean
}

export interface DiscoveryLocationsResult {
  itemListElement?: {
    eddRequestable?: boolean
  }
  deliveryLocation?: DiscoveryLocationElement[]
}

/* eslint-disable @typescript-eslint/naming-convention */

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
