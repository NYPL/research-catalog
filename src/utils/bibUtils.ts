import {
  ITEM_PAGINATION_BATCH_SIZE,
  ITEM_VIEW_ALL_BATCH_SIZE,
  ITEM_FILTER_PARAMS,
} from "../config/constants"
import type { BibQueryParams, DiscoveryBibResult } from "../types/bibTypes"
import type { DiscoveryItemResult } from "../types/itemTypes"
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
const isRtl = (value: string): boolean => value?.substring(0, 1) === "\u200F"

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

// Check if any of the item filters in the bib query params are active
export const itemFiltersActive = (bibQuery: BibQueryParams) =>
  ITEM_FILTER_PARAMS.some((param) => bibQuery[param]?.length)

/**
 * Given a BibQueryParams object and an includeAnnotatedMarc boolean, return a query string for the Bib fetch API call.
 */
export function getBibQueryString(
  bibQuery: BibQueryParams,
  includeAnnotatedMarc = false
): string {
  const allItems = bibQuery?.all_items

  // TODO: Remove this and set batch size to ITEM_PAGINATION_BATCH_SIZE when view_all endpoint in discovery supports query params
  const batchSize = allItems
    ? ITEM_VIEW_ALL_BATCH_SIZE
    : ITEM_PAGINATION_BATCH_SIZE

  const itemPage = bibQuery?.item_page || 1
  const itemsFrom = (itemPage - 1) * batchSize || 0

  const itemFilterQuery = bibQuery
    ? Object.keys(bibQuery)
        .filter((key) => ITEM_FILTER_PARAMS.includes(key))
        .map((key) => `&${key}=${bibQuery[key]}`)
        .join("")
    : ""

  // TODO: Remove the filtersActive check and the bibQuery?.all_items check in the second part of the ternary
  // when view_all endpoint in discovery supports query params
  const paginationOrAllQuery =
    allItems && !itemFiltersActive(bibQuery)
      ? "all_items=true"
      : `items_size=${batchSize}&items_from=${itemsFrom}&item_page=${itemPage}${
          allItems ? "&all_items=true" : ""
        }`

  const mergeCheckinQuery = !includeAnnotatedMarc
    ? "&merge_checkin_card_items=true"
    : ""

  return `?${paginationOrAllQuery}${itemFilterQuery}${mergeCheckinQuery}`
}

export const findItemInBibResult = (
  bibResult: DiscoveryBibResult,
  itemId: string
): DiscoveryItemResult | undefined =>
  bibResult?.items?.find((item) => item.uri === itemId)
