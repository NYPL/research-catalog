import {
  DISCOVERY_API_BROWSE_ROUTE,
  SUBJECTS_PER_PAGE,
} from "../../config/constants"
import { logServerError } from "../../utils/appUtils"
import nyplApiClient from "../nyplApiClient"
import type {
  BrowseParams,
  DiscoverySubjectsResponse,
} from "../../types/browseTypes"
import { getBrowseQuery } from "../../utils/browseUtils"

export async function fetchSubjects(
  browseParams?: BrowseParams
): Promise<
  DiscoverySubjectsResponse | { status: number; name?: string; error?: string }
> {
  const browseQuery = getBrowseQuery(browseParams)

  try {
    // Failure to build client will throw from this:
    const client = await nyplApiClient()
    const results = await client.get(
      `${DISCOVERY_API_BROWSE_ROUTE}${browseQuery}&per_page=${SUBJECTS_PER_PAGE.toString()}`
    )

    // Handle no results (404)
    if (results?.totalResults === 0) {
      return {
        status: 404,
        error: `No results found for ${DISCOVERY_API_BROWSE_ROUTE}${browseQuery}&per_page=${SUBJECTS_PER_PAGE.toString()}`,
      }
    }

    // Handle general error
    if (results.status) {
      logServerError(
        "fetchSubjects",
        `${
          results.error && results.error
        } Request: ${DISCOVERY_API_BROWSE_ROUTE}${browseQuery}&per_page=${SUBJECTS_PER_PAGE.toString()}`
      )
      return {
        status: results.status,
        name: results.name,
        error: results.error,
      }
    }

    return {
      status: 200,
      subjects: results.subjects,
      totalResults: results.totalResults,
    }
  } catch (error: any) {
    logServerError("fetchSubjects", error.message)
    return { status: 500, error: error.message }
  }
}
