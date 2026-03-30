import type { ItemLocationKey, ItemLocation } from "../types/itemTypes"

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
  prefLabel: "Offsite",
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

/**
 * Formats a date string like "2026-07-18" into "July 18, 2026" for due date display.
 * Expects a string in "YYYY-MM-DD" format.
 */
export const formatDueDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-")
  if (!year || !month || !day) return dateString

  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
