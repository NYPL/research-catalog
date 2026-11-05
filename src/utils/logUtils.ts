import { logger } from "@nypl/node-utils"
import type { SearchParams, SearchResultsResponse } from "../types/searchTypes"
import { filtersObjectLength } from "./searchUtils"

export const logServerError = (location: string, message: string): void => {
  logger.error(`Error in ${location}: ${message}`)
}

export const logServerWarn = (location: string, message: string): void => {
  logger.warn(`Warning in ${location}: ${message}`)
}

const SENSITIVE_FIELDS = [
  "pin",
  "oldPin",
  "newPin",
  "password",
  "patronId",
  "patron",
  "email",
  "emails",
  "emailAddress",
  "phone",
  "phones",
  "phoneNumber",
  "sierraHoldId",
  "holdId",
  "requestId",
  "barcode",
  "patronBarcode",
  "requestNotes",
]

/**
 * Redact fields in a request body, recursing into nested objects/arrays
 */
export const redactSensitiveFields = <T>(body: T): T => {
  if (Array.isArray(body))
    return body.map((item) => redactSensitiveFields(item)) as T

  if (!body || typeof body !== "object") return body

  return Object.entries(body).reduce((redacted, [key, value]) => {
    redacted[key] = SENSITIVE_FIELDS.includes(key)
      ? "*****"
      : redactSensitiveFields(value)
    return redacted
  }, {} as Record<string, unknown>) as T
}

/**
 * Redact sensitive path segments and query param values
 */
export const redactSensitivePath = (path: string): string => {
  if (!path) return path

  const [pathname, queryString] = path.split("?")

  const redactedPathname = pathname.replace(/\/\d+(?=\/|$)/g, "/*****")

  if (!queryString) return redactedPathname

  const redactedQuery = queryString
    .split("&")
    .map((pair) => {
      const [key, value] = pair.split("=")
      const bareKey = key.replace(/\[\]$/, "").replace(/s$/, "")
      return SENSITIVE_FIELDS.includes(bareKey) && value !== undefined
        ? `${key}=*****`
        : pair
    })
    .join("&")

  return `${redactedPathname}?${redactedQuery}`
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
