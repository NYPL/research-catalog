import Head from "next/head"
import {
  Heading,
  SimpleGrid,
  Select,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import { parse } from "qs"

import Layout from "../../src/components/Layout/Layout"
import DRBContainer from "../../src/components/DRB/DRBContainer"
import SearchResult from "../../src/components/SearchResult/SearchResult"

import { fetchResults } from "../api/search"
import {
  mapQueryToSearchParams,
  mapElementsToSearchResultsBibs,
  getQueryString,
} from "../../src/utils/searchUtils"
import { mapWorksToDRBResults } from "../../src/utils/drbUtils"
import { SITE_NAME } from "../../src/config/constants"
import type SearchResultsBib from "../../src/models/SearchResultsBib"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({ results }) {
  const { replace, query } = useRouter()
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

  const handleSortChange = async (e) => {
    const newQuery = getQueryString({ ...searchParams, sortBy: e.target.value })
    await replace(newQuery)
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
            {totalResults && (
              <Select
                name="sort_direction"
                id="search-results-sort"
                labelText="Sort by"
                mb="l"
                onChange={handleSortChange}
                value={searchParams.sortBy}
              >
                <option value="relevance">Relevance</option>
                <option value="relevance2">Relevance2</option>
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
              {`Displaying ${
                totalResults > 50 ? "1-50" : totalResults.toLocaleString()
              } of ${totalResults.toLocaleString()} results for keyword "${
                searchParams.q
              }"`}
            </Heading>
            <SimpleGrid columns={1} gap="grid.xl">
              {searchResultBibs.map((bib: SearchResultsBib) => {
                return <SearchResult key={bib.id} bib={bib} />
              })}
            </SimpleGrid>
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
  const results = await fetchResults(mapQueryToSearchParams(parse(queryString)))
  return {
    props: {
      results: JSON.parse(JSON.stringify(results)),
    },
  }
}
