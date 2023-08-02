import type {
  IdentifierNumbers,
  SearchParams,
  SearchFilters,
  SearchResultsResponse,
} from "../../src/types/searchTypes"
import type { NextApiRequest, NextApiResponse } from "next"
import nyplApiClient from "../../src/server/nyplApiClient"
import { getSearchQuery, getSearchParams } from "../../src/utils/searchUtils"
import { RESULTS_PER_PAGE } from "../../src/config/constants"

export async function fetchResults(
  searchParams: SearchParams,
  callback: (
    results: SearchResultsResponse,
    aggregations: SearchResultsResponse,
    page: string
  ) => void,
  nextResponse: NextApiResponse
): Promise<any> {
  const encodedQueryString = getSearchQuery(searchParams)

  const aggregationQuery = `/aggregations?${encodedQueryString}`
  const resultsQuery = `?${encodedQueryString}&per_page=${RESULTS_PER_PAGE.toString()}`

  // Get the following in parallel:
  //  - search results
  //  - aggregations
  Promise.all([
    await nyplApiClient({ apiName: "discovery" }).then((client) =>
      client.get(`/discovery/resources${resultsQuery}`)
    ),
    await nyplApiClient({ apiName: "discovery" }).then((client) =>
      client.get(`/discovery/resources${aggregationQuery}`)
    ),
  ])
    .then(([results, aggregations]) => {
      if (
        searchParams.identifierNumbers.redirectOnMatch &&
        results.totalResults === 1
      ) {
        const bnumber = results.itemListElement[0].result.uri
        return nextResponse.redirect(`/bib/${bnumber as string}`)
      }
      callback(results, aggregations, searchParams.page)
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
        order,
      },
      (apiFilters, searchResults, pageQuery) => {
        res.status(200).json({
          filters: apiFilters,
          searchResults,
          page: pageQuery,
          selectedFilters: {},
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
