import {
  DISCOVERY_API_BROWSE_ROUTE,
  BROWSE_RESULTS_PER_PAGE,
} from "../../config/constants"
import { logServerError } from "../../utils/logUtils"
import nyplApiClient from "../nyplApiClient"
import type {
  BrowseParams,
  BrowseType,
  DiscoveryContributorsResponse,
  DiscoverySubjectsResponse,
} from "../../types/browseTypes"
import { getBrowseQuery } from "../../utils/browseUtils"
import type { APIError } from "../../types/appTypes"

export async function fetchBrowse(
  browseType: BrowseType,
  browseParams?: BrowseParams
): Promise<
  DiscoverySubjectsResponse | DiscoveryContributorsResponse | APIError
> {
  const browseQuery = getBrowseQuery(browseParams)

  try {
    // Failure to build client will throw from this:
    const client = await nyplApiClient()
    const request = `${DISCOVERY_API_BROWSE_ROUTE}/${browseType}${browseQuery}&per_page=${BROWSE_RESULTS_PER_PAGE.toString()}`
    const results = await client.get(request)

    // Handle no results (404)
    if (results?.totalResults === 0) {
      return {
        status: 404,
        error: `No results found for ${request}`,
      }
    }

    // Handle general error
    if (results.status) {
      logServerError(
        `fetchBrowse: ${browseType}`,
        `${results.error && results.error} Request: ${request}`
      )
      return {
        status: results.status,
        error: results.error,
      }
    }

    return {
      status: 200,
      [browseType]: results[browseType],
      totalResults: results.totalResults,
    }
  } catch (error: any) {
    logServerError(`fetchBrowse: ${browseType}`, error.message)
    return { status: 500, error: error.message }
  }
}
