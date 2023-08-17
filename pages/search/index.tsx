import Head from "next/head"
import {
  Card,
  CardHeading,
  Heading,
  SimpleGrid,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"

import RCLink from "../../src/components/RCLink/RCLink"
import DRBContainer from "../../src/components/DRBContainer/DRBContainer"
import { fetchResults } from "../api/search"
import { mapQueryToSearchParams } from "../../src/utils/searchUtils"
import type { SearchResultsItem } from "../../src/types/searchTypes"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({ results }) {
  const { query } = useRouter()

  const searchParams = mapQueryToSearchParams(query)

  // Remove page and identifiers fields from drbParams to prevent re-fetches
  const drbParams = { ...searchParams, page: undefined, identifiers: undefined }

  return (
    <div style={{ paddingBottom: "var(--nypl-space-l)" }}>
      <Head>
        <title>NYPL Research Catalog</title>
      </Head>
      {results?.results?.totalResults ? (
        <div style={{ display: "flex" }}>
          <SimpleGrid columns={1} gap="grid.m">
            <Heading level="three">
              {`Displaying 1-50 of ${results.results.totalResults.toLocaleString()} results for keyword "${
                searchParams.searchKeywords
              }"`}
            </Heading>
            {results.results.itemListElement.map(
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
          <DRBContainer searchParams={drbParams} />
        </div>
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
