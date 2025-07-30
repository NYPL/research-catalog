import {
  Heading,
  Menu,
  Flex,
  SkeletonLoader,
} from "@nypl/design-system-react-components"
import RCHead from "../../src/components/Head/RCHead"
import Layout from "../../src/components/Layout/Layout"
import SubjectTable from "../../src/components/SubjectTable/SubjectTable"
import { SITE_NAME } from "../../src/config/constants"
import { fetchSubjects } from "../../src/server/api/browse"
import initializePatronTokenAuth from "../../src/server/auth"
import type { HTTPStatusCode } from "../../src/types/appTypes"
import type { DiscoverySubjectsResponse } from "../../src/types/browseTypes"
import {
  getBrowseResultsHeading,
  mapQueryToBrowseParams,
} from "../../src/utils/browseUtils"
import { useRouter } from "next/router"
import useLoading from "../../src/hooks/useLoading"
import { useRef } from "react"
import BrowseError from "../../src/components/BrowseError/BrowseError"

interface BrowseProps {
  results: DiscoverySubjectsResponse
  isAuthenticated: boolean
  errorStatus?: HTTPStatusCode | null
}

/**
 * The Browse index page is responsible for fetching and displaying subject headings,
 * as well as displaying and controlling pagination and sort.
 */
export default function Browse({
  results,
  isAuthenticated,
  errorStatus = null,
}: BrowseProps) {
  const metadataTitle = `Browse Research Catalog | ${SITE_NAME}`
  const { push, query } = useRouter()
  const browseParams = mapQueryToBrowseParams(query)
  const isLoading = useLoading()
  // Ref for accessible announcement of loading state.
  const liveLoadingRegionRef = useRef<HTMLDivElement | null>(null)
  if (errorStatus) {
    return <BrowseError errorStatus={errorStatus} />
  }

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage="browse" isAuthenticated={isAuthenticated}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          mb="l"
        >
          <Heading
            id="browse-results-heading"
            data-testid="browse-results-heading"
            level="h2"
            size="heading5"
            tabIndex={-1}
            noSpace
            minH="40px"
            aria-live="polite"
          >
            {getBrowseResultsHeading(browseParams, results.totalResults)}
          </Heading>
          <Menu width="288px" labelText="placeholder sort" listItemsData={[]} />
        </Flex>
        {isLoading ? (
          <>
            <SkeletonLoader
              showImage={false}
              mb="m"
              ml="0"
              width="900px"
              contentSize={5}
              showHeading={false}
            />
            <div
              id="browse-live-region"
              ref={liveLoadingRegionRef}
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                margin: "-1px",
                padding: 0,
                overflow: "hidden",
                clip: "rect(0,0,0,0)",
                border: 0,
              }}
            />
          </>
        ) : (
          <SubjectTable subjectTableData={results.subjects} />
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req, query }) {
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const { browseType = "subjects" } = query

  let response

  switch (browseType) {
    case "authors":
      //response = await fetchAuthors({ q: "" })
      break
    case "subjects":
    default:
      response = await fetchSubjects(mapQueryToBrowseParams(query))
      break
  }

  // Handle API errors
  if (response?.status !== 200) {
    return { props: { errorStatus: response.status } }
  }

  const isAuthenticated = patronTokenResponse.isTokenValid

  return {
    props: {
      isAuthenticated,
      results: response,
    },
  }
}
