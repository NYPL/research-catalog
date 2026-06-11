import { useRouter } from "next/router"
import { fetchSearchResults } from "../../src/server/api/search"
import {
  mapQueryToSearchParams,
  getSearchQuery,
  checkForRedirectOnMatch,
} from "../../src/utils/searchUtils"
import type {
  SearchResultsResponse,
  SortKey,
  SortOrder,
} from "../../src/types/searchTypes"
import { SITE_NAME } from "../../src/config/constants"
import initializePatronTokenAuth from "../../src/server/auth"
import { useFocusContext, idConstants } from "../../src/context/FocusContext"
import type {
  APIError,
  APIErrorName,
  HTTPStatusCode,
} from "../../src/types/appTypes"
import Search from "../../src/components/Search/Search"
import { appConfig } from "../../src/config/appConfig"
import { PatronDataProvider } from "../../src/context/PatronDataContext"
import MyAccount from "../../src/models/MyAccount"
import { logSingleFilterNoResults } from "../../src/utils/logUtils"

interface SearchPageProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
  errorStatus?: HTTPStatusCode | null
  accountData?: any
  errorName?: APIErrorName | null
}

/**
 * The Search page is responsible for fetching and displaying the Search results,
 * as well as displaying and controlling pagination and search filters.
 */
export default function SearchPage({
  results,
  isAuthenticated,
  errorStatus = null,
  accountData,
  errorName = null,
}: SearchPageProps) {
  const { push, query } = useRouter()
  // TODO: Move this to global context
  const searchParams = mapQueryToSearchParams(query)

  const searchedFromAdvanced = query.searched_from === "advanced"

  const { setPersistentFocus } = useFocusContext()

  const handlePageChange = async (page: number) => {
    const newQuery = getSearchQuery({ ...searchParams, page })
    setPersistentFocus(idConstants.searchResultsHeading)
    await push(
      `${newQuery}${searchedFromAdvanced ? "&searched_from=advanced" : ""}`
    )
  }

  const handleSortChange = async (selectedSortOption: string) => {
    const [sortBy, order] = selectedSortOption.split("_") as [
      SortKey,
      SortOrder | undefined
    ]
    setPersistentFocus(idConstants.searchResultsSort)
    // Push the new query values, removing the page number if set.
    await push(
      getSearchQuery({ ...searchParams, sortBy, order, page: undefined }),
      undefined,
      { scroll: false }
    )
  }

  return (
    <PatronDataProvider value={accountData || null}>
      <Search
        errorStatus={errorStatus}
        errorName={errorName}
        results={results}
        metadataTitle={`Search | ${SITE_NAME}`}
        activePage="search"
        bannerNotification={appConfig.searchNotification[appConfig.environment]}
        isAuthenticated={isAuthenticated}
        searchParams={searchParams}
        handlePageChange={handlePageChange}
        handleSortChange={handleSortChange}
      />
    </PatronDataProvider>
  )
}

export async function getServerSideProps({ req, query }) {
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)

  const searchParams = mapQueryToSearchParams(query)

  const results = await fetchSearchResults(searchParams)

  logSingleFilterNoResults(
    "search page gSSP",
    results,
    searchParams,
    req.headers?.referer
  )

  // Direct to error display according to status
  if (results.status !== 200) {
    return {
      props: {
        errorStatus: (results as APIError).status,
        ...((results as APIError).name && {
          errorName: (results as APIError).name,
        }),
      },
    }
  }

  // Check for `redirectOnMatch` trigger:
  const redirect = checkForRedirectOnMatch(results, query)
  if (redirect) {
    return { redirect }
  }

  const isAuthenticated = patronTokenResponse.isTokenValid

  // Get just patron and lists data
  let accountData = null
  if (isAuthenticated) {
    const patronId = patronTokenResponse.decodedPatron.sub
    const accountModel = new MyAccount(null, patronId)
    const lists = await accountModel.getLists(patronId)

    accountData = { patron: { id: patronId }, lists }
  }

  return {
    props: {
      results,
      isAuthenticated,
      activePage: "search",
      accountData,
    },
  }
}
