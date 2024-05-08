import type { Patron, SierraPatron } from "../types/myAccountTypes"

export const notificationPreferenceMap = {
  z: "Email",
  p: "Phone",
  m: "Mobile",
}

// this method has to live here so it can be imported into the front end without
// importing the MyAccount files.
export const buildPatron = (patron: SierraPatron): Patron => {
  const notificationPreference =
    notificationPreferenceMap[patron.fixedFields?.["268"].value]
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
