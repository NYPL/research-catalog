import { appConfig } from "./config"
import {
  type AccordionDataProps,
  Text,
} from "@nypl/design-system-react-components"

import ExternalLink from "../components/Links/ExternalLink/ExternalLink"
import RCLink from "../components/Links/RCLink/RCLink"

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
  HOLD_REQUEST: "/hold/request",
  HOLD_CONFIRMATION: "/hold/confirmation",
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

export const HOLD_PAGE_HEADING = "Request for on-site use"
export const EDD_PAGE_HEADING = "Request scan"

export const HOLD_CONFIRMATION_FAQ_DATA: AccordionDataProps[] = [
  {
    label: "What's next?",
    panel: (
      <>
        <Text>
          Please allow a few minutes for this item to show up in your{" "}
          <RCLink href="/account">patron account</RCLink>.
        </Text>
        <Text noSpace>
          The item will be listed as &quot;Ready for pickup&quot; under your
          holds tab when it is available. You will receive an email confirmation
          after your item has arrived.
        </Text>
      </>
    ),
  },
  {
    label: "When will my item be ready for pickup?",
    panel: (
      <>
        <Text>
          <strong>Items stored on-site:</strong> Materials requested up to an
          hour before closing are usually ready for pickup within an hour.
          Materials requested within an hour of closing or outside business
          hours are ready about an hour after opening on the next business day.
        </Text>
        <Text noSpace>
          <strong>Items stored off-site:</strong> Materials requested before
          2:30 PM are usually ready for pickup about an hour after opening the
          next day (check{" "}
          <ExternalLink href="https://www.nypl.org/">nypl.org</ExternalLink> for
          library hours). Materials requested after 2:30 PM Mon–Thu are usually
          ready in two days; materials requested after 2:30 PM Fri–Sun are ready
          on Tuesday. Some materials are not delivered on Saturdays.
        </Text>
      </>
    ),
  },
  {
    label: "How long will my item be available for?",
    panel: (
      <>
        <Text noSpace>
          We will hold books for up to 14 days, so you can request materials up
          to two weeks in advance.
        </Text>
      </>
    ),
  },
  {
    label: "How do I pick up my item once it is ready?",
    panel: (
      <>
        <Text noSpace>
          Once your item is ready for pickup, please arrive at the pickup
          location during business hours and proceed to a help desk. An NYPL
          staff member will check your item out to you.
        </Text>
      </>
    ),
  },
  {
    label: "How do I cancel my request?",
    panel: (
      <>
        <Text>
          If you would like to cancel your request or have questions, please{" "}
          <ExternalLink href="https://gethelp.nypl.org/customer/portal/emails/new">
            email us
          </ExternalLink>{" "}
          or call 917-ASK-NYPL (
          <ExternalLink href="tel:19172756975">917-275-6975</ExternalLink>).
          Processed requests can also be canceled from the holds tab in your
          patron account.
        </Text>
        <Text noSpace>
          For more information about our requesting services, please see
          Requesting Research Materials.
        </Text>
      </>
    ),
  },
]

export const EDD_CONFIRMATION_FAQ_DATA: AccordionDataProps[] = [
  {
    label: "What’s next?",
    panel: (
      <>
        <Text noSpace>
          You will receive an email when your item is available to download.
        </Text>
      </>
    ),
  },
  {
    label: "When will my item be available for download?",
    panel: (
      <>
        <Text>
          <Text as="span" fontWeight="medium">
            Items stored on-site:
          </Text>{" "}
          Requests will be typically filled as quickly as possible, but please
          be aware it may take up to two weeks (or longer, in cases where
          complex rights issues apply). Eligible materials from our Special
          Collections may take six to eight weeks to be delivered.
        </Text>
        <Text noSpace>
          <Text as="span" fontWeight="medium">
            Items stored off-site:
          </Text>{" "}
          Requests will be typically filled within 48 hours, but please be aware
          it may take up to two weeks (or longer, in cases where complex rights
          issues apply).
        </Text>
      </>
    ),
  },
  {
    label: "How long will my item be available for download?",
    panel: (
      <>
        <Text>
          Files will remain available to the user for 30 days. Once a file is
          retrieved, it remains available to the user for five days. Each file
          can be retrieved a maximum of five times.
        </Text>
        <ExternalLink href="https://www.nypl.org/research/services/scan-and-deliver">
          Read more about this service.
        </ExternalLink>
      </>
    ),
  },
]
