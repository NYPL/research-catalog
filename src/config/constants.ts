import { appConfig } from "./config"
import type {
  ItemLocation,
  ItemLocationEndpoint,
  ItemLocationKey,
} from "../types/itemTypes"

export const BASE_URL = "/research/research-catalog"
export const SITE_NAME = "NYPL Research Catalog"
export const RESULTS_PER_PAGE = 50
export const DRB_RESULTS_PER_PAGE = 3
export const ITEMS_PER_SEARCH_RESULT = 3

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

// Item config

export const ITEM_AVAILABILITY_KEYS = ["available", "useinlibrary"]

// Default delivery location for an item.
export const DEFAULT_NYPL_LOCATION: ItemLocation = {
  "@id": "",
  prefLabel: "Check with Staff",
  customerCode: "",
}

// Default delivery location for a nonNyplRecap item.
export const NON_NYPL_RECAP_LOCATION: ItemLocation = {
  "@id": "",
  prefLabel: "Off-site",
  customerCode: "",
}

export const LOCATION_ENDPOINTS_MAP: Record<
  ItemLocationKey,
  ItemLocationEndpoint
> = {
  Schwarzman: "schwarzman",
  Performing: "lpa",
  Schomburg: "schomburg",
}
