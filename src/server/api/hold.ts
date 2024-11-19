import nyplApiClient from "../nyplApiClient"

import type { HoldPostResult } from "../../types/holdTypes"
import type {
  DeliveryLocation,
  DeliveryLocationsResult,
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

/**
 * Getter function for hold delivery locations.
 */
export async function fetchDeliveryLocations(
  barcode: string,
  patronId: string
): Promise<DeliveryLocationsResult> {
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

    const deliveryLocations =
      discoveryLocationsItem?.deliveryLocation?.map(
        (locationElement: DiscoveryLocationElement) =>
          mapLocationElementToDeliveryLocation(locationElement)
      ) || []
    const eddRequestable = discoveryLocationsItem?.eddRequestable || false

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
): Promise<HoldPostResult> {
  const { itemId, patronId, source, pickupLocation } = holdRequestParams

  // Remove non-numeric characters from item ID
  const itemIdNumeric = itemId.replace(/\D/g, "")

  const holdPostParams: DiscoveryHoldPostParams = {
    patron: patronId,
    record: itemIdNumeric,
    nyplSource: source,
    requestType: "hold",
    recordType: "i",
    pickupLocation,
  }

  try {
    const client = await nyplApiClient()
    const holdPostResult = await client.post("/hold-requests", holdPostParams)
    const { id: requestId } = holdPostResult.data

    if (!requestId) {
      console.error(
        "postHoldRequest failed, no id returned from Discovery API",
        holdPostResult
      )
      return {
        status: 400,
      }
    }

    return {
      status: 200,
      pickupLocation,
      requestId,
    }
  } catch (error) {
    console.error(
      `Error posting hold request in postHoldRequest server function, itemId: ${itemId}`,
      error.message
    )

    return {
      status: 500,
    }
  }
}
