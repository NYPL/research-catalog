import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { fetchResults } from "../api/search"
import {
  getQueryString,
  mapQueryToSearchParams,
} from "../../src/utils/searchUtils"
import SearchResults from "../../src/components/SearchResults/SearchResults"
import type { SearchParams } from "../../src/types/searchTypes"
import { BASE_URL } from "../../src/config/constants"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({ results }) {
  const { query } = useRouter()

  const [searchResults, setSearchResults] = useState(results)

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
    fetchResultsFromClient(params)
  }, [query])

  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      <Heading level="three">
        {`Displaying 1-50 of ${searchResults.results.totalResults.toLocaleString()} results for keyword "${
          query.q
        }"`}
      </Heading>
      {searchResults && <SearchResults {...searchResults} />}
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
