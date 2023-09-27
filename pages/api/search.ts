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
  RESULTS_PER_PAGE,
} from "../../src/config/constants"
import nyplApiClient from "../../src/server/nyplApiClient/index"
import {
  getQueryString,
  mapQueryToSearchParams,
  mapRequestBodyToSearchParams,
} from "../../src/utils/searchUtils"
import { standardizeBibId } from "../../src/utils/bibUtils"

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

  const queryString = getQueryString({
    ...searchParams,
    ...journalParams,
    q: keywordsOrBibId,
  })

  const aggregationQuery = `/aggregations${queryString}`
  const resultsQuery = `${queryString}&per_page=${RESULTS_PER_PAGE.toString()}`

  // Get the following in parallel:
  //  - search results
  //  - aggregations
  const client = await nyplApiClient({ apiName: DISCOVERY_API_NAME })

  const [results, aggregations] = await Promise.all([
    await client.get(`${DISCOVERY_API_SEARCH_ROUTE}${resultsQuery}`),
    await client.get(`${DISCOVERY_API_SEARCH_ROUTE}${aggregationQuery}`),
  ])

  try {
    return {
      results,
      aggregations,
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
    const queryString = getQueryString(searchParams)
    res.redirect(BASE_URL + PATHS.SEARCH + queryString)
  }
}

export default handler
