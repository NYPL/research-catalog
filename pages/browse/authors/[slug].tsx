import { mapQueryToSearchParams } from "../../../src/utils/searchUtils"
import type { SearchResultsResponse } from "../../../src/types/searchTypes"
import type { HTTPStatusCode } from "../../../src/types/appTypes"
import Search from "../../../src/components/Search/Search"
import { useRouter } from "next/router"
import { idConstants, useFocusContext } from "../../../src/context/FocusContext"
import { PatronDataProvider } from "../../../src/context/PatronDataContext"
import { getContributorResultsProps } from "../../../src/server/getContributorResultsProps"

interface ContributorResultsProps {
  bannerNotification?: string
  results: SearchResultsResponse
  isAuthenticated: boolean
  slug: string
  errorStatus?: HTTPStatusCode | null
  metadataTitle?: string
  role?: string
  accountData?: any
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
  accountData,
}: ContributorResultsProps) {
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
        activePage="browse-results"
        searchParams={searchParams}
        handlePageChange={handlePageChange}
        handleSortChange={handleSortChange}
        slug={slug}
        role={role}
      />
    </PatronDataProvider>
  )
}

export async function getServerSideProps(context) {
  return getContributorResultsProps(context, "contributorLiteral")
}
