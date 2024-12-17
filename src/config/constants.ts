import { appConfig } from "./config"
import type { DeliveryLocation, NYPLocationKey } from "../types/locationTypes"

export const BASE_URL = "/research/research-catalog"
export const SITE_NAME = "Research Catalog | NYPL"
export const RESULTS_PER_PAGE = 50
export const DRB_RESULTS_PER_PAGE = 3
export const ITEMS_PER_SEARCH_RESULT = 3
export const ITEM_PAGINATION_BATCH_SIZE = 20
// TODO: Remove this when view_all endpoint in discovery supports query params
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
export const DRB_API_NAME = "drb"

// API Routes
export const DISCOVERY_API_SEARCH_ROUTE = "/discovery/resources"
export const DRB_API_SEARCH_ROUTE = "/api/drb"

// Query params
export const SOURCE_PARAM = "?source=catalog"

export const ITEM_FILTER_PARAMS = [
  "item_location",
  "item_format",
  "item_status",
  "item_date",
]

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

const useQuotes = "Use quotation marks to search for an exact phrase."
const example = "Example: "

export const SEARCH_FORM_OPTIONS = {
  all: {
    text: "Keyword",
    searchTip: `Enter one or more keywords. ${useQuotes}`,
    placeholder: `${example} Brooklyn Bridge or “New York City”`,
  },
  title: {
    text: "Title",
    searchTip: `Enter a full title or part of a title. ${useQuotes}`,
    placeholder: `${example} Middlemarch or “A Chorus Line”`,
  },
  contributor: {
    text: "Author/contributor",
    searchTip:
      "Enter the name of an author, contributor, or organization. Use Last Name, First Name for more precise results.",
    placeholder: `${example} Hurston, Zora Neale or New York City Ballet`,
  },
  journal_title: {
    text: "Journal title",
    searchTip: `Enter a journal, newspaper, or other serial title. ${useQuotes}`,
    placeholder: `${example} Amsterdam News or “Paris Review”`,
  },
  callnumber: {
    text: "Call number",
    searchTip: "Enter a call number or the beginning of a call number.",
    placeholder: `${example} JFD 93-1962 or "**P (Ms. Heb"."`,
  },
  standard_number: {
    text: "Unique identifier",
    searchTip:
      "Enter a control number or identifier (ISBN, ISSN, LCCN, OCLC number, barcode, etc.).",
    placeholder: `${example} 9780889229600 or 82048999`,
  },
  subject: {
    text: "Subject",
    searchTip: "Enter a subject keyword or phrase.",
    placeholder: `${example} Ornithology or Greek Architecture`,
  },
}

export const NYPL_LOCATIONS = {
  lpa: {
    shortName: "Library for the Performing Arts",
    address: "40 Lincoln Center Plaza",
  },
  schomburg: {
    shortName: "Schomburg Center",
    address: "515 Malcolm X Boulevard",
  },
  schwarzman: {
    shortName: "Schwarzman Building",
    address: "476 Fifth Avenue (42nd St and Fifth Ave)",
  },
}

export const availabilityKeys = {
  AVAILABLE_RECAP: "availableRecap",
  AVAILABLE_RECAP_AEON: "availableRecapAeon",
  AVAILABLE_AEON: "availableAeon",
  AVAILABLE_ONSITE: "availableOnsite",
  NOT_AVAILABLE: "notAvailable",
}
