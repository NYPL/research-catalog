import { SUBJECTS_PER_PAGE } from "../config/constants"
import type {
  BrowseParams,
  BrowseQueryParams,
  DiscoveryPreferredSubjectResult,
  DiscoveryPreferredTermResult,
  DiscoverySubjectResult,
  SubjectLink,
} from "../types/browseTypes"
import {
  encodeURIComponentWithPeriods,
  getPaginationOffsetStrings,
} from "./appUtils"
import {
  buildFilterQuery,
  collapseMultiValueQueryParams,
} from "./refineSearchUtils"

/**
 * Default sort configuration per search scope
 */
export const defaultSortMap: Record<string, { sortBy: string; order: string }> =
  {
    starts_with: { sortBy: "termLabel", order: "asc" },
    has: { sortBy: "count", order: "desc" },
  }

const getValidParam = (
  validParams: string[],
  param: string,
  defaultParam: string
) => {
  return validParams.includes(param as string)
    ? (param as string)
    : defaultParam
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
  // Use "has" as the default search scope if none provided
  const searchScope = getValidParam(["has", "starts_with"], search_scope, "has")

  const defaultSort = defaultSortMap[searchScope]

  // Validate or fall back to default sortBy
  const sortBy = getValidParam(
    ["termLabel", "count"],
    sort as string,
    defaultSort.sortBy
  )
  // Validate or fall back to default order
  const order = getValidParam(
    ["asc", "desc"],
    sort_direction as string,
    defaultSort.order
  )
  return {
    q,
    page: page ? parseInt(page) : 1,
    searchScope,
    sortBy,
    order,
  }
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
    const defaultSort = defaultSortMap[searchScope]
    sortBy = defaultSort.sortBy
    order = defaultSort.order
  }

  const browseKeywordsQuery = encodeURIComponentWithPeriods(q)
  const sortQuery = `&sort=${sortBy}&sort_direction=${order}`
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

export function getSubjectSearchURL(term: string) {
  const subject = encodeURIComponentWithPeriods(term).replace(/%2D%2D/g, "--")
  return `/browse/subjects/${subject}`
}

export function getSubjectBrowseURL(term: string) {
  return `/browse?q=${term}&search_scope=starts_with`
}

/**
 * getBrowseIndexHeading
 * Used to generate the browse index heading text (Displaying 1-30 of 300 Subject Headings containing "cats")
 */
export function getBrowseIndexHeading(
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
  termLabel_asc: "Subject Heading (A - Z)",
  termLabel_desc: "Subject Heading (Z - A)",
  count_desc: "Count (High - Low)",
  count_asc: "Count (Low - High)",
}

export function buildSubjectLinks(
  terms: DiscoveryPreferredTermResult[]
): SubjectLink[] {
  const termLinks: SubjectLink[] = []

  for (const termObj of terms) {
    termLinks.push({
      termLabel: termObj.termLabel,
      url: getSubjectBrowseURL(termObj.termLabel),
      count: termObj.count?.toLocaleString() || "",
    })
  }
  return termLinks
}

export function buildLockedBrowseQuery({
  slug,
  query,
  field,
}: {
  slug: string
  query: Record<string, any>
  field: string
}) {
  const collapsedFilters = collapseMultiValueQueryParams(query)

  // Merge the locked slug in, it should be first in its filter array
  const merged = {
    ...collapsedFilters,
    [field]: [slug, ...(collapsedFilters[field] ?? [])],
  }

  return {
    ...Object.fromEntries(
      Object.entries(query).filter(
        ([key]) => !key.startsWith(`filters[${field}]`)
      )
    ),
    // rebuild filters
    ...buildFilterQuery(merged),
    // normalize page
    page: Array.isArray(query.page) ? query.page[0] : query.page ?? "1",
  }
}
