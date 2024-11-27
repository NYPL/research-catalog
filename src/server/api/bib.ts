import type { BibQueryParams, BibResponse } from "../../types/bibTypes"
import {
  isNyplBibID,
  getBibQueryString,
  standardizeBibId,
  itemFiltersActive,
} from "../../utils/bibUtils"
import nyplApiClient from "../nyplApiClient"
import {
  DISCOVERY_API_SEARCH_ROUTE,
  ITEM_VIEW_ALL_BATCH_SIZE,
  SHEP_HTTP_TIMEOUT,
} from "../../config/constants"
import { appConfig } from "../../config/config"
import logger from "../../../logger"
import type { DiscoveryItemResult } from "../../types/itemTypes"

export async function fetchBib(
  id: string,
  bibQuery?: BibQueryParams
): Promise<BibResponse> {
  const standardizedId = standardizeBibId(id)
  // Redirect to Bib page with standardized version of the Bib ID
  if (id !== standardizedId) {
    return {
      status: 307,
      redirectUrl: `/bib/${standardizedId}`,
    }
  }

  const client = await nyplApiClient()
  const [bibResponse, annotatedMarcResponse] = await Promise.allSettled([
    await client.get(
      `${DISCOVERY_API_SEARCH_ROUTE}/${standardizedId}${getBibQueryString(
        bibQuery
      )}`
    ),
    // Don't fetch annotated-marc for partner records:
    isNyplBibID(standardizedId) &&
      (await client.get(
        `${DISCOVERY_API_SEARCH_ROUTE}/${standardizedId}.annotated-marc${getBibQueryString(
          bibQuery,
          true
        )}`
      )),
  ])

  // Assign results values for each response when status is fulfilled
  const discoveryBibResult =
    bibResponse.status === "fulfilled" && bibResponse.value
  const annotatedMarc =
    annotatedMarcResponse.status === "fulfilled" && annotatedMarcResponse.value

  // Get subject headings from SHEP API
  // TODO: Revisit this after Enhanced Browse work to determine if it's still necessary
  if (discoveryBibResult.subjectLiteral?.length) {
    const subjectHeadingData = await fetchBibSubjectHeadings(id)
    discoveryBibResult.subjectHeadings =
      (subjectHeadingData && subjectHeadingData["subject_headings"]) || null
  }

  try {
    // If there's a problem with a bib, try to fetch from the Sierra API and redirect to circulating catalog
    if (
      !discoveryBibResult ||
      !discoveryBibResult.uri ||
      !id.includes(discoveryBibResult.uri)
    ) {
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
    else if (typeof discoveryBibResult === "string") {
      logger.error("There was an error fetching the Bib from the Discovery API")
      return {
        status: 404,
      }
    }

    // Only call the batched fetch when some of the filters are active
    // TODO: Remove this when view_all endpoint in discovery supports query params
    if (bibQuery?.all_items && itemFiltersActive(bibQuery)) {
      discoveryBibResult.items = await fetchAllBibItemsWithQuery(
        bibQuery,
        discoveryBibResult.numItemsMatched,
        // allow control of batch size in query param for testing
        bibQuery?.batch_size || ITEM_VIEW_ALL_BATCH_SIZE
      )
    }

    return {
      discoveryBibResult,
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

// TODO: Remove this when view_all endpoint in discovery supports query params
async function fetchAllBibItemsWithQuery(
  bibQuery: BibQueryParams,
  numItems: number,
  batchSize: number
): Promise<DiscoveryItemResult[]> {
  const items: DiscoveryItemResult[] = []
  const client = await nyplApiClient()
  const totalBatchNum = Math.ceil(numItems / batchSize)

  for (let batchNum = 1; batchNum <= totalBatchNum; batchNum++) {
    try {
      const pageQueryString = getBibQueryString(
        {
          ...bibQuery,
          item_page: batchNum,
        },
        false
      )
      const bibPage = await client.get(
        `${DISCOVERY_API_SEARCH_ROUTE}/${bibQuery.id}${pageQueryString}`
      )
      if (bibPage?.items?.length) {
        items.push(...bibPage.items)
      } else {
        throw new Error(
          "There was en error fetching items in one of the batches"
        )
      }
    } catch (error) {
      logger.error(error.message)
    }
  }
  return items
}
