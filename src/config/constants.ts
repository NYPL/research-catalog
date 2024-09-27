import { appConfig } from "./config"

export const BASE_URL = "/research/research-catalog"
export const SITE_NAME = "Research Catalog | NYPL"
export const RESULTS_PER_PAGE = 50
export const DRB_RESULTS_PER_PAGE = 3
export const ITEMS_PER_SEARCH_RESULT = 3
export const ITEM_PAGINATION_BATCH_SIZE = 20
export const ITEM_VIEW_ALL_BATCH_SIZE = 150
export const ELECTRONIC_RESOURCES_PER_BIB_PAGE = 3
export const SHEP_HTTP_TIMEOUT = 4000
export const FOCUS_TIMEOUT = 50

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
  appConfig.apiEndpoints.drbFrontEnd[appConfig.environment]

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

// Build a lookup relating weekday names to their Date.prototype.getDay() number:
export const DAYS = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
}

export const ERROR_MESSAGES = {
  ITEM_REFETCH_ABORT_REASON: "New Bib item fetch initiated",
}

export const SEARCH_FORM_OPTIONS = {
  all: {
    text: "Keyword",
    searchTip:
      "Enter one or more keywords, or use quotes to search for an exact phrase.",
    placeholder: 'ex. climate change or "The New York Times"',
  },
  title: {
    text: "Title",
    value: "title",
    searchTip: "Enter a title, or use quotes to search for an exact phrase.",
    placeholder: 'ex. David Copperfield or "The Jewish Press That Was"',
  },
  contributor: {
    text: "Author/contributor",
    searchTip:
      "Enter the name of an author, contributor, or organization. Use Last Name, First Name for more accurate results.",
    placeholder: "ex. Dickens, Charles or American Law Association",
  },
  journal_title: {
    text: "Journal title",
    searchTip:
      "Enter a journal or serial title, or use quotes to search for an exact phrase.",
    placeholder:
      'ex. The New York Times or "The Journal of Clinical Investigation"',
  },
  callnumber: {
    text: "Call number",
    searchTip:
      "Enter a call number, or the first few letters and numbers of a call number. ",
    placeholder: "ex. JFD 99-6057 or *ZAN-3174",
  },
  standard_number: {
    text: "Indentifier",
    searchTip:
      "Enter a control number or identifier. Examples include ISSN / ISBN / OCLC / LCCN numbers, barcodes, etc.",
    placeholder: "ex. 1558584536 or 95008433",
  },
  subject: {
    text: "Subject",
    searchTip: "Enter a subject name or phrase. Learn more about searching.",
    placeholder: "ex. ornithology or Greek architecture",
  },
}
