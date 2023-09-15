import Head from "next/head"
import {
  Card,
  CardHeading,
  Heading,
  SimpleGrid,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"
import { isEmpty } from "underscore"

import { fetchResults } from "../api/search"
import { mapQueryToSearchParams } from "../../src/utils/searchUtils"
import RCLink from "../../src/components/RCLink/RCLink"
import type { SearchResultsElement } from "../../src/types/searchTypes"
import SearchResultsBib from "../../src/models/SearchResultsBib"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({ results }) {
  const { query } = useRouter()
  const searchParams = mapQueryToSearchParams(query)

  const { itemListElement, totalResults } = results.results

  const searchResultBibs = itemListElement
    .filter((result: SearchResultsElement) => {
      return !(isEmpty(result) || (result.result && isEmpty(result.result)))
    })
    .map((result: SearchResultsElement) => {
      return new SearchResultsBib(result.result)
    })

  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      {totalResults ? (
        <>
          <Heading level="three">
            {`Displaying 1-50 of ${results.results.totalResults.toLocaleString()} results for keyword "${
              searchParams.searchKeywords
            }"`}
          </Heading>
          <SimpleGrid columns={1} gap="grid.m">
            {searchResultBibs.map((bib: SearchResultsBib) => {
              // TODO: Create SearchResult component to manage result display (https://jira.nypl.org/browse/SCC-3714)
              return (
                <Card key={bib.id}>
                  <CardHeading level="four">
                    <RCLink href={bib.url}>{bib.title}</RCLink>
                  </CardHeading>
                </Card>
              )
            })}
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
