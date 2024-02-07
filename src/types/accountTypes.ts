export interface SierraAccountData {
  checkouts: SierraCheckout[]
  holds: SierraHold[]
  patron: SierraPatron
  fines: SierraFines
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
  frozen: string
  placed: string
  notWantedBeforeDate: string
  pickupLocation: SierraLocation
  status: SierraLocation
  recordType: string
  priority: number
}

export interface SierraPatron {
  id: number
  names: string[]
  barcodes: string[]
  expirationDate: string
  emails: string[]
  homeLibrary: SierraLocation
  phones: { number: string; type: string }[]
}

export interface SierraFines {
  total: number
  entries: []
}

export interface Checkout {
  callNumber: string
  barcode: string
  dueDate: string
  id: string
  isResearch?: boolean
}

export interface SierraLocation {
  code: string
  name: string
}

export interface Hold {
  barcode: string
  pickUpByDate: string
  id: string
  canFreeze: boolean
  pickUpLocation: string
  isResearch?: boolean
  status: string
}

export interface Patron {
  name: string
  barcode: string
  expirationDate: string
  emails: string[]
  homeLibrary: string
  phones: string[]
  patronId: string
}

export interface Fine {
  total: string
  entries: string[]
}
