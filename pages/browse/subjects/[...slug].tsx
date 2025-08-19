import { SITE_NAME } from "../../../src/config/constants"
import { fetchResults } from "../../../src/server/api/search"
import initializePatronTokenAuth from "../../../src/server/auth"
import {
  mapQueryToSearchParams,
  checkForRedirectOnMatch,
} from "../../../src/utils/searchUtils"
import type { SearchResultsResponse } from "../../../src/types/searchTypes"
import type { HTTPStatusCode } from "../../../src/types/appTypes"
import Search from "../../../src/components/Search/Search"
import { useRouter } from "next/router"
import { idConstants, useFocusContext } from "../../../src/context/FocusContext"
import { getBrowseResultsHeading } from "../../../src/utils/browseUtils"

interface SubjectSearchProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
  errorStatus?: HTTPStatusCode | null
  metadataTitle?: string
}

export default function SubjectHeadingResults({
  bannerNotification,
  results,
  isAuthenticated,
  errorStatus = null,
  metadataTitle,
}: SubjectSearchProps) {
  const { pathname, push, query } = useRouter()

  const { setPersistentFocus } = useFocusContext()

  const slug = Array.isArray(query.slug) ? query.slug[0] : query.slug
  const subjectFilterKey = "filters[subjectLiteral][0]"

  // Inject SH filter internally if it’s not already in query
  const initialQuery = {
    ...query,
    [subjectFilterKey]: query[subjectFilterKey] ?? slug,
    page: Array.isArray(query.page) ? query.page[0] : query.page ?? "1",
  }

  const searchParams = mapQueryToSearchParams(initialQuery)

  const handlePageChange = async (newPage: number) => {
    setPersistentFocus(idConstants.searchResultsHeading)
    await push({
      pathname: pathname,
      query: {
        ...query,
        slug: Array.isArray(query.slug) ? query.slug : [query.slug],
        page: newPage.toString(),
      },
    })
  }

  const handleSortChange = async (selectedSortOption: string) => {
    const [sortBy, order] = selectedSortOption.split("_")

    setPersistentFocus(idConstants.searchResultsSort)
    await push({
      pathname: "/browse/subjects/[...slug]",
      query: {
        ...query,
        slug: Array.isArray(query.slug) ? query.slug : [query.slug],
        sort: sortBy,
        sort_direction: order,
        page: "1", // reset page on sort
      },
    })
  }

  return (
    <Search
      bannerNotification={bannerNotification}
      results={results}
      isAuthenticated={isAuthenticated}
      errorStatus={errorStatus}
      metadataTitle={metadataTitle}
      activePage="sh-results"
      searchParams={searchParams}
      handlePageChange={handlePageChange}
      handleSortChange={handleSortChange}
      getResultsHeading={getBrowseResultsHeading}
    />
  )
}

export async function getServerSideProps({ req, query, params }) {
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const subjectFilterKey = "filters[subjectLiteral][0]"

  const { slug: _ignore, ...otherQuery } = query

  // Inject subject filter internally if not in query
  const baseQuery = {
    ...otherQuery,
    [subjectFilterKey]: otherQuery[subjectFilterKey] ?? slug,
    page: Array.isArray(query.page) ? query.page[0] : query.page ?? "1",
  }

  const results = await fetchResults(mapQueryToSearchParams(baseQuery))

  if (results.status !== 200) {
    return { props: { errorStatus: results.status } }
  }

  const redirect = checkForRedirectOnMatch(results, query)
  if (redirect) return { redirect }

  return {
    props: {
      bannerNotification,
      results,
      isAuthenticated: patronTokenResponse.isTokenValid,
      metadataTitle: `Subject Heading Results | ${SITE_NAME}`,
      activePage: "sh-results",
    },
  }
}
