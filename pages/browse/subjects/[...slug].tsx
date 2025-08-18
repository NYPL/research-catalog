import { useRouter } from "next/router"
import { SITE_NAME } from "../../../src/config/constants"
import { fetchResults } from "../../../src/server/api/search"
import initializePatronTokenAuth from "../../../src/server/auth"
import {
  mapQueryToSearchParams,
  checkForRedirectOnMatch,
} from "../../../src/utils/searchUtils"
import Search from "../../search"
import type { SearchResultsResponse } from "../../../src/types/searchTypes"
import type { HTTPStatusCode } from "../../../src/types/appTypes"
import type { RCPage } from "../../../src/types/pageTypes"

interface SubjectSearchProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
  errorStatus?: HTTPStatusCode | null
  activePage?: RCPage
  metadataTitle?: string
}

/**
 * The Browse subject headings bib results page is responsible for fetching and displaying bib results
 * filtered by at least one subject heading, as well as displaying and controlling pagination, sort,
 * and other filters.
 */
export default function SubjectHeadingResults({
  bannerNotification,
  results,
  isAuthenticated,
  errorStatus = null,
  activePage = "browse",
  metadataTitle,
}: SubjectSearchProps) {
  const router = useRouter()
  const { subject } = router.query

  // Merge the fixed subject into the query
  const modifiedQuery = {
    ...router.query,
    subject: Array.isArray(subject) ? subject[0] : subject, // Ensure single value
  }

  const modifiedProps = {
    bannerNotification,
    results,
    isAuthenticated,
    errorStatus,
    metadataTitle,
    activePage,
    initialQuery: modifiedQuery,
  }
  console.log(activePage)

  return <Search {...modifiedProps} />
}

export async function getServerSideProps({ req, query }) {
  const subject = query.subject || "default-subject"
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)

  // Merge fixed subject
  const searchParams = mapQueryToSearchParams({ ...query, subject })

  const results = await fetchResults(searchParams)

  if (results.status !== 200) {
    return { props: { errorStatus: results.status } }
  }

  const redirect = checkForRedirectOnMatch(results, query)
  if (redirect) {
    return { redirect }
  }

  return {
    props: {
      bannerNotification,
      results,
      isAuthenticated: patronTokenResponse.isTokenValid,
      activePage: "sh-results",
      metadataTitle: `Subject Heading Results | ${SITE_NAME}`,
    },
  }
}
