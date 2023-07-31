import type { SearchParams, SearchResultsResponse } from "../../config/types"
import type { NextApiRequest, NextApiResponse } from "next"
import nyplApiClient from "../../src/server/nyplApiClient"
import { basicQuery } from "../../utils/searchUtils"
import { standardizeBibId } from "../../utils/bibUtils"
import { RESULTS_PER_PAGE } from "../../config/constants"

const createAPIQuery = basicQuery({
  searchKeywords: "",
  sortBy: "relevance",
  field: "all",
  selectedFilters: {},
  identifierNumbers: {},
})

async function nyplApiClientCall(query: string, urlEnabledFeatures?: string[]) {
  const requestOptions =
    process.env.features.includes("on-site-edd") ||
    urlEnabledFeatures.includes("on-site-edd")
      ? { headers: { "X-Features": "on-site-edd" } }
      : {}
  return await nyplApiClient({ apiName: "discovery" }).then((client) =>
    client.get(`/discovery/resources${query}`, requestOptions)
  )
}

export async function fetchResults(
  {
    searchKeywords = "",
    contributor,
    title,
    subject,
    page,
    sortBy,
    field,
    selectedFilters,
    identifierNumbers,
  }: SearchParams,
  order: string,
  callback: (
    results: SearchResultsResponse,
    aggregations: Record<string, string>,
    page: string
  ) => void,
  nextResponse: NextApiResponse,
  features: string[]
): Promise<any> {
  if (field === "standard_number") {
    searchKeywords = standardizeBibId(searchKeywords)
  }

  const encodedQueryString: string = createAPIQuery({
    searchKeywords,
    contributor,
    title,
    subject,
    sortBy: sortBy ? `${sortBy}_${order}` : "",
    selectedFilters,
    field,
    page,
    identifierNumbers,
  })

  const aggregationQuery = `/aggregations?${encodedQueryString}`
  const resultsQuery = `?${encodedQueryString}&per_page=${RESULTS_PER_PAGE.toString()}`

  // Get the following in parallel:
  //  - search results
  //  - aggregations
  Promise.all([
    nyplApiClientCall(resultsQuery, features),
    nyplApiClientCall(aggregationQuery, features),
  ])
    .then((response: [SearchResultsResponse, Record<string, string>]) => {
      const [results, aggregations] = response
      if (identifierNumbers.redirectOnMatch && results.totalResults === 1) {
        const bnumber = results.itemListElement[0].result.uri
        return nextResponse.redirect(`/bib/${bnumber}`)
      }
      callback(results, aggregations, page)
    })
    .catch(console.error)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {}

export default handler
