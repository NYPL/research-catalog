import { ITEM_PAGINATION_BATCH_SIZE } from "../config/constants"
import type { BibQueryParams } from "../types/bibTypes"
import { getPaginationOffsetStrings } from "./appUtils"

/**
 * standardizeBibId
 * Transforms bib id to have lower case prefix (b, hb, cb, pb) and trim check digit
 */
export function standardizeBibId(bibId: string): string {
  // nypl bib ids could have a 9th digit, a check digit which can be 0-9 or x.
  const nypl = bibId.match(/^([bB])(\d{8})[\dxX]?$/)
  const princeton = bibId.match(/^([pP][bB])(\d{6,16})$/)
  const columbia = bibId.match(/^([cC][bB])(\d{6,9})$/)
  const harvard = bibId.match(/^([hH][bB])(\d{6,18})$/)
  const matches = [nypl, princeton, columbia, harvard].find(
    (match) => match?.length === 3
  )
  if (matches) {
    const prefix = matches[1].toLowerCase()
    const number = matches[2]
    return prefix + number
  }
  return bibId
}

export const rtlOrLtr = (value: string) => {
  return isRtl(value) ? "rtl" : "ltr"
}

// The "\u200F" right-to-left mark is found at the beginning of fields known
// to be written in a script that reads from right to left
const isRtl = (value: string) => value.substring(0, 1) === "\u200F"

export const isItTheLastElement = (i, array) => !(i < array.length - 1)

// Build the heading above the Item Table in the Bib Page
// based on pagination values
export const buildItemTableDisplayingString = (
  page: number,
  totalResults: number,
  viewAllItems = false,
  filtersAreApplied = false
) => {
  const isPlural = totalResults > 1
  const totalString = totalResults.toLocaleString()

  if (!totalResults && filtersAreApplied)
    return "No results found matching the applied filters"
  if (viewAllItems || totalResults <= ITEM_PAGINATION_BATCH_SIZE) {
    return isPlural
      ? `Displaying all ${totalString} ${
          filtersAreApplied ? "matching " : ""
        }items`
      : "Displaying 1 item"
  }

  const [resultsStart, resultsEnd] = getPaginationOffsetStrings(
    page,
    totalResults,
    ITEM_PAGINATION_BATCH_SIZE
  )

  return `Displaying ${resultsStart}-${resultsEnd} of ${totalResults.toLocaleString()} ${
    filtersAreApplied ? "matching " : ""
  }item${isPlural ? "s" : ""}`
}

/**
 * Given a bib ID (e.g. b12082323, pb123456, hb10000202040400) returns true
 * if it's an NYPL bib ID.
 */
export function isNyplBibID(id: string) {
  return /^b/.test(id)
}

/**
 * Given a BibQueryParams object and an includeAnnotatedMarc boolean, return a query string for the Bib fetch API call.
 */
export function getBibQueryString(
  bibQuery: BibQueryParams,
  includeAnnotatedMarc = false
): string {
  const batchSize = ITEM_PAGINATION_BATCH_SIZE

  const itemPage = bibQuery?.item_page || 1
  const itemsFrom = (itemPage - 1) * batchSize || 0

  const FILTER_QUERIES = [
    "item_location",
    "item_format",
    "item_status",
    "item_date",
  ]

  const itemFilterQuery = bibQuery
    ? Object.keys(bibQuery)
        .filter((key) => FILTER_QUERIES.includes(key))
        .map((key) => `&${key}=${bibQuery[key]}`)
        .join("")
    : ""

  const paginationOrAllQuery = bibQuery?.all_items
    ? "all_items=true"
    : `items_size=${batchSize}&items_from=${itemsFrom}&item_page=${itemPage}`

  const mergeCheckinQuery = !includeAnnotatedMarc
    ? "&merge_checkin_card_items=true"
    : ""

  return `?${paginationOrAllQuery}${itemFilterQuery}${mergeCheckinQuery}`
}
