import type { BibParams, BibResponse } from "../../types/bibTypes"
import {
  getBibQuery,
  isNyplBibID,
  standardizeBibId,
} from "../../utils/bibUtils"
import nyplApiClient from "../nyplApiClient"
import {
  DISCOVERY_API_NAME,
  DISCOVERY_API_SEARCH_ROUTE,
  SHEP_HTTP_TIMEOUT,
} from "../../config/constants"
import { appConfig } from "../../config/config"
import logger from "../../../logger"

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
      `${DISCOVERY_API_SEARCH_ROUTE}/${getBibQuery(id, bibParams)}`
    ),
    // Don't fetch annotated-marc for partner records:
    isNyplBibID(id) &&
      (await client.get(
        `${DISCOVERY_API_SEARCH_ROUTE}/${getBibQuery(id, bibParams, true)}`
      )),
  ])

  // Assign results values for each response when status is fulfilled
  const bib = bibResponse.status === "fulfilled" && bibResponse.value
  const annotatedMarc =
    annotatedMarcResponse.status === "fulfilled" && annotatedMarcResponse.value

  // Get subject headings from SHEP API
  // TODO: Revisit this after Enhanced Browse work to determine if it's still necessary
  if (bib.subjectLiteral?.length) {
    const subjectHeadingData = await fetchBibSubjectHeadings(id)
    bib.subjectHeadings =
      (subjectHeadingData && subjectHeadingData["subject_headings"]) || null
  }

  try {
    // If there's a problem with a bib, try to fetch from the Sierra API and redirect to circulating catalog
    if (!bib || !bib.uri || !id.includes(bib.uri)) {
      // TODO: Check if this ID slicing is correct and if this redirect logic is still accurate
      const sierraBibResponse = await client.get(
        `/bibs/sierra-nypl/${id.slice(1)}`
      )
      if (sierraBibResponse.statusCode === 200) {
        return {
          status: 307,
          redirectUrl: `${
            appConfig.urls.circulatingCatalog
          }/search/card?recordId=${id.replace(/^b/, "")}`,
        }
      } else {
        logger.error("There was a problem fetching the bib from Sierra")
        return {
          status: 404,
        }
      }
    }
    // The Discovery API currently returns HTML in the bib attribute when it can't find a bib.
    // TODO: Modify the error response in Discovery API to return a 404 status instead of an HTML string in the bib attribute
    else if (typeof bib === "string") {
      logger.error("There was an error fetching the Bib from the Discovery API")
      return {
        status: 404,
      }
    }
    return {
      bibResult: bib,
      annotatedMarc: annotatedMarc?.bib || null,
      status: 200,
    }
  } catch (error) {
    logger.error(error.message)
    return {
      status: 404,
    }
  }
}

async function fetchBibSubjectHeadings(bibId: string) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), SHEP_HTTP_TIMEOUT)
  try {
    const response = await fetch(
      `${
        appConfig.apiEndpoints.shep[appConfig.environment]
      }/bibs/${bibId}/subject_headings`,
      {
        signal: controller.signal,
      }
    )
    return await response.json()
  } catch (error) {
    logger.error(
      "Error fetching SHEP API data (note: VPN should be used for local testing)",
      error
    )
  } finally {
    clearTimeout(timeoutId)
  }
}
