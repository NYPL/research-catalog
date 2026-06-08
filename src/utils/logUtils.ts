import { logger } from "@nypl/node-utils"
import type { SearchParams, SearchResultsResponse } from "../types/searchTypes"
import { filtersObjectLength } from "./searchUtils"

export const logServerError = (location: string, message: string): void => {
  logger.error(`Error in ${location}: ${message}`)
}

export const logServerWarn = (location: string, message: string): void => {
  logger.warn(`Warning in ${location}: ${message}`)
}

/**
 * logSingleFilterNoResults
 * Given location, SearchResultsResponse, SearchParams, and (possibly empty) request referer,
 * checks for a possible malformed incoming link
 * (indicated by a 404 response with one filter applied and no keyword, and a referer present).
 * If this is the case, logs a server warning
 */
export const logSingleFilterNoResults = (
  location: string,
  results: SearchResultsResponse,
  searchParams: SearchParams,
  referer: string | undefined
): void => {
  if (
    referer &&
    results.status === 404 &&
    filtersObjectLength(searchParams.filters) === 1 &&
    !searchParams.q
  )
    logServerWarn(
      location,
      `Link to single filter, no results; referer: ${referer}`
    )
}
