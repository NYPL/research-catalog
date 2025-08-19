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
import ResultsError from "../ResultsError/ResultsError"
import useLoading from "../../hooks/useLoading"

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
  getResultsHeading,
}) => {
  const isLoading = useLoading()

  const searchResultsHeadingRef = useRef(null)
  // Ref for accessible announcement of loading state.
  const liveLoadingRegionRef = useRef<HTMLDivElement | null>(null)

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
                    <SearchFilters
                      activePage={activePage}
                      aggregations={aggs}
                    />
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
            mb: "l",
          }}
        >
          <Flex flexDir="column">
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
                mb={{ base: "m", md: "l" }}
                minH="40px"
                ref={searchResultsHeadingRef}
                aria-live="polite"
              >
                {getResultsHeading(searchParams, totalResults)}
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

export default Search
