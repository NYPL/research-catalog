import {
  Box,
  Card,
  CardHeading,
  CardContent,
  SkeletonLoader,
  Flex,
  Heading,
  SimpleGrid,
  Pagination,
} from "@nypl/design-system-react-components"
import { RESULTS_PER_PAGE } from "../../config/constants"
import type SearchResultsBib from "../../models/SearchResultsBib"
import {
  getSearchResultsHeading,
  mapElementsToSearchResultsBibs,
  sortOptions,
} from "../../utils/searchUtils"
import AppliedFilters from "../AppliedFilters/AppliedFilters"
import RCHead from "../Head/RCHead"
import Layout from "../Layout/Layout"
import SearchFilters from "../SearchFilters/SearchFilters"
import ResultsSort from "../SearchResults/ResultsSort"
import SearchResult from "../SearchResults/SearchResult"
import { useRef, useEffect } from "react"
import type { Aggregation } from "../../types/filterTypes"
import ResultsError from "../Error/ResultsError"
import useLoading from "../../hooks/useLoading"
import type { HTTPStatusCode } from "../../types/appTypes"
import type {
  SearchParams,
  SearchResultsResponse,
} from "../../types/searchTypes"
import type { RCPage } from "../../types/pageTypes"
import { getBrowseTypeFromPath } from "../../utils/appUtils"
import { useRouter } from "next/router"

interface SearchProps {
  errorStatus?: HTTPStatusCode | null
  results: SearchResultsResponse
  metadataTitle: string
  activePage: RCPage
  bannerNotification: string
  isAuthenticated: boolean
  searchParams: SearchParams
  handlePageChange: (page: number) => Promise<void>
  handleSortChange: (selectedSortOption: string) => Promise<void>
  slug?: string
  role?: string
}

const Search = ({
  errorStatus,
  results,
  metadataTitle,
  activePage,
  bannerNotification,
  isAuthenticated,
  searchParams,
  handlePageChange,
  handleSortChange,
  slug,
  role,
}: SearchProps) => {
  const isLoading = useLoading()
  const router = useRouter()

  const searchResultsHeadingRef = useRef(null)
  // Ref for accessible announcement of loading state.
  const liveLoadingRegionRef = useRef<HTMLDivElement | null>(null)
  const resultsType = getBrowseTypeFromPath(router.asPath)

  useEffect(() => {
    if (liveLoadingRegionRef.current) {
      liveLoadingRegionRef.current.textContent = "Loading results"
    }
  }, [isLoading])

  if (errorStatus) {
    return <ResultsError errorStatus={errorStatus} page={activePage} />
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
        activePage={activePage}
      >
        <Flex direction="row" gap="l">
          {totalResults > 0 && displayFilters ? (
            <Box
              display={{ base: "none", md: "block" }}
              minWidth="288px"
              pb="l"
            >
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
                  <SearchFilters aggregations={aggs} lockedFilterValue={slug} />
                </CardContent>
              </Card>
            </Box>
          ) : isLoading ? (
            <SkeletonLoader showImage={false} width="250px" />
          ) : null}

          <Flex flexDir="column" width="100%" mb="xl">
            {displayAppliedFilters && <AppliedFilters aggregations={aggs} />}
            <Flex
              justifyContent="space-between"
              marginTop="xxs"
              direction={{ base: "column", md: "row" }}
              mb={{ base: "m", md: 0 }}
            >
              <Heading
                id="search-results-heading"
                data-testid="search-results-heading"
                level="h2"
                size="heading5"
                tabIndex={-1}
                paddingBottom="0"
                mb={{ base: "s", md: "l" }}
                mr="m"
                minH="40px"
                ref={searchResultsHeadingRef}
                aria-live="polite"
              >
                {getSearchResultsHeading(
                  searchParams,
                  totalResults,
                  slug
                    ? {
                        slug,
                        browseType: resultsType,
                        role,
                      }
                    : undefined
                )}
              </Heading>
              <ResultsSort
                sortOptions={sortOptions}
                params={searchParams}
                handleSortChange={handleSortChange}
              />
            </Flex>
            {isLoading ? (
              <Box height="200px">
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
              </Box>
            ) : (
              <SimpleGrid columns={1} id="search-results-list" gap="grid.s">
                {searchResultBibs.map((bib: SearchResultsBib) => {
                  return <SearchResult key={bib.id} bib={bib} />
                })}
              </SimpleGrid>
            )}
            <Pagination
              id="results-pagination"
              mt="xxl"
              className="no-print"
              initialPage={searchParams.page}
              currentPage={searchParams.page}
              pageCount={Math.ceil(totalResults / RESULTS_PER_PAGE)}
              onPageChange={handlePageChange}
            />
          </Flex>
        </Flex>
      </Layout>
    </>
  )
}

export default Search
