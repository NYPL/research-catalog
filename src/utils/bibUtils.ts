import {
  ITEM_PAGINATION_BATCH_SIZE,
  ITEM_VIEW_ALL_BATCH_SIZE,
  ITEM_FILTER_PARAMS,
  SITE_NAME,
} from "../config/constants"
import type { BibQueryParams } from "../types/bibTypes"
import { getPaginationOffsetStrings } from "./appUtils"

export const rtlOrLtr = (value: string) => {
  return isRtl(value) ? "rtl" : "ltr"
}

// The "\u200F" right-to-left mark is found at the beginning of fields known
// to be written in a script that reads from right to left
const isRtl = (value: string): boolean => value?.substring(0, 1) === "\u200F"

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

export function getFindingAidFromSupplementaryContent(
  supplementaryContent?: { label?: string; url: string }[]
) {
  if (!supplementaryContent?.length) {
    return null
  }

  const findingAid = supplementaryContent.find(
    (sc) => sc.label?.toLowerCase().includes("finding aid") && !!sc.url
  )

  return findingAid?.url || null
}

export function buildBibMetadataTitle(bibTitle?: string | null): string {
  const TITLE_SUFFIX = `Item Details | ${SITE_NAME}`
  const MAX_LENGTH = 100
  const safeTitle = (bibTitle ?? "").trim()

  if (!safeTitle) return TITLE_SUFFIX

  const separator = " | "
  const fullSuffix = `${separator}${TITLE_SUFFIX}`
  const ellipsis = "..."

  const maxTitleLength = MAX_LENGTH - fullSuffix.length

  const truncatedTitle =
    safeTitle.length > maxTitleLength
      ? `${safeTitle.slice(0, maxTitleLength - ellipsis.length)}${ellipsis}`
      : safeTitle

  return `${truncatedTitle}${fullSuffix}`
}
