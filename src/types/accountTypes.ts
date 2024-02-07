export interface SierraMyAccount {
  checkouts: SierraCheckout[]
  holds: SierraHold[]
  patron: SierraPatron
  fines: SierraFine
}

export interface SierraCheckout {
  id: string
  patron: string
  item: string
  dueDate: string
  numberOfRenewals: number
  outDate: string
  callNumber: string
  barcode: string
}

export interface SierraHold {
  id: string
  record: string
  frozen: boolean
  canFreeze: boolean
  placed: string
  notWantedBeforeDate: string
  pickupLocation: SierraCodeName
  status: SierraCodeName
  recordType: string
  priority: number
  pickupByDate: string
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
