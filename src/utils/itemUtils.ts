import type { ItemHoldingLocation } from "../types/itemTypes"

export const itemAvailabilityKeys = ["available", "useinlibrary"]

// Default delivery location for an item.
export const defaultNYPLLocation: ItemHoldingLocation = {
  "@id": "",
  prefLabel: "Check with Staff",
  customerCode: "",
}

// Default delivery location for a nonNyplRecap item.
export const nonNYPLReCAPLocation: ItemHoldingLocation = {
  "@id": "",
  prefLabel: "Off-site",
  customerCode: "",
}

export const itemLocationEndpoints = {
  Schwarzman: "schwarzman",
  Performing: "lpa",
  Schomburg: "schomburg",
}
