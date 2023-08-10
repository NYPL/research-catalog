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

export default function Search({ results }) {
  const { query } = useRouter()

  const [searchParams, setSearchParams] = useState(
    mapQueryToSearchParams(query)
  )
  const [searchResults, setSearchResults] = useState(results)

  function fetchResultsFromClient(searchParams: SearchParams) {
    const queryString = getQueryString(searchParams)
    fetch(`/research/research-catalog/api/search?${queryString}`)
      .then((response) => response.json())
      .then((resultsData) => {
        setSearchResults(resultsData)
      })
  }

  useEffect(() => {
    // only fetch results on client side not server-side rendered
    fetchResultsFromClient(searchParams)
  }, [searchParams])

  useEffect(() => {
    setSearchParams(mapQueryToSearchParams(query))
  }, [query])

  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      <Heading level="three">
        {`Displaying 1-50 of ${searchResults.results.totalResults.toLocaleString()} results for keyword "${
          searchParams.searchKeywords
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
