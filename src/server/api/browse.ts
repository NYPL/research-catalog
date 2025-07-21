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
): Promise<DiscoverySubjectsResponse | { status: number; message?: string }> {
  const browseQuery = getBrowseQuery(browseParams)

  try {
    // Failure to build client will throw from this:
    const client = await nyplApiClient()
    const res = await client.get(
      `${DISCOVERY_API_BROWSE_ROUTE}${browseQuery}&per_page=${SUBJECTS_PER_PAGE.toString()}`
    )

    // Handle empty results (404)
    if (res.status === 404 || res.subjects.length === 0) {
      logServerError(
        "fetchSubjects",
        `${
          res.message ? res.message : "No subjects found"
        } Request: ${DISCOVERY_API_BROWSE_ROUTE}${browseQuery}`
      )
      return {
        status: res.status ?? 404,
        message: res.message ?? "No subjects found",
      }
    }

    return {
      status: 200,
      subjects: res.subjects,
    }
  } catch (error: any) {
    logServerError("fetchSubjects", error.message)
    return { status: 500, message: error.message }
  }
}
