export interface SierraAccountData {
  checkouts: SierraCheckout[]
  holds: SierraHold[]
  patron: SierraPatron
  fines: SierraFine
  checkoutBibData: SierraBibEntry[]
  holdBibData: SierraBibEntry[]
}

export interface SierraCheckout {
  id: string
  patron: string
  item: SierraItem
  dueDate: string
}

export interface Phone {
  number: string
  type: string
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
  pickupLocation: SierraCodeName
  pickupByDate: string
  patron: string
  recordType: string
}

export interface SierraRecord {
  id?: string
  title?: string
  bibIds: string[]
  barcode: string
  callNumber: string
}

export interface SierraPatron {
  fixedFields?: Record<string, { label: string; value: string }>
  id?: number
  names?: string[]
  barcodes?: string[]
  expirationDate?: string
  emails?: string[]
  homeLibrary?: SierraCodeName
  phones?: { number: string; type: string }[]
}

export interface Checkout {
  callNumber: string | null
  barcode: string
  dueDate: string
  id: string | null
  isResearch: boolean
  patron: string | null
  title: string
  bibId?: string
  isNyplOwned: boolean
  catalogHref: string
}

export interface SierraCodeName {
  code: string
  name: string
}

export interface Hold {
  pickupByDate: string | null
  id: string | null
  canFreeze: boolean
  pickupLocation: SierraCodeName
  isResearch: boolean
  status: string
  frozen: boolean
  patron: string | null
  title: string
  bibId: string
  isNyplOwned: boolean
  catalogHref: string
}

export interface Patron {
  notificationPreference: string
  name: string
  barcode: string
  formattedBarcode?: string
  expirationDate: string
  emails: string[]
  homeLibrary: SierraCodeName
  phones: Phone[]
  id: number
}

export interface SierraPatron {
  fixedFields?: Record<string, { label: string; value: string }>
  id?: number
  names?: string[]
  barcodes?: string[]
  expirationDate?: string
  emails?: string[]
  homeLibrary?: SierraCodeName
  phones?: { number: string; type: string }[]
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
  materialType: {
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

export type BibDataMapType = Record<
  string,
  { title: string; isResearch: boolean; isNyplOwned: boolean }
>
