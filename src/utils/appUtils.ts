import type { RCPage } from "../types/pageTypes"

/**
 * getActivePage(pathname)
 * Returns the Research Catalog page ID for a given pathname.
 * Used for determining the current page for activating menu links and
 * conditionally rendering the Search.
 */
export const getActivePage = (pathname: string): RCPage => {
  if (pathname === "/" || pathname === "/search") {
    return "search"
  } else if (pathname.includes("advanced")) {
    return "advanced"
  } else if (pathname.includes("subject_headings")) {
    return "shep"
  } else if (pathname.includes("account")) {
    return "account"
  } else if (pathname.includes("404")) {
    return "404"
  } else {
    return ""
  }
}
