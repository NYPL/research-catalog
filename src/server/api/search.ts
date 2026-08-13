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
  const searchQuery = `${queryString}&per_page=${RESULTS_PER_PAGE.toString()}&include_aggregations=true`

  try {
    // Failure to build client will throw from this:
    const client = await nyplApiClient()

    const combinedResponse = await client.get(
      `${DISCOVERY_API_SEARCH_ROUTE}${searchQuery}`
    )

    // Handle no results (404)
    if (combinedResponse?.totalResults === 0) {
      return {
        status: 404,
        error: `No results found for search ${searchQuery}`,
      }
    }

    // Handle general error (no status code returned on success)
    if (combinedResponse.status) {
      logServerError(
        "fetchSearchResults",
        `${combinedResponse.name ? `${combinedResponse.name} ` : ""}${
          combinedResponse.error ? `${combinedResponse.error} ` : ""
        }Request: search ${searchQuery}`
      )
      return {
        status: combinedResponse.status,
        ...(combinedResponse.name && { name: combinedResponse.name }),
        ...(combinedResponse.error && { error: combinedResponse.error }),
      }
    }

    const { aggregations: rawAggregations, ...results } = combinedResponse

    // When filters are present the API returns aggregations as the itemListElement
    // array, normalize to DiscoveryAggregationResults in either case.
    const aggregations = Array.isArray(rawAggregations)
      ? {
          itemListElement: rawAggregations,
        }
      : rawAggregations

    return {
      status: 200,
      results,
      aggregations,
      page: searchParams.page,
    }
  } catch (error: any) {
    logServerError("fetchSearchResults", error)
    return {
      status: 500,
      error: error?.message || error || null,
    }
  }
}
