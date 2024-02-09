export interface SierraAccountData {
  checkouts: SierraCheckout[]
  holds: SierraHold[]
  patron: SierraPatron
  fines: SierraFine
  checkoutTitleMap: Record<string, string>
  holdTitleMap: Record<string, string>
}

export interface SierraCheckout {
  id: string
  patron: string
  item: SierraItem
  dueDate: string
}

export interface SierraItem {
  id: string
  updatedDate: string
  createdDate: string
  deleted: boolean
  bibIds: string[]
  location: SierraCodeName
  status: {
    code: string
    display: string
    duedate: string
  }
  volumes: string[]
  barcode: string
  callNumber: string
}

export interface SierraHold {
  id: string
  record: SierraRecord
  frozen: boolean
  canFreeze: boolean
  status: SierraCodeName
  placed: string
  notWantedBeforeDate: string
  pickupLocation: SierraCodeName
  recordType: string
  priority: number
  pickupByDate: string
  patron: string
}

export interface SierraRecord {
  bibIds: string[]
  barcode: string
  callNumber: string
}

export interface SierraPatron {
  id: number
  names: string[]
  barcodes: string[]
  expirationDate: string
  emails: string[]
  homeLibrary: SierraCodeName
  phones: { number: string; type: string }[]
}

export interface Checkout {
  callNumber: string
  barcode: string
  dueDate: string
  id: string
  isResearch?: boolean
  patron: string
  title: string
}

export interface SierraCodeName {
  code: string
  name: string
}

export interface Hold {
  pickupByDate: string
  id: string
  canFreeze: boolean
  pickupLocation: string
  isResearch?: boolean
  status: string
  frozen: boolean
  patron: string
  title: string
}

export interface Patron {
  name: string
  barcode: string
  expirationDate: string
  primaryEmail: string
  emails: string[]
  homeLibrary: string
  primaryPhone: string
  phones: { number: string; type: string }[]
  id: number
}

export interface SierraFine {
  total: number
  entries: SierraFineEntry[]
}

export interface SierraFineEntry {
  chargeType: { display: string }
  itemCharge: string
  assessedDate: string
  datePaid: string
}

export interface Fine {
  total: number
  entries: {
    detail: string
    amount: string
    date: string
  }[]
}
