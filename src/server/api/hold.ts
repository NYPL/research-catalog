import nyplApiClient from "../nyplApiClient"

import type {
  HoldPostResult,
  HoldRequestDetailsParams,
} from "../../types/holdPageTypes"
import type {
  DeliveryLocation,
  DeliveryLocationsResult,
  DiscoveryLocationElement,
} from "../../types/locationTypes"
import type {
  DiscoveryHoldPostParams,
  HoldRequestParams,
  PatronEligibilityStatus,
} from "../../types/holdPageTypes"

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
    const requestId = holdPostResult?.data?.id

    if (!requestId) {
      return {
        status: 400,
        errorMessage: holdPostResult?.data?.message,
      }
    }

    return {
      status: 200,
      pickupLocation,
      requestId,
    }
  } catch (error) {
    console.log("error", error)
    console.error(
      `Error posting hold request in postHoldRequest server function, itemId: ${itemId}`,
      error.message
    )

    return {
      status: 500,
    }
  }
}

/**
 * Getter function for hold request details.
 */
export async function fetchHoldRequestDetails(
  holdRequestDetailsParams: HoldRequestDetailsParams
): Promise<void> {
  const { requestId, patronId } = holdRequestDetailsParams

  try {
    const client = await nyplApiClient()
    const holdDetailsResult = await client.get(`/hold-requests/${requestId}`)
    if (patronId !== holdDetailsResult.data.patron) {
      console.log("TODO: Redirect to 404 page")
    }

    console.log("holdDetailsResult", holdDetailsResult)
    return
  } catch (error) {
    console.error(
      `Error fetching hold request details in fetchHoldRequestDetails server function, requestId: ${requestId}`,
      error.message
    )

    return
  }
}

/**
 * Getter function for hold request eligibility for patrons.
 */
export async function fetchHoldRequestEligibility(
  patronId: string
): Promise<PatronEligibilityStatus> {
  const eligibilityEndpoint = `/patrons/${patronId}/hold-request-eligibility`

  try {
    const client = await nyplApiClient()
    const eligibilityResult = await client.get(eligibilityEndpoint, {
      cache: false,
    })

    return eligibilityResult as PatronEligibilityStatus
  } catch (error) {
    console.error(
      `Error fetching hold request elligibility in fetchHoldRequestEligibility server function, patronId: ${patronId}`,
      error.message
    )

    return { eligibility: false }
  }
}
