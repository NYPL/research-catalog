import type { BibParams, BibQueryParams } from "../types/bibTypes"
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

export const rtlOrLtr = (value: string) => {
  return isRtl(value) ? "rtl" : "ltr"
}

// The "\u200F" right-to-left mark is found at the beginning of fields known
// to be written in a script that reads from right to left
const isRtl = (value: string) => value.substring(0, 1) === "\u200F"

export const isItTheLastElement = (i, array) => !(i < array.length - 1)

/**
 * Given a bib ID (e.g. b12082323, pb123456, hb10000202040400) returns true
 * if it's an NYPL bib ID.
 */
export function isNyplBibID(id: string) {
  return /^b/.test(id)
}

/**
 * Given a BibParams object and an includeAnnotatedMarc boolean, return a query string for the Bib fetch API call.
 */
export function getBibQuery(
  id: string,
  bibQuery?: BibParams,
  includeAnnotatedMarc = false
) {
  const itemsFrom = bibQuery?.itemsFrom
  const itemFilterQuery = bibQuery?.itemFilterQuery
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

/**
 * Given a comma-separated features string, return an array of individual feature keys.
 */
const extractFeatures = (featuresString: string): string[] => {
  if (typeof featuresString !== "string") return []
  return featuresString.split(",").reduce((features, feature) => {
    if (feature.length) features.push(feature.trim())
    return features
  }, [])
}

/* eslint-disable @typescript-eslint/naming-convention */

export function mapQueryToBibParams(bibQuery: BibQueryParams): BibParams {
  const { features, item_page = 1, items_from } = bibQuery
  const urlEnabledFeatures = extractFeatures(features)

  const itemFilterQuery = Object.keys(bibQuery)
    .filter((key) => key !== "items_from")
    .map((key) => `${key}=${bibQuery[key]}`)
    .join("&")

  return {
    features: urlEnabledFeatures,
    // If items_from is set, use that value, otherwise calculate it
    // based on the current page and the batch size.
    itemsFrom: items_from ? items_from : (item_page - 1) * ITEM_BATCH_SIZE,
    itemFilterQuery,
  }
}
