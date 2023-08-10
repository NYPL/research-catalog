import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"
import { useEffect, useState } from "react"

import { fetchResults } from "../api/search"
import { getQueryString } from "../../src/utils/searchUtils"

export default function Search({
  results,
  searchParams = { searchKeywords: "cat" },
}) {
  const [searchResults, setSearchResults] = useState(results)

  useEffect(() => {
    const queryString = getQueryString(searchParams)
    fetch(`/research/research-catalog/api/search?${queryString}`)
      .then((response) => response.json())
      .then((resultsData) => {
        setSearchResults(resultsData)
      })
  }, [searchParams])

  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      <Heading level="two">Search Results</Heading>
    </div>
  )
}

export async function getServerSideProps() {
  const results = await fetchResults({ searchKeywords: "cat" })
  return {
    props: {
      results: JSON.stringify(results),
    },
  }
}
