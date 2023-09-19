import type { NextApiRequest, NextApiResponse } from "next"

import type {
  SearchParams,
  SearchResultsResponse,
} from "../../src/types/searchTypes"
import {
  DISCOVERY_API_NAME,
  DISCOVERY_API_SEARCH_ROUTE,
  RESULTS_PER_PAGE,
} from "../../src/config/constants"
import nyplApiClient from "../../src/server/nyplApiClient/index"
import {
  getQueryString,
  mapQueryToSearchParams,
} from "../../src/utils/searchUtils"
import { standardizeBibId } from "../../src/utils/bibUtils"

export async function fetchResults(
  searchParams: SearchParams
): Promise<SearchResultsResponse | Error> {
  const { searchKeywords, field, selectedFilters } = searchParams

  // If user is making a search for bib number (i.e. field set to "standard_number"),
  // standardize the bib ID and pass it as the search keywords
  const keywordsOrBibId =
    field === "standard_number"
      ? standardizeBibId(searchKeywords)
      : searchKeywords

  // If user is making a search for periodicals,
  // add an issuance filter on the serial field and
  // switch field from "journal_title" to "title"
  const journalParams: SearchParams =
    field === "journal_title"
      ? {
          field: "title",
          selectedFilters: { ...selectedFilters, issuance: ["urn:biblevel:s"] },
        }
      : {}

  const queryString = getQueryString({
    ...searchParams,
    ...journalParams,
    searchKeywords: keywordsOrBibId,
  })

  const aggregationQuery = `/aggregations?${queryString}`
  const resultsQuery = `?${queryString}&per_page=${RESULTS_PER_PAGE.toString()}`

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
  if (req.method === "POST") {
    const searchParams = mapQueryToSearchParams(req.query)
    const response = await fetchResults(searchParams)
    res.status(200).json(response)
  }
}

export default handler
