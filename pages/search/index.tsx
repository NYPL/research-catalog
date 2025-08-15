import {
  Heading,
  SimpleGrid,
  Pagination,
  SkeletonLoader,
  Flex,
  Box,
  CardContent,
  Card,
  CardHeading,
} from "@nypl/design-system-react-components"
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import Layout from "../../src/components/Layout/Layout"
import SearchResult from "../../src/components/SearchResults/SearchResult"
import AppliedFilters from "../../src/components/AppliedFilters/AppliedFilters"
import { fetchResults } from "../../src/server/api/search"
import {
  getSearchResultsHeading,
  mapQueryToSearchParams,
  mapElementsToSearchResultsBibs,
  getSearchQuery,
  checkForRedirectOnMatch,
  sortOptions,
} from "../../src/utils/searchUtils"
import type {
  SearchResultsResponse,
  SortKey,
  SortOrder,
} from "../../src/types/searchTypes"
import { SITE_NAME, RESULTS_PER_PAGE } from "../../src/config/constants"
import type SearchResultsBib from "../../src/models/SearchResultsBib"
import useLoading from "../../src/hooks/useLoading"
import initializePatronTokenAuth from "../../src/server/auth"
import RCHead from "../../src/components/Head/RCHead"
import type { Aggregation } from "../../src/types/filterTypes"
import SearchFilters from "../../src/components/SearchFilters/SearchFilters"
import { useFocusContext, idConstants } from "../../src/context/FocusContext"
import type { HTTPStatusCode } from "../../src/types/appTypes"
import ResultsError from "../../src/components/ResultsError/ResultsError"
import ResultsSort from "../../src/components/SearchResults/ResultsSort"

interface SearchProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
  errorStatus?: HTTPStatusCode | null
}

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({
  bannerNotification,
  results,
  isAuthenticated,
  errorStatus = null,
}: SearchProps) {
  const metadataTitle = `Search Results | ${SITE_NAME}`

  const { push, query } = useRouter()

  // TODO: Move this to global context
  const searchParams = mapQueryToSearchParams(query)

  const isLoading = useLoading()
  const searchedFromAdvanced = query.searched_from === "advanced"

  const searchResultsHeadingRef = useRef(null)

  const { setPersistentFocus } = useFocusContext()

  const handlePageChange = async (page: number) => {
    const newQuery = getSearchQuery({ ...searchParams, page })
    setPersistentFocus(idConstants.searchResultsHeading)
    await push(
      `${newQuery}${searchedFromAdvanced ? "&searched_from=advanced" : ""}`
    )
  }

  const handleSortChange = async (selectedSortOption: string) => {
    const [sortBy, order] = selectedSortOption.split("_") as [
      SortKey,
      SortOrder | undefined
    ]
    setPersistentFocus(idConstants.searchResultsSort)
    // Push the new query values, removing the page number if set.
    await push(
      getSearchQuery({ ...searchParams, sortBy, order, page: undefined }),
      undefined,
      { scroll: false }
    )
  }

  // Ref for accessible announcement of loading state.
  const liveLoadingRegionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (liveLoadingRegionRef.current) {
      liveLoadingRegionRef.current.textContent = "Loading results"
    }
  }, [isLoading])

  if (errorStatus) {
    return <ResultsError errorStatus={errorStatus} page="search" />
  }

  const { itemListElement: searchResultsElements, totalResults } =
    results.results

  const aggs = results?.aggregations?.itemListElement
  // if there are no results, then applied filters correspond to aggregations
  // with no values, which will break our code down the line. Do not render
  // the Applied Filters tagset.
  const displayAppliedFilters = totalResults > 0

  const displayFilters = !!aggs?.filter((agg: Aggregation) => agg.values.length)
    .length

  const searchResultBibs = mapElementsToSearchResultsBibs(searchResultsElements)

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout
        bannerNotification={bannerNotification}
        searchAggregations={aggs}
        searchResultsCount={totalResults}
        isAuthenticated={isAuthenticated}
        activePage="search"
        sidebar={
          totalResults > 0 ? (
            <Box display={{ base: "none", md: "block" }} width="100%" pb="l">
              {displayFilters && (
                <Card
                  id="filter-sidebar-container"
                  backgroundColor="ui.bg.default"
                  p="s"
                  borderRadius="8px"
                  mb="s"
                >
                  <CardHeading
                    size="heading6"
                    id="filter-results-heading"
                    tabIndex="0"
                  >
                    Filter results
                  </CardHeading>
                  <CardContent>
                    <SearchFilters aggregations={aggs} />
                  </CardContent>
                </Card>
              )}
            </Box>
          ) : isLoading ? (
            <SkeletonLoader showImage={false} width="250px" />
          ) : null
        }
      >
        <Box
          sx={{
            ml: { base: "0px", md: "32px" },
          }}
        >
          <Flex flexDir="column">
            {displayAppliedFilters && <AppliedFilters aggregations={aggs} />}
            <Flex
              justifyContent="space-between"
              marginTop="xxs"
              direction={{ base: "column", md: "row" }}
            >
              <Heading
                id="search-results-heading"
                data-testid="search-results-heading"
                level="h2"
                size="heading5"
                tabIndex={-1}
                paddingBottom="0"
                mb={{ base: "s", md: "l" }}
                minH="40px"
                ref={searchResultsHeadingRef}
                aria-live="polite"
              >
                {getSearchResultsHeading(searchParams, totalResults)}
              </Heading>
              <ResultsSort
                sortOptions={sortOptions}
                params={searchParams}
                handleSortChange={handleSortChange}
              />
            </Flex>
          </Flex>

          {isLoading ? (
            <>
              <SkeletonLoader showImage={false} mb="m" />
              <div
                id="search-live-region"
                ref={liveLoadingRegionRef}
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  margin: "-1px",
                  padding: 0,
                  overflow: "hidden",
                  clip: "rect(0,0,0,0)",
                  border: 0,
                }}
              />
            </>
          ) : (
            <SimpleGrid columns={1} id="search-results-list" gap="grid.l">
              {searchResultBibs.map((bib: SearchResultsBib) => {
                return <SearchResult key={bib.id} bib={bib} />
              })}
            </SimpleGrid>
          )}
          <Pagination
            id="results-pagination"
            mt="xxl"
            mb="l"
            className="no-print"
            initialPage={searchParams.page}
            currentPage={searchParams.page}
            pageCount={Math.ceil(totalResults / RESULTS_PER_PAGE)}
            onPageChange={handlePageChange}
          />
        </Box>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req, query }) {
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)

  const results = await fetchResults(mapQueryToSearchParams(query))

  // // Handle API errors
  if (results.status !== 200) {
    return { props: { errorStatus: results.status } }
  }

  // Check for `redirectOnMatch` trigger:
  const redirect = checkForRedirectOnMatch(results, query)
  if (redirect) {
    return { redirect }
  }

  const isAuthenticated = patronTokenResponse.isTokenValid

  return {
    props: {
      bannerNotification,
      results,
      isAuthenticated,
    },
  }
}
