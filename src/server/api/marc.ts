import { standardizeBibId } from "../../utils/bibUtils"
import nyplApiClient from "../nyplApiClient"
import { DISCOVERY_API_SEARCH_ROUTE } from "../../config/constants"
import { logServerError } from "../../utils/appUtils"
import type { APIError } from "../../types/appTypes"
import type { MarcResponse } from "../../types/marcTypes"

export async function fetchMarc(
  bibId: string
): Promise<MarcResponse | APIError> {
  const standardizedId = standardizeBibId(bibId)

  try {
    const client = await nyplApiClient()
    const marcResult = await client.get(
      `${DISCOVERY_API_SEARCH_ROUTE}/xxx.marc`
    )
    // Handle MARC error (log and forward Discovery API error)
    if (marcResult.error || !marcResult.bib) {
      logServerError(
        "fetchMarc",
        `${
          marcResult.error && marcResult.error
        } Request: '${DISCOVERY_API_SEARCH_ROUTE}/${standardizedId}.marc'`
      )
      return {
        status: marcResult.status,
        name: marcResult.name,
        error: marcResult.error,
      }
    }
    return {
      status: 200,
      discoveryMarcResult: marcResult,
    }
  } catch (error: any) {
    logServerError("fetchMarc", error)
    return { status: 500, error }
  }
}
