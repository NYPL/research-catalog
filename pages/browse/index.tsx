import {
  Heading,
  Flex,
  SkeletonLoader,
  Icon,
} from "@nypl/design-system-react-components"
import RCHead from "../../src/components/Head/RCHead"
import Layout from "../../src/components/Layout/Layout"
import SubjectTable from "../../src/components/SubjectTable/SubjectTable"
import { SITE_NAME } from "../../src/config/constants"
import { fetchSubjects } from "../../src/server/api/browse"
import initializePatronTokenAuth from "../../src/server/auth"
import type { HTTPStatusCode } from "../../src/types/appTypes"
import type {
  BrowseSort,
  DiscoverySubjectsResponse,
} from "../../src/types/browseTypes"
import {
  browseSortOptions,
  getBrowseQuery,
  getBrowseResultsHeading,
  mapQueryToBrowseParams,
} from "../../src/utils/browseUtils"
import { useRouter } from "next/router"
import useLoading from "../../src/hooks/useLoading"
import type { ChangeEvent } from "react"
import { useRef } from "react"
import ResultsError from "../../src/components/ResultsError/ResultsError"
import { idConstants, useFocusContext } from "../../src/context/FocusContext"
import type { SortOrder } from "../../src/types/searchTypes"
import { sortOptions } from "../../src/utils/searchUtils"
import ResultsSort from "../../src/components/SearchResults/ResultsSort"

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
  const { query, push } = useRouter()
  const browseParams = mapQueryToBrowseParams(query)
  const isLoading = useLoading()
  const { setPersistentFocus } = useFocusContext()

  // Ref for accessible announcement of loading state.
  const liveLoadingRegionRef = useRef<HTMLDivElement | null>(null)
  if (errorStatus) {
    return <ResultsError errorStatus={errorStatus} page="browse" />
  }

  const loader = (
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
  )

  const renderEmpty = () => {
    return isLoading ? (
      loader
    ) : (
      <Flex
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        gap="xs"
        mb="l"
        mt="l"
      >
        <Icon
          color="section.research.secondary"
          decorative
          name="utilitySearch"
          size="xlarge"
          type="default"
        />
        <Heading size="heading6" color="section.research.secondary">
          Use the search bar above to start browsing the Subject Headings index
        </Heading>
      </Flex>
    )
  }

  const renderResults = () => {
    return (
      <>
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
        </Flex>
        {isLoading ? (
          loader
        ) : (
          <SubjectTable subjectTableData={results.subjects} />
        )}
      </>
    )
  }

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage="browse" isAuthenticated={isAuthenticated}>
        {browseParams.q.length === 0 ? renderEmpty() : renderResults()}
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req, query }) {
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const { browseType = "subjects" } = query

  const browseParams = mapQueryToBrowseParams(query)
  const isAuthenticated = patronTokenResponse.isTokenValid

  // Skip request if no keywords
  if (!browseParams.q || browseParams.q.length === 0) {
    return {
      props: {
        isAuthenticated,
        results: {},
      },
    }
  }

  let response

  switch (browseType) {
    case "authors":
      // response = await fetchAuthors(browseParams)
      break
    case "subjects":
    default:
      response = await fetchSubjects(browseParams)
      break
  }

  if (response?.status !== 200) {
    return { props: { errorStatus: response.status } }
  }

  return {
    props: {
      isAuthenticated,
      results: response,
    },
  }
}
