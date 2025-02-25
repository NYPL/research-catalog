import { fetchResults } from "../../../src/server/api/search"
import BrowseResults, { type SearchProps } from "../../search/index"
import { getFreshSortByQuery } from "../../../src/utils/searchUtils"
import initializePatronTokenAuth from "../../../src/server/auth"

export default function BrowseBibResults(props: SearchProps) {
  return <BrowseResults activePage="browse results" {...props} />
}

export async function getServerSideProps({ params, req, resolvedUrl }) {
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const { subject } = params
  const searchParams = {
    page: 1,
    filters: { subjectLiteral: [subject] },
    q: "",
  }
  const results = await fetchResults(searchParams)
  const isAuthenticated = patronTokenResponse.isTokenValid
  const isFreshSortByQuery = getFreshSortByQuery(
    req.headers.referer,
    resolvedUrl
  )
  const bannerNotification =
    "<Banner type='recommendation'>subject notification</Banner>"
  return {
    props: {
      isFreshSortByQuery,
      bannerNotification,
      results,
      isAuthenticated,
    },
  }
}
