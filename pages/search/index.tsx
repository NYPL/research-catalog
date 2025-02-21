import Head from "next/head"
import {
  Heading,
  Pagination,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import { useEffect, useRef, type ChangeEvent } from "react"
import { useRouter } from "next/router"

import Layout from "../../src/components/Layout/Layout"
import DRBContainer from "../../src/components/DRB/DRBContainer"
import SearchResultsSort from "../../src/components/SearchResults/SearchResultsSort"
import AppliedFilters from "../../src/components/SearchFilters/AppliedFilters"

import { fetchResults } from "../../src/server/api/search"
import {
  getSearchResultsHeading,
  mapQueryToSearchParams,
  mapElementsToSearchResultsBibs,
  getSearchQuery,
  getFreshSortByQuery,
  checkForRedirectOnMatch,
} from "../../src/utils/searchUtils"
import type {
  SearchResultsResponse,
  SortKey,
  SortOrder,
} from "../../src/types/searchTypes"
import { mapWorksToDRBResults } from "../../src/utils/drbUtils"
import { SITE_NAME, RESULTS_PER_PAGE } from "../../src/config/constants"

import useLoading from "../../src/hooks/useLoading"
import initializePatronTokenAuth from "../../src/server/auth"
import SearchResults from "../../src/components/SearchResults/SearchResults"

interface SearchProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
  isFreshSortByQuery: boolean
}

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({
  bannerNotification,
  results,
  isAuthenticated,
  isFreshSortByQuery,
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
  const searchedFromAdvanced = query.searched_from === "advanced"

  const handlePageChange = async (page: number) => {
    const newQuery = getSearchQuery({ ...searchParams, page })
    await push(
      `${newQuery}${searchedFromAdvanced ? "&searched_from=advanced" : ""}`
    )
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
    // don't focus on "Displaying n results..." if the page is not done loading
    if (isLoading) return
    // keep focus on sort by selector if the last update to the query was a sort
    if (isFreshSortByQuery) return
    // otherwise, focus on "Displaying n results..."
    searchResultsHeadingRef?.current?.focus()
  }, [isLoading, isFreshSortByQuery])

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
        bannerNotification={bannerNotification}
        searchAggregations={aggs}
        isAuthenticated={isAuthenticated}
        activePage="search"
        sidebar={
          <>
            {totalResults > 0 ? (
              <SearchResultsSort
                searchParams={searchParams}
                handleSortChange={handleSortChange}
                // We have to render the sort select twice and toggle which is shown at the desktop breakpoint, since
                // the design has it appearing in the sidebar on desktop and in the main content on mobile.
                // Using inline styles to do this for now since using useNYPLBreakpoints had a visible lag.
                // TODO: Extend the Layout component to receive a prop that contains content to be shown below the
                //  main header, which will include the search results heading and the sort select, which would allow us
                //  to only render the sort select once.
                display={{
                  base: "none",
                  md: "block",
                }}
              />
            ) : null}
            {isLoading ? (
              <SkeletonLoader showImage={false} />
            ) : (
              <DRBContainer
                drbResults={drbResults}
                totalWorks={drbResponse?.totalWorks}
                searchParams={searchParams}
              />
            )}
          </>
        }
      >
        {totalResults ? (
          <>
            {isLoading ? (
              <SkeletonLoader showImage={false} mb="m" />
            ) : (
              <>
                {displayAppliedFilters && (
                  <AppliedFilters aggregations={aggs} />
                )}
                <Heading
                  data-testid="search-results-heading"
                  level="h2"
                  size="heading5"
                  // Heading component does not expect tabIndex prop, so we
                  // are ignoring the typescript error that pops up.
                  tabIndex={-1}
                  mb={{ base: "s", md: "l" }}
                  minH="40px"
                  ref={searchResultsHeadingRef}
                >
                  {getSearchResultsHeading(searchParams, totalResults)}
                </Heading>
              </>
            )}
            <SearchResultsSort
              // Mobile only Search Results Sort Select
              // Necessary due to the placement of the Select in the main content on mobile only.
              id="search-results-sort-mobile"
              searchParams={searchParams}
              handleSortChange={handleSortChange}
              // We have to render the sort select twice and toggle which is shown at the desktop breakpoint, since
              // the design has it appearing in the sidebar on desktop and in the main content on mobile.
              // Using inline styles to do this for now since using useNYPLBreakpoints had a visible lag.
              // TODO: Extend the Layout component to receive a prop that contains content to be shown below the
              //  main header, which will include the search results heading and the sort select, which would allow us
              //  to only render the sort select once.
              display={{
                base: "block",
                md: "none",
              }}
            />
            <SearchResults
              isLoading={isLoading}
              searchResultsBibs={searchResultBibs}
            />
            <Pagination
              id="results-pagination"
              mt="xxl"
              mb="l"
              initialPage={searchParams.page}
              currentPage={searchParams.page}
              pageCount={Math.ceil(totalResults / RESULTS_PER_PAGE)}
              onPageChange={handlePageChange}
            />
          </>
        ) : /**
         * TODO: The logic and copy for different scenarios will need to be added when
         * filters are implemented
         */
        isLoading ? (
          <SkeletonLoader showImage={false} />
        ) : (
          // Heading component does not expect tabIndex prop, so we are ignoring
          // the typescript error that pops up.
          // @ts-expect-error
          <Heading ref={searchResultsHeadingRef} tabIndex="0" level="h3">
            No results. Try a different search.
          </Heading>
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
export async function getServerSideProps({ resolvedUrl, req, query }) {
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const results = await fetchResults(mapQueryToSearchParams(query))

  // Check for `redirectOnMatch` trigger:
  const redirect = checkForRedirectOnMatch(results, query)
  if (redirect) {
    return { redirect }
  }

  const isAuthenticated = patronTokenResponse.isTokenValid
  const isFreshSortByQuery = getFreshSortByQuery(
    req.headers.referer,
    resolvedUrl
  )
  return {
    props: {
      isFreshSortByQuery,
      bannerNotification,
      results,
      isAuthenticated,
    },
  }
}
