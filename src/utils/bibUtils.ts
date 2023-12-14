import type { BibParams } from "../types/bibTypes"
import { ITEM_BATCH_SIZE } from "../config/constants"
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

/**
 * Given a bib ID (e.g. b12082323, pb123456, hb10000202040400) returns true
 * if it's an NYPL bib ID.
 */
export function isNyplBibID(id: string) {
  return /^b/.test(id)
}

/**
 * Given a bib ID, return true if it is an NYPL bnumber and has a 10th character.
 */
export function hasCheckDigit(id = "") {
  return isNyplBibID(id) && id.length === 10
}

/**
 * Given a BibParams object, return a query string for the API call.
 */
export function getBibQuery(
  { id, itemsFrom, itemFilterQuery }: BibParams,
  includeAnnotatedMarc = false
) {
  const itemQueries = []

  const queryBase = includeAnnotatedMarc ? `${id}.annotated-marc` : id

  // Add items_size and items_from params when itemsFrom is defined, even when 0.
  if (typeof itemsFrom !== "undefined")
    itemQueries.push(`items_size=${ITEM_BATCH_SIZE}&items_from=${itemsFrom}`)

  if (!includeAnnotatedMarc) {
    if (itemFilterQuery?.length) itemQueries.push(`${itemFilterQuery}`)
    itemQueries.push("merge_checkin_card_items=true")
  }

  return itemQueries.length
    ? queryBase + `?${itemQueries.join("&")}`
    : queryBase
}
