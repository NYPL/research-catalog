import { SITE_NAME } from "../config/constants"
import { fetchSearchResults } from "./api/search"
import initializePatronTokenAuth from "./auth"
import {
  mapQueryToSearchParams,
  checkForRedirectOnMatch,
} from "../utils/searchUtils"
import { buildLockedBrowseQuery } from "../utils/browseUtils"
import { logSingleFilterNoResults } from "../utils/logUtils"
import MyAccount from "../models/MyAccount"

// Shared by the /browse/authors and /browse/author-title routes, which only differ their locked filter
export async function getContributorResultsProps(
  { req, query, params },
  field: "contributorLiteral" | "contributorNameTitle"
) {
  const bannerNotification = process.env.SEARCH_RESULTS_NOTIFICATION || ""
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const slug: string = params.slug as string
  const role = typeof query.role === "string" ? query.role : null

  const baseQuery = buildLockedBrowseQuery({
    slug,
    query,
    field,
  })

  const searchParams = mapQueryToSearchParams(baseQuery)

  const results = await fetchSearchResults(searchParams)

  logSingleFilterNoResults(
    "browse authors gSSP",
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
      activePage: "browse-results",
      slug,
      ...(role ? { role } : {}),
      accountData,
    },
  }
}
