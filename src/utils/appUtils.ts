import {
  ADOBE_ANALYTICS_SITE_SECTION,
  ADOBE_ANALYTICS_PAGE_NAMES,
  ADOBE_ANALYTICS_RC_PREFIX,
} from "../config/constants"

import { standardizeBibId } from "./bibUtils"

/**
 * adobeAnalyticsParam
 * Utility function that builds a param string as expected by the Adobe Analytics dashboard
 * @param {string} param value of param to be passed into the param string field.
 */
const adobeAnalyticsParam = (param = "") => {
  return param.length ? `|${param}` : ""
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
export const trackVirtualPageView = (pathname = "", queryParams = "") => {
  const adobeDataLayer = window["adobeDataLayer"] || []
  const route = pathname.toLowerCase()
  adobeDataLayer.push({
    event: "virtual_page_view",
    page_name: adobeAnalyticsRouteToPageName(route, queryParams),
    site_section: ADOBE_ANALYTICS_SITE_SECTION,
  })
}
