import type { NextApiRequest, NextApiResponse } from "next"

import type {
  SearchParams,
  SearchResultsResponse,
} from "../../src/types/searchTypes"
import {
  DISCOVERY_API_SEARCH_ROUTE,
  RESULTS_PER_PAGE,
} from "../../src/config/constants"
import nyplApiClient from "../../src/server/nyplApiClient"
import {
  getQueryString,
  mapQueryToSearchParams,
} from "../../src/utils/searchUtils"
import { standardizeBibId } from "../../src/utils/bibUtils"

export async function fetchResults(
  searchParams: SearchParams,
  onSuccess: (
    results: SearchResultsResponse,
    aggregations: SearchResultsResponse,
    page: string
  ) => void
): Promise<void> {
  const { searchKeywords, field, selectedFilters } = searchParams

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

  // If user is making a search for bib number (i.e. field set to "standard_number"),
  // standardize the bib ID and pass it as the search keywords
  const keywordsOrBibId =
    field === "standard_number"
      ? standardizeBibId(searchKeywords)
      : searchKeywords

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
  Promise.all([
    await nyplApiClient({ apiName: "discovery" }).then((client) =>
      client.get(`${DISCOVERY_API_SEARCH_ROUTE}${resultsQuery}`)
    ),
    await nyplApiClient({ apiName: "discovery" }).then((client) =>
      client.get(`${DISCOVERY_API_SEARCH_ROUTE}${aggregationQuery}`)
    ),
  ])
    .then(([results, aggregations]) => {
      onSuccess(results, aggregations, searchParams.page)
    })
    .catch(console.error)
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
    await fetchResults(searchParams, (results, aggregations, page) => {
      res.status(200).json({
        results,
        aggregations,
        page,
      })
    })
  }
}

export default handler
