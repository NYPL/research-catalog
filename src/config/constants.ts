import { appConfig } from "./config"
import type { LocationDetails } from "../types/locationTypes"

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
export const DISCOVERY_API_NAME = "discovery"
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
    placeholder: `${example} Hughes, Langston or New York City Ballet`,
  },
  journal_title: {
    text: "Journal title",
    searchTip: `Enter a journal, newspaper, or other serial title. ${useQuotes}`,
    placeholder: `${example} Amsterdam News or “Paris Review”`,
  },
  callnumber: {
    text: "Call number",
    searchTip: "Enter a call number or the beginning of a call number.",
    placeholder: `${example} JFD 93-1962 or “**P (Ms. Heb.”`,
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

export const LOCATIONS_DETAILS: Record<string, LocationDetails> = {
  lpa: {
    id: "55",
    "full-name":
      "New York Public Library for the Performing Arts, Dorothy and Lewis B. Cullman Center",
    "short-name": "Library for the Performing Arts",
    symbol: "LPA",
    slug: "lpa",
    phone: "(917) 275-6975",
    uri: "http://www.nypl.org/about/locations/lpa",
    address: {
      address1: "40 Lincoln Center Plaza",
      address2: "",
      city: "New York",
      "postal-code": "10023",
      latitude: 40.7735,
      longitude: -73.9848,
      "map-embed-uri":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.488259006964!2d-73.98695534929564!3d40.77327884170035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f580711f93%3A0x9750fe4e405f3666!2sNew+York+Public+Library!5e0!3m2!1sen!2sus!4v1479242693558",
    },
    hours: [
      { day: "Sunday", closed: true },
      { day: "Monday", open: "10:30 AM", close: "8 PM" },
      { day: "Tuesday", open: "10:30 AM", close: "6 PM" },
      { day: "Wednesday", open: "10:30 AM", close: "6 PM" },
      { day: "Thursday", open: "10:30 AM", close: "8 PM" },
      { day: "Friday", open: "10:30 AM", close: "6 PM" },
      { day: "Saturday", open: "10:30 AM", close: "6 PM" },
    ],
  },
  schomburg: {
    id: "64",
    "full-name": "Schomburg Center for Research in Black Culture",
    "short-name": "Schomburg Center",
    symbol: "SC",
    slug: "schomburg",
    phone: "(917) 275-6975",
    uri: "http://www.nypl.org/about/locations/schomburg",
    address: {
      address1: "515 Malcolm X Boulevard",
      address2: "",
      city: "New York",
      "postal-code": "10037",
      latitude: 40.8144,
      longitude: -73.941,
      "map-embed-uri":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.608723918744!2d-73.94312004929432!3d40.8145912391688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f676c762ebed%3A0x74444bd477cfdf28!2sSchomburg+Center+for+Research+in+Black+Culture!5e0!3m2!1sen!2sus!4v1479242810413",
    },
    hours: [
      { day: "Sunday", closed: true },
      { day: "Monday", open: "10 AM", close: "6 PM" },
      { day: "Tuesday", open: "10 AM", close: "8 PM" },
      { day: "Wednesday", open: "10 AM", close: "8 PM" },
      { day: "Thursday", open: "10 AM", close: "6 PM" },
      { day: "Friday", open: "10 AM", close: "6 PM" },
      { day: "Saturday", open: "10 AM", close: "6 PM" },
    ],
  },
  schwarzman: {
    id: "36",
    "full-name": "Stephen A. Schwarzman Building",
    "short-name": "Schwarzman Building",
    symbol: "SASB",
    slug: "schwarzman",
    phone: "(917) 275-6975",
    uri: "http://www.nypl.org/about/locations/schwarzman",
    address: {
      address1: "476 Fifth Avenue (42nd St and Fifth Ave)",
      address2: "",
      city: "New York",
      "postal-code": "10018",
      latitude: 40.7532,
      longitude: -73.9822,
      "map-embed-uri":
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3022.3899875663374!2d-73.98487169126284!3d40.7534464793701!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3b51df6e509a734c!2sNew+York+Public+Library+-+Stephen+A.+Schwarzman+Building!5e0!3m2!1sen!2sus!4v1476394300850",
    },
    hours: [
      { day: "Sunday", open: "1 PM", close: "5 PM" },
      { day: "Monday", open: "10 AM", close: "6 PM" },
      { day: "Tuesday", open: "10 AM", close: "8 PM" },
      { day: "Wednesday", open: "10 AM", close: "8 PM" },
      { day: "Thursday", open: "10 AM", close: "6 PM" },
      { day: "Friday", open: "10 AM", close: "6 PM" },
      { day: "Saturday", open: "10 AM", close: "6 PM" },
    ],
  },
  sibl: {
    id: "65",
    "full-name": "Science, Industry and Business Library (SIBL)",
    "short-name": "Science, Industry and Business Library",
    symbol: "SIBL",
    slug: "sibl",
    phone: "(917) 275-6975",
    uri: "http://www.nypl.org/about/locations/sibl",
    address: {
      address1: "188 Madison Avenue @ 34th Street",
      address2: "",
      city: "New York",
      "postal-code": "10016",
      latitude: 40.748,
      longitude: -73.983,
      "map-embed-uri":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6251650256686!2d-73.98516884929633!3d40.74827274323163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259077e416ac5%3A0x7e268f9deac6bdf6!2sScience%2C+Industry+and+Business+Library+-+NYPL!5e0!3m2!1sen!2sus!4v1479242773380",
    },
    hours: [
      { day: "Sunday", closed: true },
      { day: "Monday", open: "10 AM", close: "6 PM" },
      { day: "Tuesday", open: "10 AM", close: "8 PM" },
      { day: "Wednesday", open: "10 AM", close: "8 PM" },
      { day: "Thursday", open: "10 AM", close: "8 PM" },
      { day: "Friday", open: "10 AM", close: "6 PM" },
      { day: "Saturday", open: "10 AM", close: "6 PM" },
    ],
  },
}
