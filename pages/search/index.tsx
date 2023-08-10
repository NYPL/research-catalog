import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"
import { useEffect, useState } from "react"

import { fetchResults } from "../api/search"
import {
  getQueryString,
  mapQueryToSearchParams,
} from "../../src/utils/searchUtils"

export default function Search({
  serverResults,
  defaultSearchParams = { searchKeywords: "cat" },
}) {
  const [searchResults, setSearchResults] = useState(serverResults)
  const [searchParams, setSearchParams] = useState(defaultSearchParams)

  useEffect(() => {
    if (!serverResults) {
      const queryString = getQueryString(searchParams)
      fetch(`/research/research-catalog/api/search?${queryString}`)
        .then((response) => response.json())
        .then((resultsData) => {
          setSearchResults(resultsData)
        })
    }
  }, [serverResults, searchParams])

  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      <Heading level="two">Search Results</Heading>
      <button onClick={() => setSearchParams({ searchKeywords: "dog" })}>
        Update Search Params
      </button>
      <div>{JSON.stringify(searchResults)}</div>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const results = await fetchResults(mapQueryToSearchParams(query))
  return {
    props: {
      serverResults: JSON.stringify(results),
    },
  }
}
