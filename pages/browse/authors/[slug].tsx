import { SITE_NAME } from "../../../src/config/constants"
import { fetchSearchResults } from "../../../src/server/api/search"
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
import { buildLockedBrowseQuery } from "../../../src/utils/browseUtils"

interface ContributorSearchProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
  slug: string
  errorStatus?: HTTPStatusCode | null
  metadataTitle?: string
  role?: string
}

/**
 * The Browse contributors bib results page is responsible for fetching and displaying bib results
 * filtered by at least one author/contributor, with or without a role. Also displays and controls pagination, sort,
 * and other filters.
 */
export default function ContributorResults({
  bannerNotification,
  results,
  isAuthenticated,
  errorStatus = null,
  metadataTitle,
  slug,
  role,
}: ContributorSearchProps) {
  const { pathname, push, query } = useRouter()

  const { setPersistentFocus } = useFocusContext()

  const searchParams = mapQueryToSearchParams(query)

  const handlePageChange = async (newPage: number) => {
    setPersistentFocus(idConstants.searchResultsHeading)
    await push({
      pathname,
      query: {
        ...query,
        page: newPage.toString(),
      },
    })
  }

  const handleSortChange = async (selectedSortOption: string) => {
    const [sortBy, order] = selectedSortOption.split("_")

    setPersistentFocus(idConstants.searchResultsSort)
    await push({
      pathname,
      query: {
        ...query,
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
      activePage="browse-results"
      searchParams={searchParams}
      handlePageChange={handlePageChange}
      handleSortChange={handleSortChange}
      slug={slug}
      role={role}
    />
  )
}

export async function getServerSideProps({ req, query, params }) {
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const slug: string = params.slug as string
  const role = typeof query.role === "string" ? query.role : null

  const baseQuery = buildLockedBrowseQuery({
    slug,
    query,
    field: "contributorLiteral",
  })

  const results = await fetchSearchResults(mapQueryToSearchParams(baseQuery))

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
      metadataTitle: `Search | ${SITE_NAME}`,
      activePage: "browse-results",
      slug,
      ...(role ? { role } : {}),
    },
  }
}
