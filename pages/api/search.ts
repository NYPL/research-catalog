import type {
  IdentifierNumbers,
  SearchParams,
  SearchFilters,
  SearchResultsResponse,
} from "../../config/types"
import type { NextApiRequest, NextApiResponse } from "next"
import nyplApiClient from "../../src/server/nyplApiClient"
import {
  basicQuery,
  createSelectedFiltersHash,
  getSearchParams,
} from "../../utils/searchUtils"
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
    process.env.features?.includes("on-site-edd") ||
    urlEnabledFeatures?.includes("on-site-edd")
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
  features?: string[]
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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const {
      page,
      q,
      contributor,
      title,
      subject,
      sort,
      order,
      fieldQuery,
      filters,
      issn,
      isbn,
      oclc,
      lccn,
      redirectOnMatch,
    } = getSearchParams(req.query)

    const identifierNumbers: IdentifierNumbers = {
      issn,
      isbn,
      oclc,
      lccn,
      redirectOnMatch,
    }

    const sortBy = sort.length
      ? [sort, order].filter((field) => field.length).join("_")
      : "relevance"

    // If user is making a search for periodicals,
    // add an issuance filter on the serial field and
    // switch field from 'journal_title' to 'title'
    let apiQueryField = fieldQuery
    const additionalFilters: SearchFilters = {}
    if (fieldQuery === "journal_title") {
      additionalFilters.issuance = ["urn:biblevel:s"]
      apiQueryField = "title"
    }

    const apiQueryFilters: SearchFilters = { ...filters, ...additionalFilters }

    await fetchResults(
      {
        searchKeywords: q,
        contributor,
        title,
        subject,
        page,
        sortBy,
        field: apiQueryField,
        selectedFilters: apiQueryFilters,
        identifierNumbers,
      },
      order,
      (apiFilters, searchResults, pageQuery) => {
        res.status(200).json({
          filters: apiFilters,
          searchResults,
          page: pageQuery,
          selectedFilters: createSelectedFiltersHash(filters, apiFilters),
          searchKeywords: q,
          sortBy,
          field: fieldQuery,
          contributor,
          title,
          subject,
        })
      },
      res
    )
  }
}

export default handler
