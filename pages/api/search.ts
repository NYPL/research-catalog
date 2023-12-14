import type { NextApiRequest, NextApiResponse } from "next"

import type {
  SearchParams,
  SearchResultsResponse,
} from "../../src/types/searchTypes"
import {
  BASE_URL,
  PATHS,
  DISCOVERY_API_NAME,
  DISCOVERY_API_SEARCH_ROUTE,
  DRB_API_NAME,
  RESULTS_PER_PAGE,
} from "../../src/config/constants"
import nyplApiClient from "../../src/server/nyplApiClient/index"
import {
  getSearchQuery,
  mapQueryToSearchParams,
  mapRequestBodyToSearchParams,
} from "../../src/utils/searchUtils"
import { standardizeBibId } from "../../src/utils/bibUtils"
import { getDRBQueryStringFromSearchParams } from "../../src/utils/drbUtils"

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

  const queryString = getSearchQuery(modifiedSearchParams)

  const aggregationQuery = `/aggregations${queryString}`
  const resultsQuery = `${queryString}&per_page=${RESULTS_PER_PAGE.toString()}`
  const drbQuery = getDRBQueryStringFromSearchParams(modifiedSearchParams)

  // Get the following in parallel:
  //  - search results
  //  - aggregations
  //  - drb results
  const client = await nyplApiClient({ apiName: DISCOVERY_API_NAME })
  const drbClient = await nyplApiClient({ apiName: DRB_API_NAME })

  const [resultsResponse, aggregationsResponse, drbResultsResponse] =
    await Promise.allSettled([
      await client.get(`${DISCOVERY_API_SEARCH_ROUTE}${resultsQuery}`),
      await client.get(`${DISCOVERY_API_SEARCH_ROUTE}${aggregationQuery}`),
      await drbClient.get(drbQuery),
    ])

  // Assign results values for each response when status is fulfilled
  const results =
    resultsResponse.status === "fulfilled" && resultsResponse.value

  const aggregations =
    aggregationsResponse.status === "fulfilled" && aggregationsResponse.value

  const drbResults =
    drbResultsResponse.status === "fulfilled" && drbResultsResponse.value

  try {
    return {
      results,
      aggregations,
      drbResults,
      page: searchParams.page,
    }
  } catch (error) {
    return new Error("Error fetching Search Results")
  }
}

/**
 * Default API route handler for Search
 * Calls a helper function that maps the query params object to a SearchParams object
 * It is then passed to fetchResults, which fetches the results and returns a JSON response
 * via its onSuccess callback on a successful fetch
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const searchParams = mapQueryToSearchParams(req.query)
    const response = await fetchResults(searchParams)
    res.status(200).json(response)
  }
  // If we emit a POST request to the route handler, we are likely submitting an advanced search
  // with JS disabled. In this case, parse the request body and redirect to the results page.
  if (req.method === "POST") {
    const body = await req.body
    const searchParams = mapRequestBodyToSearchParams(body)
    const queryString = getSearchQuery(searchParams)
    res.redirect(BASE_URL + PATHS.SEARCH + queryString)
  }
}

export default handler
