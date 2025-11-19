import type { BibQueryParams, BibResponse } from "../../types/bibTypes"
import {
  isNyplBibID,
  getBibQueryString,
  itemFiltersActive,
} from "../../utils/bibUtils"
import nyplApiClient from "../nyplApiClient"
import {
  DISCOVERY_API_SEARCH_ROUTE,
  ITEM_VIEW_ALL_BATCH_SIZE,
} from "../../config/constants"
import { appConfig } from "../../config/config"
import { logServerError, standardizeBibId } from "../../utils/appUtils"
import type { DiscoveryItemResult } from "../../types/itemTypes"
import logger from "../../../logger"
import type { HTTPStatusCode } from "../../types/appTypes"
import type { APIError } from "../../types/appTypes"

export async function fetchBib(
  id: string,
  bibQuery?: BibQueryParams,
  itemId?: string
): Promise<BibResponse | APIError> {
  const standardizedId = standardizeBibId(id)
  // Redirect to bib page with standardized version of the bib ID
  if (id !== standardizedId) {
    return {
      status: 307,
      redirectUrl: `/bib/${standardizedId}`,
    }
  }

  const client = await nyplApiClient()
  const [bibResponse, annotatedMarcResponse] = await Promise.allSettled([
    await client.get(
      `${DISCOVERY_API_SEARCH_ROUTE}/${standardizedId}${
        itemId ? `-${itemId}` : ""
      }${getBibQueryString(bibQuery)}`
    ),
    // Don't fetch annotated marc for partner records:
    isNyplBibID(standardizedId) &&
      (await client.get(
        `${DISCOVERY_API_SEARCH_ROUTE}/${standardizedId}${
          itemId ? `-${itemId}` : ""
        }.annotated-marc${getBibQueryString(bibQuery, true)}`
      )),
  ])

  if (bibResponse.status === "rejected") {
    logServerError("fetchBib", bibResponse.reason)
    return {
      status: 500,
      error:
        bibResponse.reason instanceof Error
          ? bibResponse.reason.message
          : bibResponse.reason,
    }
  }
  if (annotatedMarcResponse.status === "rejected") {
    logServerError("fetchBib", annotatedMarcResponse.reason)
    return {
      status: 500,
      error:
        annotatedMarcResponse.reason instanceof Error
          ? annotatedMarcResponse.reason.message
          : annotatedMarcResponse.reason,
    }
  }

  // Assign results values for each response
  const discoveryBibResult = bibResponse.value
  const annotatedMarc = annotatedMarcResponse.value

  // Handle bib error
  try {
    // First try to fetch from the Sierra API and redirect to circulating catalog
    if (
      discoveryBibResult.status === 404 ||
      !discoveryBibResult.uri ||
      !id.includes(discoveryBibResult.uri)
    ) {
      logger.warn(
        `Missing discoveryBibResult for id ${id}, or id does not match uri on returned result`
      )
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
        // Otherwise forward the Discovery API error
      } else {
        logServerError(
          "fetchBib",
          `${
            discoveryBibResult.error && discoveryBibResult.error
          } Request: ${DISCOVERY_API_SEARCH_ROUTE}/${standardizedId}${
            itemId ? `-${itemId}` : ""
          }${getBibQueryString(bibQuery)}`
        )
        return {
          status: discoveryBibResult.status,
          name: discoveryBibResult.name,
          error: discoveryBibResult.error,
        }
      }
    }

    // Log annotated marc error (but don't return an error– we still display bib)
    if (annotatedMarc.status) {
      logServerError(
        "fetchBib",
        `${DISCOVERY_API_SEARCH_ROUTE}/${standardizedId}${
          itemId ? `-${itemId}` : ""
        }.annotated-marc${getBibQueryString(bibQuery, true)}`
      )
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
      status: 200,
      discoveryBibResult,
      annotatedMarc: annotatedMarc?.bib || null,
    }
  } catch (error: any) {
    logServerError("fetchBib", error)
    return { status: 500, error }
  }
}

// TODO: Remove this when view_all endpoint in discovery supports query params
async function fetchAllBibItemsWithQuery(
  bibQuery: BibQueryParams,
  numItems: number,
  batchSize: number
): Promise<DiscoveryItemResult[] | { status: HTTPStatusCode; error?: string }> {
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
          "There was an error fetching items in one of the batches"
        )
      }
    } catch (error: any) {
      logServerError("fetchAllBibItemsWithQuery", error)
      return { status: 500, error }
    }
  }
  return items
}
