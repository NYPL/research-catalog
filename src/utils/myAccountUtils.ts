import type { Patron, SierraPatron } from "../types/myAccountTypes"

export const notificationPreferenceMap = {
  z: "Email",
  a: "Print",
  p: "Phone",
  m: "Mobile",
  "-": null,
}

export const buildPatron = (patron: SierraPatron): Patron => {
  const notificationPreference =
    notificationPreferenceMap[patron.fixedFields["268"].value]
  return {
    notificationPreference,
    name: patron.names?.[0],
    barcode: patron.barcodes?.[0],
    expirationDate: patron.expirationDate,
    emails: patron.emails || [],
    phones: patron.phones || [],
    homeLibraryCode: patron.homeLibraryCode || null,
    id: patron.id,
  }
}
