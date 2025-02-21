import Layout from "../../../src/components/Layout/Layout"

import { fetchResults } from "../../../src/server/api/search"
import SearchResults from "../../../src/components/SearchResults/SearchResults"
import useLoading from "../../../src/hooks/useLoading"
import { mapElementsToSearchResultsBibs } from "../../../src/utils/searchUtils"
import type { SearchResultsResponse } from "../../../src/types/searchTypes"

export default function BrowseBibResults({
  results,
}: {
  results: SearchResultsResponse
}) {
  const { itemListElement: searchResultsElements } = results.results
  const searchResultBibs = mapElementsToSearchResultsBibs(searchResultsElements)
  const isLoading = useLoading()
  return (
    <Layout>
      <SearchResults
        isLoading={isLoading}
        searchResultsBibs={searchResultBibs}
      />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { subject } = params
  const searchParams = { filters: { subjectLiteral: [subject] }, q: "" }
  const results = await fetchResults(searchParams)
  return {
    props: {
      results,
    },
  }
}
