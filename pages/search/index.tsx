import Head from "next/head"
import { Heading } from "@nypl/design-system-react-components"

import { fetchResults } from "../api/search"

export default function Search({ results }) {
  console.log(JSON.parse(results))
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
