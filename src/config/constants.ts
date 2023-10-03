import { appConfig } from "./config"

export const BASE_URL = "/research/research-catalog"
export const SITE_NAME = "NYPL Research Catalog"
export const RESULTS_PER_PAGE = 50
export const DRB_RESULTS_PER_PAGE = 3

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
