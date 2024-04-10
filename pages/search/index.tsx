import Head from "next/head"
import {
  Heading,
  SimpleGrid,
  Pagination,
  Select,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import { useEffect, useRef, type ChangeEvent } from "react"
import { useRouter } from "next/router"
import { parse } from "qs"

import SearchForm from "../../src/components/SearchForm/SearchForm"
import Layout from "../../src/components/Layout/Layout"
import DRBContainer from "../../src/components/DRB/DRBContainer"
import SearchResult from "../../src/components/SearchResult/SearchResult"

import { fetchResults } from "../../src/server/api/search"
import {
  getSearchResultsHeading,
  mapQueryToSearchParams,
  mapElementsToSearchResultsBibs,
  getSearchQuery,
  sortOptions,
} from "../../src/utils/searchUtils"
import type {
  SearchResultsResponse,
  SortKey,
  SortOrder,
} from "../../src/types/searchTypes"
import { mapWorksToDRBResults } from "../../src/utils/drbUtils"
import { SITE_NAME, RESULTS_PER_PAGE } from "../../src/config/constants"
import type SearchResultsBib from "../../src/models/SearchResultsBib"
import { SearchResultsAggregationsProvider } from "../../src/context/SearchResultsAggregationsContext"

import useLoading from "../../src/hooks/useLoading"
import initializePatronTokenAuth from "../../src/server/auth"
import AppliedFilters from "../../src/components/SearchFilters/AppliedFilters"

interface SearchProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
}

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({
  bannerNotification,
  results,
  isAuthenticated,
}: SearchProps) {
  const metadataTitle = `Search Results | ${SITE_NAME}`
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

  const isLoading = useLoading()

  const handlePageChange = async (page: number) => {
    const newQuery = getSearchQuery({ ...searchParams, page })
    await push(newQuery)
  }

  const aggs = results?.aggregations?.itemListElement
  // if there are no results, then applied filters correspond to aggregations
  // with no values, which will break our code down the line. Do not render
  // the Applied Filters tagset.
  const displayAppliedFilters = totalResults > 0

  const handleSortChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedSortOption = e.target.value
    // Extract sort key and order from selected sort option using "_" delineator
    const [sortBy, order] = selectedSortOption.split("_") as [
      SortKey,
      SortOrder | undefined
    ]
    // Push the new query values, removing the page number if set.
    await push(
      getSearchQuery({ ...searchParams, sortBy, order, page: undefined })
    )
  }

  const searchResultsHeadingRef = useRef(null)
  useEffect(() => {
    console.log("spaghetti")
    if (!isLoading) {
      console.log("not loading")
      searchResultsHeadingRef.current.focus()
    }
  }, [isLoading])

  const searchForm = (
    <SearchForm
      aggregations={aggs}
      searchResultsHeadingRef={searchResultsHeadingRef}
    />
  )
  return (
    <>
      <Head>
        <meta property="og:title" content={metadataTitle} key="og-title" />
        <meta
          property="og:site_name"
          content={metadataTitle}
          key="og-site-name"
        />
        <meta name="twitter:title" content={metadataTitle} key="tw-title" />
        <title key="main-title">{metadataTitle}</title>
      </Head>
      <Layout
        searchForm={searchForm}
        isAuthenticated={isAuthenticated}
        activePage="search"
        bannerNotification={bannerNotification}
        sidebar={
          <>
            {totalResults > 0 ? (
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
            ) : null}
            {isLoading ? (
              <SkeletonLoader showImage={false} />
            ) : drbResponse?.totalWorks > 0 ? (
              <DRBContainer
                drbResults={drbResults}
                totalWorks={drbResponse.totalWorks}
                searchParams={searchParams}
              />
            ) : null}
          </>
        }
      >
        {totalResults ? (
          <>
            {isLoading ? (
              <SkeletonLoader showImage={false} />
            ) : (
              <>
                {displayAppliedFilters && (
                  <AppliedFilters aggregations={aggs} />
                )}
                <Heading
                  level="h2"
                  tabIndex="0"
                  mb="xl"
                  size="heading4"
                  ref={searchResultsHeadingRef}
                >
                  {getSearchResultsHeading(searchParams, totalResults)}
                </Heading>
                <SimpleGrid columns={1} gap="grid.xl">
                  {searchResultBibs.map((bib: SearchResultsBib) => {
                    return <SearchResult key={bib.id} bib={bib} />
                  })}
                </SimpleGrid>
              </>
            )}
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
export async function getServerSideProps({ resolvedUrl, req }) {
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""

  // Remove everything before the query string delineator '?', necessary for correctly parsing the 'q' param.
  const queryString = resolvedUrl.slice(resolvedUrl.indexOf("?") + 1)
  const results = await fetchResults(mapQueryToSearchParams(parse(queryString)))
  const patronTokenResponse = await initializePatronTokenAuth(req)
  const isAuthenticated = patronTokenResponse.isTokenValid

  return {
    props: {
      bannerNotification,
      results,
      isAuthenticated,
    },
  }
}
