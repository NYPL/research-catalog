import type {
  ItemLocationKey,
  ItemLocation,
  ItemLocationEndpoint,
} from "../types/itemTypes"

export const itemAvailableIds = ["status:a", "status:o"]

// Default delivery location for an item.
export const defaultNYPLLocation: ItemLocation = {
  "@id": "",
  prefLabel: "Check with Staff",
  customerCode: "",
}

// Default delivery location for a nonNyplRecap item.
export const nonNYPLDefaultLocation: ItemLocation = {
  "@id": "",
  prefLabel: "Off-site",
  customerCode: "",
}

export const locationEndpointsMap: Record<
  ItemLocationKey,
  ItemLocationEndpoint
> = {
  Schwarzman: "schwarzman",
  Performing: "lpa",
  Schomburg: "schomburg",
}

// Extract location key from the location label in the API response
export function locationLabelToKey(label: string): ItemLocationKey {
  return label.replace(/SASB/, "Schwarzman").split(" ")[0] as ItemLocationKey
}
