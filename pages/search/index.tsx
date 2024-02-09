import Head from "next/head"
import {
  Heading,
  SimpleGrid,
  Pagination,
  Select,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import type { ChangeEvent } from "react"
import { useRouter } from "next/router"
import { parse } from "qs"

import Layout from "../../src/components/Layout/Layout"
import DRBContainer from "../../src/components/DRB/DRBContainer"
import SearchResult from "../../src/components/SearchResult/SearchResult"

import { fetchResults } from "../api/search"
import { fetchEbscoResults, publicationsForIssns } from "../api/ebsco"
import {
  getSearchResultsHeading,
  mapQueryToSearchParams,
  mapElementsToSearchResultsBibs,
  getSearchQuery,
  sortOptions,
} from "../../src/utils/searchUtils"
import type { SortKey, SortOrder } from "../../src/types/searchTypes"
import { mapWorksToDRBResults } from "../../src/utils/drbUtils"
import { SITE_NAME, RESULTS_PER_PAGE } from "../../src/config/constants"
import type SearchResultsBib from "../../src/models/SearchResultsBib"

import EbscoSidebar from "../../src/components/ebsco/EbscoSidebar"
import useLoading from "../../src/hooks/useLoading"

import { issnsForSearchResults } from "../../src/utils/ebscoUtils"
/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({ results, ebscoResults = null }) {
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

  return (
    <>
      <Head>
        <title>Search Results | {SITE_NAME}</title>
      </Head>
      <Layout
        activePage="search"
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
            ) : (
              ebscoResults && <EbscoSidebar results={ebscoResults} />
            )}
            {isLoading ? (
              <SkeletonLoader showImage={false} />
            ) : (
              drbResponse?.totalWorks && (
                <DRBContainer
                  drbResults={drbResults}
                  totalWorks={drbResponse.totalWorks}
                  searchParams={searchParams}
                />
              )
            )}
          </>
        }
      >
        {totalResults ? (
          <>
            {isLoading ? (
              <SkeletonLoader showImage={false} />
            ) : (
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
export async function getServerSideProps({ resolvedUrl }) {
  // Remove everything before the query string delineator '?', necessary for correctly parsing the 'q' param.
  const queryString = resolvedUrl.slice(resolvedUrl.indexOf("?") + 1)

  const query = parse(queryString)
  const [discoveryApiResults, rawEbscoResults] = await Promise.all([
    fetchResults(mapQueryToSearchParams(parse(queryString))),
    fetchEbscoResults(query.q),
  ])

  if ("results" in discoveryApiResults) {
    const issns = issnsForSearchResults(discoveryApiResults)
    const publications = await publicationsForIssns(issns)

    if (publications !== null) {
      discoveryApiResults.results.itemListElement.forEach((result) => {
        if (result.result.idIssn && result.result.idIssn[0]) {
          const ebscoMatches = publications[result.result.idIssn[0]]
          result.result.ebscoResults = ebscoMatches
        }
      })
    }
  }

  const ebscoResults = {
    records:
      rawEbscoResults?.SearchResult?.Data?.Records.filter(
        (record) => record.PLink
      ).map((record) => {
        return {
          id: record.ResultId,
          db: record.Header.DbLabel,
          type: record.Header.PubType,
          title: record.RecordInfo.BibRecord.BibEntity?.Titles[0]?.TitleFull,
          url: record.PLink,
          authors:
            record.RecordInfo.BibRecord.BibRelationships?.HasContributorRelationships?.map(
              (rel) => rel.PersonEntity?.Name?.NameFull
            ) || null,
        }
      }) || [],
    queryString: rawEbscoResults?.SearchRequestGet?.QueryString || null,
    total: rawEbscoResults?.SearchResult?.Statistics?.TotalHits || null,
  }

  return {
    props: {
      results: discoveryApiResults,
      ebscoResults,
    },
  }
}
