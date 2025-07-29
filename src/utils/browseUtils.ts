import { BROWSE_FORM_OPTIONS, SUBJECTS_PER_PAGE } from "../config/constants"
import type {
  BrowseParams,
  BrowseQueryParams,
  DiscoverySubjectResult,
  DiscoverySubjectVariantResult,
} from "../types/browseTypes"
import { getPaginationOffsetStrings } from "./appUtils"

/**
 * mapQueryToBrowseParams
 * Maps the BrowseQueryParams structure from the request to a BrowseParams object,
 * which is expected by fetchSubjects
 * It also parses the results page number from a string, defaulting to 1 if absent
 */
export function mapQueryToBrowseParams({
  q = "",
  search_scope,
  sort_direction,
  page,
  sort,
}: BrowseQueryParams): BrowseParams {
  return {
    q: q,
    page: page ? parseInt(page) : 1,
    searchScope: search_scope,
    sort: sort,
    sortDirection: sort_direction,
  }
}

/**
 * getBrowseQuery
 * Builds a query string from a BrowseParams object
 */
export function getBrowseQuery(params: BrowseParams): string {
  const {
    sort = "relevance",
    q,
    page = 1,
    sortDirection = "desc",
    searchScope = "has",
  } = params
  const browseKeywordsQuery = encodeURIComponent(q)
  // TO DO: confirm if this should enforce the respective default sorts
  const sortQuery = `&sort=${sort}&sort_direction=${sortDirection}`
  const scopeQuery = `&search_scope=${searchScope}`
  const pageQuery = page !== 1 ? `&page=${page}` : ""

  const completeQuery = `${browseKeywordsQuery}${scopeQuery}${sortQuery}${pageQuery}`
  return completeQuery?.length ? `?q=${completeQuery}` : ""
}

export function isVariantSubject(
  subject: DiscoverySubjectResult
): subject is DiscoverySubjectVariantResult {
  return "variantTerm" in subject
}

export function getSubjectURL(term: string) {
  const subject = encodeURIComponent(term).replace(/%2D%2D/g, "--")
  return `/browse/subjects/${subject}`
}

export const browseFormSelectOptions = Object.keys(BROWSE_FORM_OPTIONS).map(
  (key) => ({
    text: BROWSE_FORM_OPTIONS[key].text,
    value: key,
  })
)

/**
 * getBrowsehResultsHeading
 * Used to generate the browse results heading text (Displaying 1-30 of 300 Subject Headings containing "cats")
 */
export function getBrowseResultsHeading(
  browseParams: BrowseParams,
  totalResults: number
): string {
  const [resultsStart, resultsEnd] = getPaginationOffsetStrings(
    browseParams.page,
    totalResults,
    SUBJECTS_PER_PAGE
  )

  return `Displaying ${
    totalResults > SUBJECTS_PER_PAGE
      ? `${resultsStart}-${resultsEnd}`
      : totalResults.toLocaleString()
  } of${totalResults === 10000 ? " over" : ""} ${totalResults.toLocaleString()}`
}
