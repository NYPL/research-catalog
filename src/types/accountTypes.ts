export interface Checkout {
  callNumber: string
  barcode: string
  dueDate: string
  checkoutId: string
  isResearch: boolean
}

export interface SierraLocation {
  code: string
  name: string
}

export interface Hold {
  barcode: string
  pickUpByDate: string
  holdId: string
  canFreeze: boolean
  pickUpLocation: SierraLocation
  isResearch: boolean
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
