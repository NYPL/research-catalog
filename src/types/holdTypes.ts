import type { NYPLocationKey } from "./locationTypes"
import type { HTTPStatusCode } from "./appTypes"

export interface HoldRequestParams {
  itemId: string
  patronId: string
  source: string
  pickupLocation: NYPLocationKey | "edd"
}

export interface EDDRequestParams extends HoldRequestParams {
  pickupLocation: "edd"
  email: string
  startingNumber: string
  endingNumber: string
  chapter: string
  author?: string
  publicationDate?: string
  volume?: string
  issue?: string
  notes?: string
}

export interface HoldPostResult {
  status: HTTPStatusCode
  pickupLocation?: NYPLocationKey | "edd"
  requestId?: string
}

export interface DiscoveryHoldPostParams {
  patron: string
  record: string
  nyplSource: string
  requestType: "edd" | "hold"
  recordType: "i"
  pickupLocation?: NYPLocationKey | "edd"
  numberOfCopies?: number
  // TODO: make this EDD form content object
  docDeliveryData?: string
}

export interface EDDFormAction {
  type: EDDFormActionType
  field?: string
  payload: HoldRequestParams | string | string[]
}

export interface EDDFormValidatedField {
  key: string
  isInvalid: boolean
}

export type EDDFormActionType = "input_change"
