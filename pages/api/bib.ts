import type { NextApiRequest, NextApiResponse } from "next"

import type { BibParams, BibResponse } from "../../src/types/bibTypes"
import {
  getBibQuery,
  isNyplBibID,
  standardizeBibId,
} from "../../src/utils/bibUtils"
import nyplApiClient from "../../src/server/nyplApiClient/"
import {
  DISCOVERY_API_NAME,
  DISCOVERY_API_SEARCH_ROUTE,
} from "../../src/config/constants"

export async function fetchBib(bibParams: BibParams): Promise<BibResponse> {
  const { id } = bibParams
  const standardizedId = standardizeBibId(id)

  // Redirect to Bib page with standardized ID
  if (id !== standardizedId) {
    return {
      status: 301,
      redirectUrl: `/bib/${standardizedId}`,
    }
  }

  // Don't fetch annotated-marc for partner records:
  const getAnnotatedMarc = isNyplBibID(id)

  const client = await nyplApiClient({ apiName: DISCOVERY_API_NAME })
  const [bibResponse, annotatedMarcResponse] = await Promise.allSettled([
    await client.get(`${DISCOVERY_API_SEARCH_ROUTE}/${getBibQuery(bibParams)}`),
    getAnnotatedMarc &&
      (await client.get(
        `${DISCOVERY_API_SEARCH_ROUTE}/${getBibQuery(bibParams, true)}`
      )),
  ])

  // Assign results values for each response when status is fulfilled
  const bib = bibResponse.status === "fulfilled" && bibResponse.value
  const annotatedMarc =
    annotatedMarcResponse.status === "fulfilled" && annotatedMarcResponse.value

  try {
    if (!bib) new Error("Bib not found")

    if (!bib.uri || !id.includes(bib.uri))
      new Error("There was a problem with the URI field in the Bib response")

    return {
      bib,
      annotatedMarc: annotatedMarc?.bib || null,
      status: 200,
    }
  } catch (error) {
    return {
      status: 404,
    }
  }
}

/**
 * Default API route handler for Bib page
 * Calls a helper function that maps the query params object to a SearchParams object
 * It is then passed to fetchResults, which fetches the results and returns a JSON response
 * via its onSuccess callback on a successful fetch
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json([])
  }
}

export default handler
