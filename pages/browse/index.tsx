import { Heading, Menu, Flex } from "@nypl/design-system-react-components"
import { discoverySubjectsResult } from "../../__test__/fixtures/subjectFixtures"
import RCHead from "../../src/components/Head/RCHead"
import Layout from "../../src/components/Layout/Layout"
import SubjectTable from "../../src/components/SubjectTable/SubjectTable"
import { SITE_NAME } from "../../src/config/constants"
import { fetchSubjects } from "../../src/server/api/browse"
import initializePatronTokenAuth from "../../src/server/auth"
import type { HTTPStatusCode } from "../../src/types/appTypes"
import type { DiscoverySubjectsResponse } from "../../src/types/browseTypes"

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
  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage="browse" isAuthenticated={isAuthenticated}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          mt="l"
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
            Displaying x-x of x Subject Headings containing x
          </Heading>
          <Menu width="288px" labelText="placeholder sort" listItemsData={[]} />
        </Flex>
        <SubjectTable subjectTableData={discoverySubjectsResult} />
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
      response = await fetchSubjects({ q: "A", page: 1 })
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
