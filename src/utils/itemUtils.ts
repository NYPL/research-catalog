import type { ItemLocation } from "../types/itemTypes"

export const itemAvailabilityKeys = ["available", "useinlibrary"]

// Default delivery location for an item.
export const defaultNYPLLocation: ItemLocation = {
  "@id": "",
  prefLabel: "Check with Staff",
  customerCode: "",
}

// Default delivery location for a nonNyplRecap item.
export const nonNYPLReCAPLocation: ItemLocation = {
  "@id": "",
  prefLabel: "Off-site",
  customerCode: "",
}

export const locationEndpointsMap = {
  Schwarzman: "schwarzman",
  Performing: "lpa",
  Schomburg: "schomburg",
}

export function locationLabelToKey(label: string): string {
  return label.replace(/SASB/, "Schwarzman").split(" ")[0]
}
