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

// Default delivery location for a partner Recap item.
export const partnerDefaultLocation: ItemLocation = {
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

/**
 * Format an Item's shelfMark value for sorting by collapsing whitespace and zero-padding
 * anything that looks like a box, volume, or tube number, identified as:
 *  - any number terminating the string, or
 *  - any number following known prefixes (e.g. box, tube, v., etc).
 *
 * If number is identified by prefix (e.g. box, tube), prefix will be made
 * lowercase.
 *
 * e.g.:
 *  "*T-Mss 1991-010   Box 27" ==> "*T-Mss 1991-010 box 000027"
 *  "*T-Mss 1991-010   Tube 70" ==> "*T-Mss 1991-010 tube 000070"
 *  "Map Div. 98­914    Box 25, Wi­Z')" ==> "Map Div. 98­914 box 000025, Wi­Z')"
 *
 * In addition to padding terminating numbers, any number following one of
 * these sequences anywhere in the string, case-insensitive, is padded:
 *  - box
 *  - tube
 *  - v.
 *  - no.
 *  - r.
 */
export function formatShelfMarkForSort(shelfMark: string): string {
  // NodeJS doesn't have lookbehinds, so fake it with replace callback:
  const reg = /(\d+$|((^|\s)(box|v\.|no\.|r\.|tube) )(\d+))/i
  return (
    shelfMark
      // Replace prefix number with 0-padded version
      .replace(reg, shelfMarkReplaceCallback)
      // Collapse redundant whitespace:
      .replace(/\s{2,}/g, " ")
  )
}

// Callback function for replacing shelfMark prefixes (box, tube, etc) in formatShelfMarkForSort()
const shelfMarkReplaceCallback = (
  m0,
  fullMatch,
  label,
  labelWhitespace,
  labelText,
  number
) =>
  // If we matched a label, build string from label and then pad number
  label
    ? `${label.toLowerCase()}${padStringWithZeros(number)}`
    : // Otherwise just pad whole match (presumably it's a line terminating num):
      padStringWithZeros(fullMatch)

/**
 * Left-pad a string with "0"s if shorter than a given padding length.
 */
function padStringWithZeros(str, padLen = 6) {
  const numZeros = Math.max(0, padLen - str.length)
  return "0".repeat(numZeros) + str
}
