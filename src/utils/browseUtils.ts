import type { BrowseParams, BrowseQueryParams } from "../types/browseTypes"

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
