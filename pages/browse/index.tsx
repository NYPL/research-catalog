import {
  Heading,
  Flex,
  SkeletonLoader,
  Icon,
  Pagination,
  Box,
} from "@nypl/design-system-react-components"
import RCHead from "../../src/components/Head/RCHead"
import Layout from "../../src/components/Layout/Layout"
import SubjectTable from "../../src/components/SubjectTable/SubjectTable"
import { SITE_NAME, SUBJECTS_PER_PAGE } from "../../src/config/constants"
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
  getBrowseIndexHeading,
  mapQueryToBrowseParams,
} from "../../src/utils/browseUtils"
import { useRouter } from "next/router"
import useLoading from "../../src/hooks/useLoading"
import { useRef, useEffect } from "react"
import ResultsError from "../../src/components/ResultsError/ResultsError"
import { idConstants, useFocusContext } from "../../src/context/FocusContext"
import type { SortOrder } from "../../src/types/searchTypes"
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
  const metadataTitle = `Browse | ${SITE_NAME}`
  const { query, push } = useRouter()
  const browseParams = mapQueryToBrowseParams(query)

  const isLoading = useLoading()
  const { setPersistentFocus } = useFocusContext()

  // Ref for accessible announcement of loading state.
  const liveLoadingRegionRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (liveLoadingRegionRef.current) {
      liveLoadingRegionRef.current.textContent = "Loading results"
    }
  }, [isLoading])

  if (errorStatus) {
    return <ResultsError errorStatus={errorStatus} page="browse" />
  }

  const handlePageChange = async (page: number) => {
    const newQuery = getBrowseQuery({ ...browseParams, page })
    setPersistentFocus(idConstants.browseResultsHeading)
    await push(newQuery)
  }

  const handleSortChange = async (selectedSortOption: string) => {
    const [sortBy, order] = selectedSortOption.split("_") as [
      BrowseSort,
      SortOrder | undefined
    ]
    setPersistentFocus(idConstants.browseResultsSort)
    await push(
      getBrowseQuery({
        ...browseParams,
        sortBy,
        order,
        page: undefined,
      }),
      undefined,
      { scroll: false }
    )
  }

  const loader = (
    <>
      <SkeletonLoader
        showImage={false}
        mb="m"
        ml="0"
        maxWidth="900px"
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
        textAlign="center"
        gap="xs"
        mb="l"
        mt="l"
      >
        <Icon
          color="section.research.secondary"
          decorative
          name="utilitySearch"
          size="xlarge"
          variant="default"
        />
        <Heading size="heading6" color="section.research.secondary">
          Use the search bar above to start browsing the Subject Headings index
        </Heading>
      </Flex>
    )
  }

  const renderResults = () => {
    return (
      <Box mb="xxl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          mb="l"
          gap={{ base: 0, md: "xs" }}
        >
          <Heading
            id="browse-results-heading"
            data-testid="browse-results-heading"
            level="h2"
            size="heading5"
            tabIndex={-1}
            minH="40px"
            aria-live="polite"
            mb={{ base: "m", md: 0 }}
          >
            {getBrowseIndexHeading(browseParams, results.totalResults)}
          </Heading>
          <ResultsSort
            params={browseParams}
            sortOptions={browseSortOptions}
            handleSortChange={handleSortChange}
          />
        </Flex>
        {isLoading ? (
          loader
        ) : (
          <SubjectTable subjectTableData={results.subjects} />
        )}
        <Pagination
          id="results-pagination"
          mt="xxl"
          className="no-print"
          initialPage={browseParams.page}
          currentPage={browseParams.page}
          pageCount={Math.ceil(results.totalResults / SUBJECTS_PER_PAGE)}
          onPageChange={handlePageChange}
        />
      </Box>
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
