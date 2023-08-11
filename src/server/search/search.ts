import type {
  SearchParams,
  SearchResultsResponse,
} from "../../types/searchTypes"
import {
  DISCOVERY_API_SEARCH_ROUTE,
  RESULTS_PER_PAGE,
} from "../../config/constants"
import nyplApiClient from "../nyplApiClient/index"
import { getQueryString } from "../../utils/searchUtils"
import { standardizeBibId } from "../../utils/bibUtils"

export async function fetchResults(
  searchParams: SearchParams
): Promise<SearchResultsResponse | void> {
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
  return Promise.all([
    await nyplApiClient({ apiName: "discovery" }).then((client) =>
      client.get(`${DISCOVERY_API_SEARCH_ROUTE}${resultsQuery}`)
    ),
    await nyplApiClient({ apiName: "discovery" }).then((client) =>
      client.get(`${DISCOVERY_API_SEARCH_ROUTE}${aggregationQuery}`)
    ),
  ])
    .then(([results, aggregations]) => {
      return Promise.resolve({
        results,
        aggregations,
        page: searchParams.page,
      })
    })
    .catch((error) => {
      console.error(error)
      return Promise.reject("Error fetching Search Results")
    })
}
