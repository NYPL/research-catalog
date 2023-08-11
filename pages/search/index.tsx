import Head from "next/head"
import {
  Card,
  CardHeading,
  Heading,
  SimpleGrid,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { fetchResults } from "../api/search"
import {
  getQueryString,
  mapQueryToSearchParams,
} from "../../src/utils/searchUtils"
import { BASE_URL } from "../../src/config/constants"
import RCLink from "../../src/components/RCLink/RCLink"
import type {
  SearchResultsItem,
  SearchParams,
} from "../../src/types/searchTypes"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({ results }) {
  const { query } = useRouter()

  const [searchResults, setSearchResults] = useState(results)

  /**
   * TODO: We will likely need to elevate SearchParams state or move to context in order to keep the
   * search form in sync with the query params
   */
  const [searchParams, setSearchParams] = useState(
    mapQueryToSearchParams(query)
  )

  function fetchResultsFromClient(searchParams: SearchParams) {
    const queryString = getQueryString(searchParams)
    fetch(`${BASE_URL}/api/search?${queryString}`)
      .then((response) => response.json())
      .then((resultsData) => {
        setSearchResults(resultsData)
      })
  }

  /**
   * This useEffect fetches the search results on the client-side fetch whenever the route
   * changes (particularly the query string).
   *
   * NB: This currently fires even when the results are fetched via SSR.
   *
   * TODO: Modify this to fetch the results only on Search Form submissions or
   * when the results have not already been fetched via SSR (https://jira.nypl.org/browse/SCC-3715)
   *
   */
  useEffect(() => {
    const params = mapQueryToSearchParams(query)
    setSearchParams(params)
    fetchResultsFromClient(params)
  }, [query])

  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      {searchResults?.results?.totalResults ? (
        <>
          <Heading level="three">
            {`Displaying 1-50 of ${searchResults.results.totalResults.toLocaleString()} results for keyword "${
              searchParams.searchKeywords
            }"`}
          </Heading>
          <SimpleGrid columns={1} gap="grid.m">
            {searchResults.results.itemListElement.map(
              (result: SearchResultsItem) => {
                // TODO: Create SearchResult component to manage result display (https://jira.nypl.org/browse/SCC-3714)
                return (
                  <Card key={result.result["@id"]}>
                    <CardHeading level="four">
                      <RCLink href="/bib">
                        {result.result["titleDisplay"][0]}
                      </RCLink>
                    </CardHeading>
                  </Card>
                )
              }
            )}
          </SimpleGrid>
        </>
      ) : (
        /**
         * TODO: The logic and copy for different scenarios will need to be added when
         * filters are implemented
         */
        <Heading level="three">No results. Try a different search.</Heading>
      )}
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const results = await fetchResults(mapQueryToSearchParams(query))
  return {
    props: {
      results: JSON.parse(JSON.stringify(results)),
    },
  }
}
