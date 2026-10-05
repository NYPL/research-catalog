import type { SearchResultsResponse } from "../../types/searchTypes"
import { DISCOVERY_API_AUTOCOMPLETE_ROUTE } from "../../config/constants"
import { logServerError } from "../../utils/logUtils"
import nyplApiClient from "../nyplApiClient"
import type { APIError } from "../../types/appTypes"

export async function fetchAutocomplete(
  q: string | string[],
  searchScope: string | string[]
): Promise<SearchResultsResponse | APIError> {
  try {
    // Failure to build client will throw from this:
    const client = await nyplApiClient()

    console.log(`Querying: ${DISCOVERY_API_AUTOCOMPLETE_ROUTE}?q=${q}`)
    const resp = await client.get(
      `${DISCOVERY_API_AUTOCOMPLETE_ROUTE}?q=${q}&search_scope=${searchScope}`
    )

    // Handle no results (404)
    if (resp?.entries?.length === 0) {
      return {
        status: 404,
        error: `No results found for search ${q}`,
      }
    }

    return resp
  } catch (error: any) {
    logServerError("fetchAutocomplete", error)
    return {
      status: 500,
      error: error?.message || error || null,
    }
  }
}
