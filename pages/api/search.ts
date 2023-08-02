import type {
  SearchParams,
  SearchResultsResponse,
} from "../../src/types/searchTypes"
import type { NextApiRequest, NextApiResponse } from "next"
import nyplApiClient from "../../src/server/nyplApiClient"
import {
  getQueryString,
  mapQueryToSearchParams,
} from "../../src/utils/searchUtils"
import {
  DISCOVERY_API_SEARCH_ROUTE,
  RESULTS_PER_PAGE,
} from "../../src/config/constants"
import { standardizeBibId } from "../../src/utils/bibUtils"

export async function fetchResults(
  searchParams: SearchParams,
  onSuccess: (
    results: SearchResultsResponse,
    aggregations: SearchResultsResponse,
    page: string
  ) => void,
  nextResponse: NextApiResponse
): Promise<any> {
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

  const queryString = getQueryString({
    ...searchParams,
    ...journalParams,
    // standardize bib ID if search field is set to "standard_number"
    searchKeywords:
      field === "standard_number"
        ? standardizeBibId(searchKeywords)
        : searchKeywords,
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
      // TODO: find out why we are redirecting based on identifierNumbers
      if (
        searchParams.identifierNumbers.redirectOnMatch &&
        results.totalResults === 1
      ) {
        const bnumber = results.itemListElement[0].result.uri
        return nextResponse.redirect(`/bib/${bnumber as string}`)
      }
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
    await fetchResults(
      searchParams,
      (results, aggregations, page) => {
        res.status(200).json({
          results,
          aggregations,
          page,
        })
      },
      res
    )
  }
}

export default handler
