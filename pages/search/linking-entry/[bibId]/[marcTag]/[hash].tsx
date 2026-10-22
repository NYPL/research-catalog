import { useRouter } from "next/router"
import Search from "../../../../../src/components/Search/Search"
import { SITE_NAME } from "../../../../../src/config/constants"
import {
  useFocusContext,
  idConstants,
} from "../../../../../src/context/FocusContext"
import { PatronDataProvider } from "../../../../../src/context/PatronDataContext"
import { fetchSearchResults } from "../../../../../src/server/api/search"
import { findLinkingEntryQuery } from "../../../../../src/server/api/bib"
import initializePatronTokenAuth from "../../../../../src/server/auth"
import { logSingleFilterNoResults } from "../../../../../src/utils/logUtils"
import {
  mapQueryToSearchParams,
  checkForRedirectOnMatch,
  buildLockedSearchQuery,
} from "../../../../../src/utils/searchUtils"
import MyAccount from "../../../../../src/models/MyAccount"
import type { SearchResultsResponse } from "../../../../../src/types/searchTypes"
import type { HTTPStatusCode } from "../../../../../src/types/appTypes"
import type { DiscoveryLinkedEntry } from "../../../../../src/types/bibTypes"

interface SearchLinkedEntryResultsProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
  errorStatus?: HTTPStatusCode | null
  metadataTitle?: string
  accountData?: any
  linkedEntry: DiscoveryLinkedEntry
}

export default function SearchLinkedEntryResults({
  bannerNotification,
  results,
  isAuthenticated,
  errorStatus = null,
  metadataTitle,
  accountData,
  linkedEntry,
}: SearchLinkedEntryResultsProps) {
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
    <PatronDataProvider value={accountData || null}>
      <Search
        bannerNotification={bannerNotification}
        results={results}
        isAuthenticated={isAuthenticated}
        errorStatus={errorStatus}
        metadataTitle={metadataTitle}
        activePage="search"
        searchParams={searchParams}
        handlePageChange={handlePageChange}
        handleSortChange={handleSortChange}
        linkedEntry={linkedEntry}
      />
    </PatronDataProvider>
  )
}

export async function getServerSideProps({ req, query, params }) {
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const { bibId, marcTag, hash } = params as Record<string, string>

  console.log(bibId, marcTag, hash)
  const linkedEntry = await findLinkingEntryQuery(bibId, marcTag, hash)
  console.log(linkedEntry)
  const lockedQuery = linkedEntry.query
  if (!lockedQuery) {
    return { props: { errorStatus: 404 } }
  }

  const baseQuery = buildLockedSearchQuery({
    query,
    lockedQuery,
  })

  const searchParams = mapQueryToSearchParams(baseQuery)

  const results = await fetchSearchResults(searchParams)

  logSingleFilterNoResults(
    "search linking entry gSSP",
    results,
    searchParams,
    req.headers?.referer
  )

  if (results.status !== 200) {
    return { props: { errorStatus: results.status } }
  }

  const redirect = checkForRedirectOnMatch(results, query)
  if (redirect) return { redirect }

  const isAuthenticated = patronTokenResponse.isTokenValid

  let accountData = null
  if (isAuthenticated) {
    const patronId = patronTokenResponse.decodedPatron.sub
    const accountModel = new MyAccount(null, patronId)
    const lists = await accountModel.getLists(patronId)

    accountData = { patron: { id: patronId }, lists }
  }

  return {
    props: {
      bannerNotification,
      results,
      isAuthenticated,
      metadataTitle: `Search | ${SITE_NAME}`,
      activePage: "search",
      linkedEntry,
      accountData,
    },
  }
}
