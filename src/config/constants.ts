import { appConfig } from "./config"

export const BASE_URL = "/research/research-catalog"
export const SITE_NAME = "Research Catalog | NYPL"
export const RESULTS_PER_PAGE = 50
export const DRB_RESULTS_PER_PAGE = 3
export const ITEMS_PER_SEARCH_RESULT = 3
export const ITEM_BATCH_SIZE = 20
export const SHEP_HTTP_TIMEOUT = 4000

// Internal path names
export const PATHS = {
  HOME: "/",
  SEARCH: "/search",
  ADVANCED_SEARCH: "/search/advanced",
  BIB: "/bib",
  "404": "/404",
  "404_REDIRECT": "/404/redirect",
}

// API Names
export const DISCOVERY_API_NAME = "discovery"
export const DRB_API_NAME = "drb"

// API Routes
export const DISCOVERY_API_SEARCH_ROUTE = "/discovery/resources"
export const DRB_API_SEARCH_ROUTE = "/api/drb"

// Query params
export const SOURCE_PARAM = "?source=catalog"

// External URLs
export const DRB_BASE_URL =
  appConfig.externalUrls.drbFrontEnd[appConfig.environment]

// String used to namespace Research Catalog events in Adobe Analytics
export const ADOBE_ANALYTICS_SITE_SECTION = "Research Catalog"

export const ADOBE_ANALYTICS_RC_PREFIX = "rc|"

export const ADOBE_ANALYTICS_PAGE_NAMES = {
  HOME: "home",
  ADVANCED_SEARCH: "advanced-search",
  SEARCH_RESULTS: "search-results",
  BIB: "bib",
  ACCOUNT: "account",
  HOLD_REQUEST: "request|hold",
  EDD_REQUEST: "request|edd",
  ACCOUNT_ERROR: "error|account",
  REDIRECT: "error|redirect",
  NOT_FOUND_404: "error|404",
}
