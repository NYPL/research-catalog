import { shepToBrowse } from "../../data/shepToBrowse"
import { encodeURIComponentWithPeriods } from "./appUtils"

// Given a `/subject_headings*` URL, gets redirect destination in `/browse`
export function getBrowseDestination(url) {
  const lookupKey = decodeURIComponent(
    (url.pathname + url.search).replace(/\+/g, " ")
  )

  // Exact mapping to given url
  if (shepToBrowse[lookupKey]) {
    return shepToBrowse[lookupKey]
  }

  // Check filter param
  if (url.searchParams.has("filter")) {
    const filter = url.searchParams.get("filter")
    return `/browse?q=${encodeURIComponentWithPeriods(
      filter
    )}&search_scope=starts_with`
  }

  // Check label param
  if (url.searchParams.has("label")) {
    let label = url.searchParams.get("label")
    // Ensure ending period
    if (!label.endsWith(".") && !label.endsWith(")")) label += "."
    return `/browse/subjects/${encodeURIComponentWithPeriods(label)}`
  }

  // Catch-all
  return "/browse"
}
