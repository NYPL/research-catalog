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
import type { ChangeEvent } from "react"
import { useRouter } from "next/router"
import Layout from "../../src/components/Layout/Layout"
import DRBContainer from "../../src/components/DRB/DRBContainer"
import SearchResult from "../../src/components/SearchResults/SearchResult"
import SearchResultsSort from "../../src/components/SearchResults/SearchResultsSort"
import AppliedFilters from "../../src/components/AppliedFilters/AppliedFilters"
import { fetchResults } from "../../src/server/api/search"
import {
  getSearchResultsHeading,
  mapQueryToSearchParams,
  mapElementsToSearchResultsBibs,
  getSearchQuery,
  checkForRedirectOnMatch,
} from "../../src/utils/searchUtils"
import type {
  SearchResultsResponse,
  SortKey,
  SortOrder,
} from "../../src/types/searchTypes"
import { mapWorksToDRBResults } from "../../src/utils/drbUtils"
import { SITE_NAME, RESULTS_PER_PAGE } from "../../src/config/constants"
import type SearchResultsBib from "../../src/models/SearchResultsBib"
import useLoading from "../../src/hooks/useLoading"
import initializePatronTokenAuth from "../../src/server/auth"
import RCHead from "../../src/components/Head/RCHead"
import type { Aggregation } from "../../src/types/filterTypes"
import SearchFilters from "../../src/components/SearchFilters/SearchFilters"
import { useFocusContext } from "../../src/context/FocusContext"

interface SearchProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
  isFreshSortByQuery: boolean
  isFreshFilterQuery: boolean
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
  const searchedFromAdvanced = query.searched_from === "advanced"

  const searchResultsHeadingRef = useRef(null)

  const { lastFocusedId, setLastFocusedId } = useFocusContext()

  const isFirstLoad = useRef<boolean>(false)

  useEffect(() => {
    if (isLoading) return
    let didFocusElement = false

    if (lastFocusedId) {
      const selectors = ["button", "input", "p", "h2", "select"]
      for (const selector of selectors) {
        const el = document.querySelector(`${selector}[id="${lastFocusedId}"]`)
        if (el) {
          ;(el as HTMLElement).focus()
          didFocusElement = true
          break
        }
      }
    }

    if (!didFocusElement && isFirstLoad.current) {
      searchResultsHeadingRef.current?.focus()
    }

    isFirstLoad.current = true
  }, [isLoading])

  const handlePageChange = async (page: number) => {
    const newQuery = getSearchQuery({ ...searchParams, page })
    setLastFocusedId(null)
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
    setLastFocusedId("search-results-sort")
    // Push the new query values, removing the page number if set.
    await push(
      getSearchQuery({ ...searchParams, sortBy, order, page: undefined })
    )
  }

  const displayFilters = !!aggs?.filter((agg: Aggregation) => agg.values.length)
    .length

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
              <DRBContainer
                drbResults={drbResults}
                totalWorks={drbResponse?.totalWorks}
                searchParams={searchParams}
              />
            </Box>
          ) : isLoading ? (
            <SkeletonLoader showImage={false} width="250px" />
          ) : null
        }
      >
        {totalResults ? (
          <Box
            sx={{
              ml: { base: "0px", md: "32px" },
            }}
          >
            <Flex flexDir="column">
              {displayAppliedFilters && <AppliedFilters aggregations={aggs} />}
              <Flex justifyContent="space-between" marginTop="xxs">
                <Heading
                  data-testid="search-results-heading"
                  level="h2"
                  size="heading5"
                  // Heading component does not expect tabIndex prop, so we
                  // are ignoring the typescript error that pops up.
                  tabIndex={-1}
                  paddingBottom="0"
                  mb={{ base: "s", md: "l" }}
                  minH="40px"
                  ref={searchResultsHeadingRef}
                  aria-live="polite"
                >
                  {getSearchResultsHeading(searchParams, totalResults)}
                </Heading>
                <SearchResultsSort
                  searchParams={searchParams}
                  handleSortChange={handleSortChange}
                  // TODO: Extend the Layout component to receive a prop that contains content to be shown below the
                  //  main header, which will include the search results heading and the sort select, which would allow us
                  //  to only render the sort select once.
                  display={{
                    base: "none",
                    md: "block",
                  }}
                />
              </Flex>
            </Flex>

            <SearchResultsSort
              // Mobile only Search Results Sort Select
              // Necessary due to the placement of the Select in the main content on mobile only.
              id="search-results-sort-mobile"
              searchParams={searchParams}
              handleSortChange={handleSortChange}
              display={{
                base: "block",
                md: "none",
              }}
            />
            {isLoading ? (
              <SkeletonLoader showImage={false} mb="m" />
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
              initialPage={searchParams.page}
              currentPage={searchParams.page}
              pageCount={Math.ceil(totalResults / RESULTS_PER_PAGE)}
              onPageChange={handlePageChange}
            />
          </Box>
        ) : isLoading ? (
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

export async function getServerSideProps({ req, query }) {
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const results = await fetchResults(mapQueryToSearchParams(query))

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
