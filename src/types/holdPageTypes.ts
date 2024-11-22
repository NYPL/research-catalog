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

export interface HoldRequestDetailsParams {
  requestId: string
  patronId: string
}

export interface PatronEligibilityStatus {
  eligibility: boolean
  expired?: boolean
  blocked?: boolean
  moneyOwed?: boolean
  ptypeDisallowsHolds?: boolean
  reachedHoldLimit?: boolean
  hasIssues?: boolean
}

export interface HoldPostResult {
  status: HTTPStatusCode
  pickupLocation?: NYPLocationKey | "edd"
  requestId?: string
  errorMessage?: string
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

export type EDDPageStatus = null | "failed" | "unavailable" | "invalid"

export interface EDDStatusMessage {
  heading?: string
  message: string
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
