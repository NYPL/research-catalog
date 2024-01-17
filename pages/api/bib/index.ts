import type { BibParams, BibResponse } from "../../../src/types/bibTypes"
import {
  getBibQuery,
  isNyplBibID,
  standardizeBibId,
} from "../../../src/utils/bibUtils"
import nyplApiClient from "../../../src/server/nyplApiClient"
import {
  DISCOVERY_API_NAME,
  DISCOVERY_API_SEARCH_ROUTE,
} from "../../../src/config/constants"
import { appConfig } from "../../../src/config/config"

export async function fetchBib(
  id: string,
  bibParams?: BibParams
): Promise<BibResponse> {
  const standardizedId = standardizeBibId(id)

  // Redirect to Bib page with standardized version of the Bib ID
  if (id !== standardizedId) {
    return {
      status: 307,
      redirectUrl: `/bib/${standardizedId}`,
    }
  }

  const client = await nyplApiClient({ apiName: DISCOVERY_API_NAME })
  const [bibResponse, annotatedMarcResponse] = await Promise.allSettled([
    await client.get(
      `${DISCOVERY_API_SEARCH_ROUTE}/${getBibQuery(standardizedId, bibParams)}`
    ),
    // Don't fetch annotated-marc for partner records:
    isNyplBibID(standardizedId) &&
      (await client.get(
        `${DISCOVERY_API_SEARCH_ROUTE}/${getBibQuery(
          standardizedId,
          bibParams,
          true
        )}`
      )),
  ])

  // Assign results values for each response when status is fulfilled
  const bib = bibResponse.status === "fulfilled" && bibResponse.value
  const annotatedMarc =
    annotatedMarcResponse.status === "fulfilled" && annotatedMarcResponse.value
  try {
    // If there's a problem with a bib, try to fetch from the Sierra API and redirect to circulating catalog
    if (!bib || !bib.uri || !standardizedId.includes(bib.uri)) {
      // TODO: Check if this ID slicing is correct and if this redirect logic is still accurate
      const sierraBibResponse = await client.get(
        `/bibs/sierra-nypl/${standardizedId.slice(1)}`
      )
      if (sierraBibResponse.statusCode === 200) {
        return {
          status: 307,
          redirectUrl: `${appConfig.externalUrls.circulatingCatalog}/iii/encore/record/C__R${standardizedId}`,
        }
      } else {
        console.error("There was a problem fetching the bib from Sierra")
        return {
          status: 404,
        }
      }
    }
    return {
      bib,
      annotatedMarc: annotatedMarc?.bib || null,
      status: 200,
    }
  } catch (error) {
    console.error(error.message)
    return {
      status: 404,
    }
  }
}
