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
import { logServerError } from "../../utils/appUtils"
import nyplApiClient from "../nyplApiClient"

export async function fetchResults(
  searchParams: SearchParams
): Promise<SearchResultsResponse | Error> {
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
  const resultsQuery = `${queryString}&per_page=${RESULTS_PER_PAGE.toString()}`

  // Get the following in parallel:
  //  - search results
  //  - aggregations
  const client = await nyplApiClient()
  const [resultsResponse, aggregationsResponse] = await Promise.allSettled([
    client.get(`${DISCOVERY_API_SEARCH_ROUTE}${resultsQuery}`),
    client.get(`${DISCOVERY_API_SEARCH_ROUTE}${aggregationQuery}`),
  ])

  // Assign results values for each response when status is fulfilled
  const results =
    resultsResponse.status === "fulfilled" && resultsResponse.value

  const aggregations =
    aggregationsResponse.status === "fulfilled" && aggregationsResponse.value

  try {
    return {
      results,
      aggregations,
      page: searchParams.page,
    }
  } catch (error) {
    logServerError("fetchResults", error.message)
    return new Error("Error fetching Search Results")
  }
}
