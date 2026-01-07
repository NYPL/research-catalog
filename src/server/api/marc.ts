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
    const marcResponse = await client.get(
      `${DISCOVERY_API_SEARCH_ROUTE}/${standardizedId}.marc`
    )
    return {
      status: 200,
      discoveryMarcResult: marcResponse,
    }
  } catch (error: any) {
    logServerError("fetchMarc", error)
    return { status: 500, error }
  }
}
