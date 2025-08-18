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

interface SubjectSearchProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
  errorStatus?: HTTPStatusCode | null
  metadataTitle?: string
  initialQuery: Record<string, any>
}

export default function SubjectHeadingResults({
  bannerNotification,
  results,
  isAuthenticated,
  errorStatus = null,
  metadataTitle,
  initialQuery,
}: SubjectSearchProps) {
  return (
    <Search
      bannerNotification={bannerNotification}
      results={results}
      isAuthenticated={isAuthenticated}
      errorStatus={errorStatus}
      metadataTitle={metadataTitle}
      activePage="sh-results"
      initialQuery={initialQuery}
    />
  )
}

export async function getServerSideProps({ req, query, params }) {
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug

  // const existingSubjects = query.subject
  //   ? Array.isArray(query.subject)
  //     ? query.subject[0]
  //     : [query.subject]
  //   : []

  // const subjects = [slug, ...existingSubjects.filter((s) => s !== slug)]

  const { slug: _ignore, ...otherQuery } = query
  const baseQuery = {
    ...otherQuery,
    subject: slug,
  }

  const results = await fetchResults(mapQueryToSearchParams(baseQuery))

  if (results.status !== 200) {
    return { props: { errorStatus: results.status } }
  }

  const redirect = checkForRedirectOnMatch(results, query)
  if (redirect) {
    return { redirect }
  }
  console.log(baseQuery)
  return {
    props: {
      bannerNotification,
      results,
      isAuthenticated: patronTokenResponse.isTokenValid,
      activePage: "sh-results",
      metadataTitle: `Subject Heading Results | ${SITE_NAME}`,
      initialQuery: baseQuery,
    },
  }
}
