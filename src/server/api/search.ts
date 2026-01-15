import type {
  SearchParams,
  SearchResultsResponse,
} from "../../types/searchTypes"
import { standardizeBibId } from "../../utils/bibUtils"
import { getSearchQuery } from "../../utils/searchUtils"
import {
  DISCOVERY_API_SEARCH_ROUTE,
  RESULTS_PER_PAGE,
} from "../../config/constants"
import { logServerError } from "../../utils/logUtils"
import nyplApiClient from "../nyplApiClient"
import type { APIError } from "../../types/appTypes"

export async function fetchSearchResults(
  searchParams: SearchParams
): Promise<SearchResultsResponse | APIError> {
  const { q, field, filters } = searchParams

  // If user is making a search for bib number (i.e. field set to "standard_number"),
  // standardize the bib ID and pass it as the search keywords
  const keywordsOrBibId = field === "standard_number" ? standardizeBibId(q) : q

  // If user is making a search for periodicals,
  // add an issuance filter on the serial field and
  // switch field from "journal_title" to "title"
  const journalParams: SearchParams =
    field === "journal_title"
      ? {
          field: "title",
          filters: { ...filters, issuance: ["urn:biblevel:s"] },
        }
      : {}

  const modifiedSearchParams = {
    ...searchParams,
    ...journalParams,
    q: keywordsOrBibId,
  }
  let queryString = getSearchQuery(modifiedSearchParams)

  // Fall back to a single "?" in the case of an empty query
  if (!queryString.length) {
    queryString = "?"
  }
  const aggregationQuery = `/aggregations${queryString}`
  const searchQuery = `${queryString}&per_page=${RESULTS_PER_PAGE.toString()}`

  // Get the following in parallel:
  //  - search results
  //  - aggregations
  try {
    // Failure to build client will throw from this:
    const client = await nyplApiClient()

    const [resultsResponse, aggregationsResponse] = await Promise.allSettled([
      client.get(`${DISCOVERY_API_SEARCH_ROUTE}${searchQuery}`),
      client.get(`${DISCOVERY_API_SEARCH_ROUTE}${aggregationQuery}`),
    ])

    // Handle failed promises
    if (resultsResponse.status === "rejected") {
      logServerError("fetchSearchResults", resultsResponse.reason)
      return {
        status: 500,
        error:
          resultsResponse.reason instanceof Error
            ? resultsResponse.reason.message
            : resultsResponse.reason,
      }
    }
    if (aggregationsResponse.status === "rejected") {
      logServerError("fetchSearchResults", aggregationsResponse.reason)
      return {
        status: 500,
        error:
          aggregationsResponse.reason instanceof Error
            ? aggregationsResponse.reason.message
            : aggregationsResponse.reason,
      }
    }

    // Assign results values for each response
    const results = resultsResponse.value

    const aggregations = aggregationsResponse.value

    // Handle no results (404)
    if (results?.totalResults === 0) {
      return {
        status: 404,
        error: `No results found for search ${searchQuery}, aggregations ${aggregationQuery}`,
      }
    }

    // Handle general error
    if (results.status) {
      logServerError(
        "fetchSearchResults",
        `${
          results.error && results.error
        } Requests: search ${searchQuery}, aggregations ${aggregationQuery}`
      )
      return {
        status: results.status,
        error: results.error,
      }
    }

    return {
      status: 200,
      results,
      aggregations,
      page: searchParams.page,
    }
  } catch (error: any) {
    logServerError("fetchSearchResults", error)
    return { status: 500, error }
  }
}
