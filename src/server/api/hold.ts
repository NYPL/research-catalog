import nyplApiClient from "../nyplApiClient"

import type { HoldResponse } from "../../types/holdTypes"
import type {
  DeliveryLocation,
  DeliveryLocationsResponse,
  DiscoveryLocationElement,
} from "../../types/locationTypes"
import type {
  DiscoveryHoldPostParams,
  HoldRequestParams,
} from "../../types/holdTypes"

import {
  mapLocationElementToDeliveryLocation,
  locationIsClosed,
} from "../../utils/locationUtils"

import { appConfig } from "../../config/config"
import { BASE_URL } from "../../config/constants"
import logger from "../../../logger"

/**
 * Getter function for hold delivery locations.
 */
export async function fetchDeliveryLocations(
  barcode: string,
  patronId: string
): Promise<DeliveryLocationsResponse> {
  const deliveryEndpoint = `/request/deliveryLocationsByBarcode?barcodes[]=${barcode}&patronId=${patronId}`

  try {
    const client = await nyplApiClient()
    const discoveryLocationsResult = await client.get(deliveryEndpoint)
    const discoveryLocationsItem =
      discoveryLocationsResult?.itemListElement?.[0]

    // Malformed response
    if (!discoveryLocationsItem) {
      throw new Error("Malformed response from delivery locations API")
    }

    const deliveryLocations = discoveryLocationsItem?.deliveryLocation.map(
      (locationElement: DiscoveryLocationElement) =>
        mapLocationElementToDeliveryLocation(locationElement)
    )
    const eddRequestable = discoveryLocationsItem.eddRequestable || false

    // Filter out closed locations
    const openLocations = deliveryLocations.filter(
      (location: DeliveryLocation) =>
        !locationIsClosed(location, appConfig.closedLocations)
    )

    /**
     * Locations are returned with a status of 200.
     * deliveryLocations can be an empty array if there are no open locations.
     */
    return {
      deliveryLocations: openLocations,
      eddRequestable,
      status: 200,
    }
  } catch (error) {
    console.error(`Error fetching delivery locations ${error.message}`)

    return {
      status: 500,
    }
  }
}

/**
 * Post hold requests to discovery API.
 */
export async function postHoldRequest(
  holdRequestParams: HoldRequestParams
): Promise<HoldResponse> {
  const {
    bibId,
    itemId,
    patronId,
    source,
    pickupLocation,
    searchKeywordsQuery = "",
  } = holdRequestParams

  // Remove non-numeric characters from item ID
  // TODO: This comes from DFE, is this still necessary?
  const itemIdNumeric = itemId.replace(/\D/g, "")

  const holdPostParams: DiscoveryHoldPostParams = {
    patron: patronId,
    record: itemIdNumeric,
    nyplSource: source,
    requestType: "hold",
    recordType: "i",
    pickupLocation,
    // TODO: This is set on regular hold requests in DFE, is this necessary?
    numberOfCopies: 1,
  }

  logger.info(
    "Making hold request in postHoldRequest server function",
    holdPostParams
  )

  try {
    const client = await nyplApiClient()
    const holdPostResult = await client.post("/hold-requests", holdPostParams)
    const { id } = holdPostResult.data

    if (!id)
      throw new Error(
        "postHoldRequest failed, no id returned from Discovery API",
        holdPostResult
      )

    return {
      status: 307,
      redirectUrl:
        `${BASE_URL}/hold/confirmation/${bibId}-${itemId}?pickupLocation=` +
        `${pickupLocation}&requestId=${id}${searchKeywordsQuery}`,
    }
  } catch (error) {
    logger.error(
      `Error posting hold request in postHoldRequest server function, bibId: ${bibId}, itemId: ${itemId}`,
      error.message
    )
    const errorStatus = error.status ? `&errorStatus=${error.status}` : ""
    const errorMessage =
      error.statusText || searchKeywordsQuery
        ? `&errorMessage=${error.statusText}${searchKeywordsQuery}`
        : ""

    return {
      status: 307,
      redirectUrl:
        `${BASE_URL}/hold/confirmation/${bibId}-${itemId}?pickupLocation=` +
        `${pickupLocation}${errorStatus}${errorMessage}`,
    }
  }
}
