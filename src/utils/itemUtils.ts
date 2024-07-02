import type { ItemLocationKey, ItemLocation } from "../types/itemTypes"
import { getPaginationOffsetStrings } from "./appUtils"
import { ITEM_PAGINATION_BATCH_SIZE } from "../config/constants"

export const itemAvailableIds = ["status:a", "status:o"]

// Default delivery location for an item.
export const defaultNYPLLocation: ItemLocation = {
  "@id": "",
  prefLabel: "Check with Staff",
  customerCode: "",
}

// Default delivery location for a partner Recap item.
export const partnerDefaultLocation: ItemLocation = {
  "@id": "",
  prefLabel: "Off-site",
  customerCode: "",
}

export const locationEndpointsMap: Record<ItemLocationKey, string> = {
  Schwarzman: "schwarzman",
  Performing: "lpa",
  Schomburg: "schomburg",
}

// Extract location key from the location label in the API response
export function locationLabelToKey(label: string): ItemLocationKey {
  return label.replace(/SASB/, "Schwarzman").split(" ")[0] as ItemLocationKey
}

// Build the heading above the Item Table in the Bib Page
// based on pagination values
export const buildItemTableDisplayingString = (
  page: number,
  totalResults: number,
  viewAllItems = false
) => {
  const isPlural = totalResults > 1
  const totalString = totalResults.toLocaleString()

  if (viewAllItems || totalResults <= ITEM_PAGINATION_BATCH_SIZE) {
    return isPlural
      ? `Displaying all ${totalString} items`
      : "Displaying 1 item"
  }

  const [resultsStart, resultsEnd] = getPaginationOffsetStrings(
    page,
    totalResults,
    ITEM_PAGINATION_BATCH_SIZE
  )

  return `Displaying ${resultsStart}-${resultsEnd} of ${totalResults.toLocaleString()} item${
    isPlural ? "s" : ""
  }`
}

/**
 * parseLocations
 * Takes a semicolon-separated list of locations set in an ENV variable and maps them to an array.
 */
export const parseLocations = (locations: string): string[] =>
  locations ? locations.split(";") : []
