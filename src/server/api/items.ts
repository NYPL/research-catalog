import type { BibQueryParams } from "../../types/bibTypes"
import {
  DISCOVERY_API_NAME,
  DISCOVERY_API_SEARCH_ROUTE,
  ITEM_VIEW_ALL_BATCH_SIZE,
} from "../../config/constants"
import type { ItemsResponse, DiscoveryItemResult } from "../../types/itemTypes"
import nyplApiClient from "../nyplApiClient"
import { getBibQueryString, standardizeBibId } from "../../utils/bibUtils"

export async function fetchItems(
  bibQuery?: BibQueryParams
): Promise<ItemsResponse> {
  const items: DiscoveryItemResult[] = []
  const client = await nyplApiClient({ apiName: DISCOVERY_API_NAME })
  const standardizedId = standardizeBibId(bibQuery?.id)
  const bibQueryString = getBibQueryString({ ...bibQuery, id: standardizedId })
  // Fetch the bib with pagination and filters applied to determine total physical item count
  const discoveryBibResult = await client.get(
    `${DISCOVERY_API_SEARCH_ROUTE}/${standardizedId}${bibQueryString}`
  )
  // Return the bib's paginated items in the case that View All isn't enabled
  if (bibQuery?.view_all_items !== "true") {
    if (discoveryBibResult?.items?.length)
      return {
        items: discoveryBibResult?.items,
        status: 200,
      }
    // Return a failed response if the first fetch fails
    return {
      items: [],
      status: 400,
    }
  }

  // Allow batch size to be passed in as a query parameter for testing
  const batchSize = bibQuery?.batch_size || ITEM_VIEW_ALL_BATCH_SIZE

  // If View All is enabled, fetch the items in large batches
  for (
    let batchNum = 1;
    batchNum <= Math.ceil(discoveryBibResult.numItemsTotal / batchSize);
    batchNum++
  ) {
    const pageQueryString = getBibQueryString(
      {
        ...bibQuery,
        id: standardizedId,
        item_page: batchNum,
      },
      false,
      true
    )
    const bibPage = await client.get(
      `${DISCOVERY_API_SEARCH_ROUTE}/${standardizedId}${pageQueryString}`
    )
    if (bibPage?.items?.length) {
      items.push(...bibPage.items)
    } else {
      return {
        items: [],
        status: 400,
      }
    }
  }
  return {
    items,
    status: 200,
  }
}
