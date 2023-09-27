import type { RCPage } from "../types/pageTypes"
import { PATHS } from "../config/constants"

/**
 * getActivePage(pathname)
 * Returns the Research Catalog page ID for a given pathname.
 * Used for determining the current page for activating menu links and
 * conditionally rendering the Search.
 */
export const getActivePage = (pathname: string): RCPage => {
  if (pathname === PATHS.HOME || pathname === PATHS.SEARCH) {
    return "search"
  } else if (pathname === PATHS.ADVANCED_SEARCH) {
    return "advanced"
  } else if (pathname === PATHS["404"] || pathname === PATHS["404_REDIRECT"]) {
    return "404"
  } else {
    return ""
  }
}
