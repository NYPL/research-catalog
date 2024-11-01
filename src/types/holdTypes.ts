import type { NYPLocationKey } from "./locationTypes"
import type { HTTPStatusCode } from "./appTypes"

export interface HoldRequestParams {
  itemId: string
  patronId: string
  source: string
  pickupLocation: NYPLocationKey | "edd"
}

export interface HoldPostResult {
  status: HTTPStatusCode
  pickupLocation?: NYPLocationKey | "edd"
  requestId?: string
}

export interface EDDRequestRequiredParams {
  email: string
  startingNumber: string
  endingNumber: string
  chapter: string
}

export type EDDRequestFormActionType = "input_change"

export interface EDDRequestFormAction {
  type: EDDRequestFormActionType
  field?: string
  payload: EDDRequestRequiredParams
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
