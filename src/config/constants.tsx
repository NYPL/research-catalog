import Link from "../components/Link/Link"
import type { BrowseType } from "../types/browseTypes"

export const BASE_URL = "/research/research-catalog"
export const SITE_NAME = "Research Catalog | NYPL"
export const RESULTS_PER_PAGE = 50
export const BROWSE_RESULTS_PER_PAGE = 25
export const ITEMS_PER_SEARCH_RESULT = 3
export const ITEM_PAGINATION_BATCH_SIZE = 20
export const ELECTRONIC_RESOURCES_PER_BIB_PAGE = 3
export const FOCUS_TIMEOUT = 50
export const DEBOUNCE_INTERVAL = 20

export const EMAIL_REGEX = /^[^@]+@[^@]+\.[^@]+$/

// Internal path names
export const PATHS = {
  HOME: "/",
  SEARCH: "/search",
  BROWSE: "/browse",
  ADVANCED_SEARCH: "/search/advanced",
  MY_ACCOUNT: "/account",
  HOLD_REQUEST: "/hold/request",
  HOLD_CONFIRMATION: "/hold/confirmation",
  BIB: "/bib",
  "404": "/404",
  "404_REDIRECT": "/404/redirect",
}

// API Routes
export const DISCOVERY_API_SEARCH_ROUTE = "/discovery/resources"
export const DISCOVERY_API_BROWSE_ROUTE = "/discovery/browse"

// Query params
export const SOURCE_PARAM = "?source=catalog"

export const ITEM_FILTER_PARAMS = ["item_location", "item_status", "item_date"]

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
      "Enter the name of an author, contributor, or organization. Use Last Name, First Name for more precise results. To browse a list of authors instead, go to Browse the Catalog.",
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
    searchTip: (
      <span>
        Enter a subject keyword or phrase. To browse a list of Subject Headings
        instead, go to <Link href="/browse">Browse the Catalog</Link>.
      </span>
    ),
    placeholder: "e.g., Ornithology or Greek Architecture",
  },
}

export const BROWSE_FORM_OPTIONS = {
  subject_has: {
    browseType: "subjects" as BrowseType,
    scope: "has",
    text: "Subject Headings containing",
    searchTip:
      "Enter one or more keywords in any order to browse the Subject Headings index.",
    placeholder: "Example: Ornithology or Vietnam War",
  },

  subject_starts_with: {
    browseType: "subjects" as BrowseType,
    scope: "starts_with",
    text: "Subject Headings beginning with",
    searchTip:
      "Enter one or more keywords in exact order to browse the Subject Headings index.",
    placeholder: "Example: Ornithology or Vietnam War",
  },

  contributor_has: {
    browseType: "contributors" as BrowseType,
    scope: "has",
    text: "Author/Contributors containing",
    searchTip:
      "Enter the name of an author, contributor, or organization in any order to browse the Author/Contributor index.",
    placeholder: "Example: Charles Dickens or United Nations",
  },

  contributor_starts_with: {
    browseType: "contributors" as BrowseType,
    scope: "starts_with",
    text: "Author/Contributors beginning with",
    searchTip:
      "Enter the name of an author, contributor, or organization in exact order (use Last Name, First Name for authors) to browse the Author/Contributor index. ",
    placeholder: "Example: Dickens, Charles or United Nations",
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

export const AVAILABILITY_KEYS = {
  // anything not covered by the cases below is EDGE_CASE
  EDGE_CASE: "edgeCase",
  // there is only one not available case, so availability is assumed as the default
  NOT_AVAILABLE: "notAvailable",
  RECAP_GENERAL_COLLECTIONS: "Recap",
  ONSITE_GENERAL_COLLECTIONS: "Onsite",
  // special collections availability keys
  RECAP_AEON: "RecapAeon",
  AEON: "Aeon",
  ONSITE_AEON: "OnsiteAeon",
  ONSITE_AEON_FINDING_AID: "onsiteAeonFindingAid",
  RECAP_AEON_FINDING_AID: "recapAeonFindingAid",
  ONSITE_FINDING_AID: "onsiteFindingAid",
  RECAP_FINDING_AID: "recapFindingAid",
  ONSITE_NO_FINDING_AID_NO_AEON: "noFindingAidNoAeonOnsite",
  RECAP_NO_FINDING_AID_NO_AEON: "noFindingAidNoAeonRecap",
}
export const HOLD_PAGE_HEADING = "Request for onsite use"
export const EDD_PAGE_HEADING = "Request scan"

export const EDD_FORM_FIELD_COPY = {
  emailAddress: {
    label: "Email address",
    placeholder: "Example: theresasmith@gmail.com",
    helperText:
      "Your request will be delivered to the email address you enter above.",
    invalidText:
      "There was a problem. Enter a valid email address. Your request will be delivered to the email address you enter above.",
  },
  startPage: {
    label: "Starting page number",
    placeholder: "Example: 1",
    helperText: "Enter the first page you would like scanned.",
    invalidText:
      "There was a problem. Enter a page number. You may request a maximum of 50 pages.",
  },
  endPage: {
    label: "Ending page number",
    placeholder: "Example: 20",
    helperText: "Enter the last page you would like scanned.",
    invalidText:
      "There was a problem. Enter a page number. You may request a maximum of 50 pages.",
  },
  chapterTitle: {
    label: "Chapter or article title",
    placeholder: "Example: Chapter 1",
    helperText:
      "Enter the name/number of the chapter or article you would like scanned.",
    invalidText:
      "There was a problem. Indicate the title of the chapter or article you are requesting.",
  },
  author: {
    label: "Author",
    placeholder: "Example: Charles Dickens",
  },
  date: {
    label: "Date published",
    placeholder: "Example: 1932",
  },
  volume: {
    label: "Volume",
    placeholder: "Example: V3",
  },
  issue: {
    label: "Issue",
    placeholder: "Example: Issue 27",
  },
  requestNotes: {
    label: "Notes",
    placeholder: "Example: Please include foldouts in the scan.",
    helperText: "Provide additional instructions here.",
  },
}

export const HOLD_PAGE_ERROR_HEADINGS = {
  failed: "Request failed.",
  eddUnavailable:
    "Electronic delivery options for this item are currently unavailable.",
  patronIneligible: "There is a problem with your library account.",
}

export const HOLD_PAGE_CONTACT_PREFIXES = {
  failed: "We were unable to process your request at this time.",
  eddUnavailable:
    "Electronic delivery options for this item are currently unavailable.",
}
