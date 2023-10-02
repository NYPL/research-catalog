import Head from "next/head"
import {
  Card,
  CardHeading,
  Heading,
  SimpleGrid,
} from "@nypl/design-system-react-components"
import { useRouter } from "next/router"

import RCLink from "../../src/components/RCLink/RCLink"
import Layout from "../../src/components/Layout/Layout"
import DRBContainer from "../../src/components/DRB/DRBContainer"
import { fetchResults } from "../api/search"
import {
  mapQueryToSearchParams,
  mapElementsToSearchResultsBibs,
} from "../../src/utils/searchUtils"
import { mapWorksToDRBResults } from "../../src/utils/drbUtils"
import { SITE_NAME } from "../../src/config/constants"
import type SearchResultsBib from "../../src/models/SearchResultsBib"

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function Search({ results }) {
  const { query } = useRouter()
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

  return (
    <>
      <Head>
        <title>Search Results | {SITE_NAME}</title>
      </Head>
      <Layout
        activePage="search"
        sidebar={
          drbResponse && (
            <DRBContainer
              drbResults={drbResults}
              totalWorks={drbResponse.totalWorks}
              searchParams={searchParams}
            />
          )
        }
      >
        {totalResults ? (
          <>
            <Heading level="three">
              {`Displaying 1-50 of ${totalResults.toLocaleString()} results for keyword "${
                searchParams.q
              }"`}
            </Heading>
            <SimpleGrid columns={1}>
              {searchResultBibs.map((bib: SearchResultsBib) => {
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
      </Layout>
    </>
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
