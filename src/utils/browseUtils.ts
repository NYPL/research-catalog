import { SUBJECTS_PER_PAGE } from "../config/constants"
import type {
  BrowseParams,
  BrowseQueryParams,
  DiscoveryPreferredSubjectResult,
  DiscoveryPreferredTermResult,
  DiscoverySubjectResult,
  SubjectLink,
} from "../types/browseTypes"
import { getPaginationOffsetStrings } from "./appUtils"

/**
 * Default sort configuration per search scope
 */
export const defaultSortMap: Record<string, { sortBy: string; order: string }> =
  {
    starts_with: { sortBy: "termLabel", order: "asc" },
    has: { sortBy: "count", order: "desc" },
  }

/**
 * mapQueryToBrowseParams
 * Maps the BrowseQueryParams structure from the request to a BrowseParams object,
 * which is expected by fetchSubjects.
 * Parses default/valid sort from given sort and sort direction.
 * Also parses the results page number from a string, defaulting to 1 if absent.
 */
export function mapQueryToBrowseParams({
  q = "",
  search_scope,
  sort_direction,
  page,
  sort,
}: BrowseQueryParams): BrowseParams {
  const validSortBys = ["termLabel", "count"]
  const validOrders = ["asc", "desc"]

  // Use "has" as the default search scope if none provided
  const searchScope = search_scope || "has"

  const defaultSort = defaultSortMap[searchScope]

  // Validate or fall back to default sortBy
  const sortBy = validSortBys.includes(sort as string)
    ? (sort as string)
    : defaultSort.sortBy

  // Validate or fall back to default order
  const order = validOrders.includes(sort_direction as string)
    ? sort_direction
    : defaultSort.order

  return {
    q,
    page: page ? parseInt(page) : 1,
    searchScope,
    sortBy,
    order,
  }
}

/**
 * Returns a sort query string unless using the default sort for the given scope.
 */
function getSortQuery(
  sortBy: string,
  order: string,
  searchScope: string
): string {
  const { sortBy: defaultSortBy, order: defaultOrder } = defaultSortMap[
    searchScope
  ] || { sortBy: "termLabel", order: "asc" }

  const isDefaultSort = sortBy === defaultSortBy && order === defaultOrder
  return isDefaultSort ? "" : `&sort=${sortBy}&sort_direction=${order}`
}

/**
 * getBrowseQuery
 * Builds a query string from a BrowseParams object
 */
export function getBrowseQuery(params: BrowseParams): string {
  const { q, page = 1, searchScope = "has" } = params
  let { sortBy, order } = params

  // If no sort, apply default sort based on search scope
  if (!sortBy || !order) {
    const defaultSort = defaultSortMap[searchScope] || {
      sortBy: "termLabel",
      order: "asc",
    }
    sortBy = defaultSort.sortBy
    order = defaultSort.order
  }

  const browseKeywordsQuery = encodeURIComponent(q)
  const sortQuery = getSortQuery(sortBy, order, searchScope)
  const scopeQuery = `&search_scope=${searchScope}`
  const pageQuery = page !== 1 ? `&page=${page}` : ""

  const completeQuery = `${browseKeywordsQuery}${scopeQuery}${sortQuery}${pageQuery}`
  return completeQuery ? `?q=${completeQuery}` : ""
}

export function isPreferredSubject(
  subject: DiscoverySubjectResult
): subject is DiscoveryPreferredSubjectResult {
  return subject["@type"] === "preferredTerm"
}

export function getSubjectURL(term: string) {
  const subject = encodeURIComponent(term).replace(/%2D%2D/g, "--")
  return `/browse/subjects/${subject}`
}

/**
 * getBrowseResultsHeading
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
      : totalResults?.toLocaleString()
  } of${
    totalResults === 10000 ? " over" : ""
  } ${totalResults?.toLocaleString()} Subject Headings ${
    browseParams.q.length
      ? `${
          browseParams.searchScope === "has" ? "containing" : "beginning with"
        } "${browseParams.q}"`
      : ""
  }`
}

/**
 * browseSortOptions
 * The allowed keys for the sort field and their respective labels
 */
export const browseSortOptions: Record<string, string> = {
  termLabel_asc: "Subject heading (A - Z)",
  termLabel_desc: "Subject heading (Z - A)",
  count_desc: "Count (High - Low)",
  count_asc: "Count (Low - High)",
}

export function buildSubjectLinks(
  terms: DiscoveryPreferredTermResult[]
): SubjectLink[] {
  const termLinks: SubjectLink[] = []

  for (const termObj of terms) {
    termLinks.push({
      termLabel: termObj.label,
      url: getSubjectURL(termObj.label),
      count: termObj.count?.toLocaleString() || "",
    })
  }
  return termLinks
}
