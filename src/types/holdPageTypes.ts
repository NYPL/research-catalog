import type { NYPLocationKey } from "./locationTypes"
import type { HTTPStatusCode } from "./appTypes"

export interface HoldRequestParams {
  itemId: string
  patronId: string
  bibId: string
  source: string
  pickupLocation: NYPLocationKey
}

export interface EDDRequestParams {
  itemId: string
  patronId: string
  source: string
  bibId: string
  emailAddress: string
  startPage: string
  endPage: string
  chapterTitle: string
  author?: string
  date?: string
  volume?: string
  issue?: string
  requestNotes?: string
}

export interface HoldPostResult {
  status: HTTPStatusCode
  pickupLocation?: NYPLocationKey
  formInvalid?: boolean
  requestId?: string
  errorMessage?: string
}

export interface HoldDetailsResult {
  status: HTTPStatusCode
  pickupLocation?: NYPLocationKey
  patronId?: string
  requestId?: string
  errorMessage?: string
}

export interface PatronEligibilityStatus {
  expired?: boolean
  moneyOwed?: boolean
  ptypeDisallowsHolds?: boolean
  reachedHoldLimit?: boolean
  status: HTTPStatusCode
}

export interface DiscoveryHoldPostParams {
  patron: string
  record: string
  nyplSource: string
  bibId: number
  requestType: "edd" | "hold"
  recordType: "i"
  pickupLocation?: NYPLocationKey
  numberOfCopies?: number
  // TODO: make this EDD form content object
  docDeliveryData?: EDDRequestParams
}

export type HoldErrorStatus =
  | null
  | "failed"
  | "eddUnavailable"
  | "invalid"
  | "patronIneligible"
  | "serverError"

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
