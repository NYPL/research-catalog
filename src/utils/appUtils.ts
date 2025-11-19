import {
  ADOBE_ANALYTICS_SITE_SECTION,
  ADOBE_ANALYTICS_PAGE_NAMES,
  ADOBE_ANALYTICS_RC_PREFIX,
  BASE_URL,
} from "../config/constants"
import logger from "../../logger"

export const logServerError = (
  errorLocation: string,
  errorMessage: string
): void => {
  logger.error(`Error in ${errorLocation}: ${errorMessage}`)
}

/**
 * adobeAnalyticsParam
 * Utility function that builds a param string as expected by the Adobe Analytics dashboard
 */
const adobeAnalyticsParam = (param = "") => {
  return param.length ? `|${param}` : ""
}

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

// Maps routes to the appropriate page name for Adobe Analytics.
export const adobeAnalyticsRouteToPageName = (route = "", queryParams = "") => {
  // parse additional route attributes
  let bnumber = route.includes("/bib") ? route.split("/")[2] : ""
  bnumber = bnumber && standardizeBibId(bnumber)

  const holdId = route.includes("/hold") ? route.split("/")[3] : ""
  const holdBibAndItem = holdId && holdId.length && holdId.split("-")
  const holdBib = holdBibAndItem && holdBibAndItem[0]
  const holdItem = holdBibAndItem && holdBibAndItem[1]

  let pageName = ""
  switch (route) {
    case route.match(/\/search\/advanced/i)?.input:
      pageName = ADOBE_ANALYTICS_PAGE_NAMES.ADVANCED_SEARCH
      break
    case route.match(/\/search/i)?.input:
      pageName = `${
        ADOBE_ANALYTICS_PAGE_NAMES.SEARCH_RESULTS
      }${adobeAnalyticsParam(queryParams)}`
      break
    case route.match(/\/bib(\/[^/]*)\/all/i)?.input:
      pageName = `${ADOBE_ANALYTICS_PAGE_NAMES.BIB}${adobeAnalyticsParam(
        bnumber
      )}|all`
      break
    case route.match(/\/bib/i)?.input:
      pageName = `${ADOBE_ANALYTICS_PAGE_NAMES.BIB}${adobeAnalyticsParam(
        bnumber
      )}`
      break
    case route.match(/\/hold\/request(\/[^/]*)\/edd/i)?.input:
      pageName = `${
        ADOBE_ANALYTICS_PAGE_NAMES.EDD_REQUEST
      }${adobeAnalyticsParam(holdBib)}${adobeAnalyticsParam(holdItem)}`
      break
    case route.match(/\/hold\/request/i)?.input:
      pageName = `${
        ADOBE_ANALYTICS_PAGE_NAMES.HOLD_REQUEST
      }${adobeAnalyticsParam(holdBib)}${adobeAnalyticsParam(holdItem)}`
      break
    case route.match(/\/hold\/confirmation/i)?.input:
      pageName = `${
        ADOBE_ANALYTICS_PAGE_NAMES.HOLD_REQUEST
      }${adobeAnalyticsParam(holdBib)}${adobeAnalyticsParam(
        holdItem
      )}|confirmation`
      break
    case route.match(/\/accountError/i)?.input:
      pageName = ADOBE_ANALYTICS_PAGE_NAMES.ACCOUNT_ERROR
      break
    case route.match(/\/account/i)?.input:
      pageName = ADOBE_ANALYTICS_PAGE_NAMES.ACCOUNT
      break
    case route.match(/\/404\/redirect/i)?.input:
      pageName = ADOBE_ANALYTICS_PAGE_NAMES.REDIRECT
      break
    case route.match(/\/404/i)?.input:
      pageName = ADOBE_ANALYTICS_PAGE_NAMES.NOT_FOUND_404
      break
    case route.match(/^\/?(\?.+)?$/)?.input:
      pageName = ADOBE_ANALYTICS_PAGE_NAMES.HOME
      break
    default:
      pageName = `UNREGISTERED ROUTE: ${route}`
      break
  }

  return ADOBE_ANALYTICS_RC_PREFIX + pageName
}

/**
 * Tracks a virtual page view to Adobe Analytics on page navigation.
 */
export const trackVirtualPageView = (pathname = "") => {
  const adobeDataLayer = window["adobeDataLayer"] || []
  const route = pathname.toLowerCase().replace(BASE_URL, "")
  const queryIndex = route.indexOf("?")
  const path = queryIndex >= 0 ? route.substring(0, queryIndex) : route
  const queryParams = route.slice(queryIndex)

  adobeDataLayer.push({
    page_name: null,
    site_section: null,
  })
  adobeDataLayer.push({
    event: "virtual_page_view",
    page_name: adobeAnalyticsRouteToPageName(path, queryParams),
    site_section: ADOBE_ANALYTICS_SITE_SECTION,
  })
}

/**
 * getPaginationOffsetStrings
 * Used to generate start and end counts for pagination on Search Results and above the
 * item table in the Bib page
 */
export function getPaginationOffsetStrings(
  page = 1,
  total: number,
  pageLimit: number
): [string, string] {
  const offset = pageLimit * page - pageLimit
  const start = offset + 1
  let end = offset + pageLimit
  end = end >= total ? total : end

  return [start.toLocaleString(), end.toLocaleString()]
}

/**
 * encodeHTML
 * Return a version of the string sanitized to protect against XSS.
 */
export const encodeHTML = (str: string) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;")

/**
 * convertToSentenceCase
 * Return a sentence-cased version of the string if it's more than 2 words (to avoid sentence-casing acronyms).
 */
export const convertToSentenceCase = (str: string) =>
  str.split(" ").length > 1
    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    : str

/**
 * Converts camel case string to shish kabob case
 *
 * e.g. camelToShishKabobCase("RecapPul")
 *        => "recap-pul"
 *      camelToShishKabobCase("firstCharCanBeLowerCase")
 *        => "first-char-can-be-lower-case"
 */
export const convertCamelToShishKabobCase = (str: string) =>
  str
    // Change capital letters into "-{lowercase letter}"
    .replace(/([A-Z])/g, (capitalLetter, placeholderVar, index) => {
      // If capital letter is not first character, precede with '-':
      return (index > 0 ? "-" : "") + capitalLetter.toLowerCase()
    })

/**
 * Attempts to instantiate an object using the provided constructor and arguments.
 * If instantiation fails without a flag to ignore failure, throws an error with the given message.
 * Otherwise, returns null.
 */
export function tryInstantiate<T>({
  constructor,
  args = [],
  ignoreError = false,
  errorMessage = "Failed to instantiate",
}: {
  constructor: new (...args: any[]) => T
  args?: any[]
  ignoreError?: boolean
  errorMessage?: string
}): T | null {
  try {
    return new constructor(...args)
  } catch {
    if (ignoreError === false) {
      throw new Error(errorMessage)
    }
    return null
  }
}
