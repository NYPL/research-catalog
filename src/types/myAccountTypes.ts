import type { Dispatch, SetStateAction } from "react"
import type { List } from "./listTypes"
export interface MyAccountPatronData {
  patron?: Patron
  checkouts?: Checkout[]
  holds?: Hold[]
  fines?: Fine
  pickupLocations: SierraCodeName[]
  lists?: List[]
}

export interface PatronDataContextType {
  setPatronDataLoading: Dispatch<SetStateAction<boolean>>
  patronDataLoading: boolean
  setUpdatedAccountData: Dispatch<SetStateAction<MyAccountPatronData>>
  updatedAccountData: MyAccountPatronData
  getMostUpdatedSierraAccountData: () => Promise<void>
}
export interface SierraAccountData {
  checkouts: SierraCheckout[]
  holds: SierraHold[]
  patron: SierraPatron
  fines: SierraFine
  checkoutBibData: SierraBibEntry[]
  holdBibData: SierraBibEntry[]
}

export interface SierraCheckout {
  numberOfRenewals: number
  id: string
  patron: string
  item: SierraItem
  dueDate: string
}

export interface PatronServicesCheckouts {
  total: number
  entries: PatronServicesCheckout[]
}

export interface PatronServicesCheckout {
  dueDate: string
  numberOfRenewals: number
  outDate: string
  id: string
  sierraItem: SierraItem
  platformItem: PlatformItem
  platformBib: PlatformBib
  discoveryUri?: string
}

export interface Phone {
  number: string
  type: string
}

export interface SierraItem {
  id: string
  bibIds: string[]
}

export interface SierraHold {
  id: string
  record: string
  frozen: boolean
  canFreeze: boolean
  status: SierraCodeName
  recordType: string
  placed: string
}

export interface PlatformHold {
  id: string | number
  createdDate: string
  updatedDate: string
  docDeliveryData
}

export interface PlatformItem {
  id: string
  nyplSource: string
  barcode: string
  callNumber: string
  volume: string
}

export interface PlatformBib {
  id: string
  nyplSource: string
  title: string
  author: string
  isResearch: boolean
}

export interface PatronServicesHolds {
  total: number
  entries: PatronServicesHold[]
}

export interface PatronServicesHold {
  requestType: string
  pickupLocation: SierraCodeName
  pickupByDate: string
  sierraHold: SierraHold
  platformHold: PlatformHold
  platformItem: PlatformItem
  platformBib: PlatformBib
  discoveryUri?: string
}

export type FixedField = { label: string; value: "z" | "p" }
export type VarField = { fieldTag: string; content: string }

export interface SierraPatron {
  varFields?: VarField[]
  fixedFields?: Record<"268", FixedField>
  id?: number
  names?: string[]
  barcodes?: string[]
  expirationDate?: string
  emails?: string[]
  homeLibrary?: SierraCodeName
  phones?: { number: string; type: string }[]
}

export interface Checkout {
  numberOfRenewals: number
  callNumber: string | null
  barcode: string
  dueDate: string
  id: string | null
  isResearch: boolean
  patron: string | null
  title: string
  volume: string | null
  bibId?: string
  isNyplOwned: boolean
  catalogHref: string
}

export interface SierraCodeName {
  code: string
  name?: string
}

export interface Hold {
  itemId: string
  pickupByDate: string | null
  id: string | null
  canFreeze: boolean
  pickupLocation: SierraCodeName
  isResearch: boolean
  status: string
  frozen: boolean
  patron: string | null
  title: string
  volume: string | null
  bibId: string
  isNyplOwned: boolean
  catalogHref: string
}

export interface Patron {
  username?: string
  notificationPreference: "z" | "p" | "-"
  name: string
  barcode: string
  formattedBarcode?: string
  expirationDate: string
  emails: string[]
  homeLibrary: SierraCodeName
  phones: Phone[]
  id: number
}

export interface PatronUpdateBody extends Omit<SierraPatron, "homeLibrary"> {
  homeLibraryCode?: string
}

export interface SierraBib {
  total: number
  start: number
  entries: SierraBibEntry[]
}

export interface SierraBibEntry {
  id: string
  updatedDate: string
  createdDate: string
  deleted: boolean
  suppressed: boolean
  isbn?: string
  lang: SierraCodeName
  title: string
  author: string
  recordType: {
    code: string
    value: string
  }
  bibLevel: {
    code: string
    value: string
  }
  publishYear: number
  catalogDate: string
  country: SierraCodeName
  callNumber: string
  varFields?: {
    fieldTag: string
    marcTag?: string
    ind1?: string
    ind2?: string
    subfields?: {
      tag: string
      content: string
    }[]
  }[]
}

export interface SierraFine {
  total: number
  entries: SierraFineEntry[]
}

export interface SierraFineEntry {
  chargeType: { display: string }
  itemCharge: number
  assessedDate: string
  datePaid: string
}

export interface Fine {
  total: number
  entries: {
    detail: string
    amount: number
    date: string
  }[]
}
