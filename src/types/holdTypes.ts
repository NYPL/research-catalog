import type { NYPLocationKey } from "./locationTypes"
import type { HTTPStatusCode } from "./appTypes"

export interface HoldRequestParams {
  bibId: string
  itemId: string
  patronId: string
  source: string
  pickupLocation: NYPLocationKey | "edd"
  searchKeywordsQuery?: string
}

export interface HoldResponse {
  status: HTTPStatusCode
  redirectUrl?: string
}

export interface DiscoveryHoldPostParams {
  patron: string
  record: string
  nyplSource: string
  requestType: "edd" | "hold"
  recordType: "i"
  pickupLocation?: NYPLocationKey | "edd"
  numberOfCopies: number
  // TODO: make this EDD form content object
  docDeliveryData?: string
}
