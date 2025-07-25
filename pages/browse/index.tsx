import RCHead from "../../src/components/Head/RCHead"
import Layout from "../../src/components/Layout/Layout"
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
      <Layout activePage="browse" isAuthenticated={isAuthenticated}></Layout>
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
      response = await fetchSubjects({ q: "" })
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
