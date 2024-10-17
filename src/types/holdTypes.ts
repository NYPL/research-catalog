export interface BarcodeAPIResult {
  itemListElement?: BardcodeAPIItem[]
}

interface BardcodeAPIItem {
  deliveryLocation?: DeliveryLocation[]
  eddRequestable?: boolean
}

interface DeliveryLocation {
  prefLabel?: string
  shortname?: string
}
