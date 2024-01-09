import Head from "next/head"
import {
  Heading,
  SimpleGrid,
  Pagination,
  Select,
} from "@nypl/design-system-react-components"
import type { ChangeEvent } from "react"
import { useRouter } from "next/router"
import { parse } from "qs"

import Layout from "../../src/components/Layout/Layout"
import DRBContainer from "../../src/components/DRB/DRBContainer"
import SearchResult from "../../src/components/SearchResult/SearchResult"
import RefineSearch from "../../src/components/RefineSearch/RefineSearch"

import { fetchResults } from "../api/search"
import {
  getSearchResultsHeading,
  mapQueryToSearchParams,
  mapElementsToSearchResultsBibs,
  getQueryString,
  sortOptions,
} from "../../src/utils/searchUtils"
import type { SortKey, SortOrder } from "../../src/types/searchTypes"
import { mapWorksToDRBResults } from "../../src/utils/drbUtils"
import { SITE_NAME, RESULTS_PER_PAGE } from "../../src/config/constants"
import type SearchResultsBib from "../../src/models/SearchResultsBib"

import { aggregationsResults } from "../../__test__/fixtures/searchResultsManyBibs"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({ results }) {
  const { push, query } = useRouter()
  const { itemListElement: searchResultsElements, totalResults } =
    results.results

  const drbResponse = results.drbResults?.data
  const drbWorks = drbResponse?.works

  // TODO: Move this to global context
  const searchParams = mapQueryToSearchParams(query)

  // Map Search Results Elements from response to SearchResultBib objects
  const searchResultBibs = mapElementsToSearchResultsBibs(searchResultsElements)
  // Map DRB Works from response to DRBResult objects
  const drbResults = mapWorksToDRBResults(drbWorks)

  const handlePageChange = async (page: number) => {
    const newQuery = getQueryString({ ...searchParams, page })
    await push(newQuery)
  }

  const handleSortChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedSortOption = e.target.value
    // Extract sort key and order from selected sort option using "_" delineator
    const [sortBy, order] = selectedSortOption.split("_") as [
      SortKey,
      SortOrder | undefined
    ]
    // Push the new query values, removing the page number if set.
    await push(
      getQueryString({ ...searchParams, sortBy, order, page: undefined })
    )
  }

  return (
    <>
      <Head>
        <title>Search Results | {SITE_NAME}</title>
      </Head>
      <Layout
        activePage="search"
        refineSearch={<RefineSearch aggregations={aggregationsResults} />}
        sidebar={
          <>
            {totalResults && (
              <Select
                name="sort_direction"
                id="search-results-sort"
                labelText="Sort by"
                mb="l"
                onChange={handleSortChange}
                value={
                  searchParams.order
                    ? `${searchParams.sortBy}_${searchParams.order}`
                    : searchParams.sortBy
                }
              >
                {Object.keys(sortOptions).map((key) => (
                  <option value={key} key={`sort-by-${key}`}>
                    {sortOptions[key]}
                  </option>
                ))}
              </Select>
            )}
            {drbResponse?.totalWorks && (
              <DRBContainer
                drbResults={drbResults}
                totalWorks={drbResponse.totalWorks}
                searchParams={searchParams}
              />
            )}
          </>
        }
      >
        {totalResults ? (
          <>
            <Heading level="h2" mb="xl" size="heading4">
              {getSearchResultsHeading(
                searchParams.page,
                totalResults,
                searchParams.q
              )}
            </Heading>
            <SimpleGrid columns={1} gap="grid.xl">
              {searchResultBibs.map((bib: SearchResultsBib) => {
                return <SearchResult key={bib.id} bib={bib} />
              })}
            </SimpleGrid>
            <Pagination
              id="results-pagination"
              mt="xl"
              initialPage={searchParams.page}
              currentPage={searchParams.page}
              pageCount={Math.ceil(totalResults / RESULTS_PER_PAGE)}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          /**
           * TODO: The logic and copy for different scenarios will need to be added when
           * filters are implemented
           */
          <Heading level="h3">No results. Try a different search.</Heading>
        )}
      </Layout>
    </>
  )
}

/**
 * resolvedUrl is the original URL of the search page including the search query parameters.
 * It is provided by Next.js as an attribute of the context object that is passed to getServerSideProps.
 *
 * Here it is used to construct a SearchParams object from the parsed query parameters in order to fetch the
 * relevant search results on the server side (via fetchResults).
 *
 */
export async function getServerSideProps({ resolvedUrl }) {
  console.log("spaghetti")
  // Remove everything before the query string delineator '?', necessary for correctly parsing the 'q' param.
  const queryString = resolvedUrl.slice(resolvedUrl.indexOf("?") + 1)
  const results = await fetchResults(mapQueryToSearchParams(parse(queryString)))
  return {
    props: {
      results: JSON.parse(JSON.stringify(results)),
    },
  }
}
