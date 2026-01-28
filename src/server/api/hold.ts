import nyplApiClient from "../nyplApiClient"

import type {
  EDDRequestParams,
  HoldPostResult,
  HoldDetailsResult,
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
import { logServerError } from "../../utils/logUtils"
import logger from "../../../lib/logger"

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
      discoveryLocationsItem?.deliveryLocation
        ?.map((locationElement: DiscoveryLocationElement) =>
          mapLocationElementToDeliveryLocation(locationElement)
        )
        .filter((deliveryLocation) => deliveryLocation) || []
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
    logServerError("fetchDeliveryLocations", error.message)

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
  const { itemId, patronId, source, bibId, pickupLocation } = holdRequestParams

  // Remove non-numeric characters from item ID
  const itemIdNumeric = itemId.replace(/\D/g, "")
  const bibIdNumeric = bibId.replace(/\D/g, "")

  const holdPostParams: DiscoveryHoldPostParams = {
    patron: patronId,
    record: itemIdNumeric,
    nyplSource: source,
    bibId: parseInt(bibIdNumeric),
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
    logServerError("postHoldRequest", error.message)

    return {
      status: 500,
    }
  }
}

/**
 * Post EDD requests to discovery API.
 */
export async function postEDDRequest(
  eddRequestParams: EDDRequestParams
): Promise<HoldPostResult> {
  const { itemId, patronId, source, bibId, ...rest } = eddRequestParams

  // Remove non-numeric characters from item ID
  const itemIdNumeric = itemId.replace(/\D/g, "")
  const bibIdNumeric = bibId.replace(/\D/g, "")

  const eddPostParams: DiscoveryHoldPostParams = {
    patron: patronId,
    record: itemIdNumeric,
    nyplSource: source,
    bibId: parseInt(bibIdNumeric),
    requestType: "edd",
    recordType: "i",
    docDeliveryData: {
      ...rest,
    } as EDDRequestParams,
  }

  try {
    const client = await nyplApiClient()
    const eddPostResult = await client.post("/hold-requests", eddPostParams)
    const requestId = eddPostResult?.data?.id

    if (!requestId) {
      logServerError("postEDDRequest", "No id returned from Discovery API")

      return {
        status: 400,
      }
    }

    return {
      status: 200,
      requestId,
    }
  } catch (error) {
    logServerError("postEDDRequest", error.message)

    return {
      status: 500,
    }
  }
}

/**
 * Getter function for hold request details.
 */
// TODO: Add return type
export async function fetchHoldDetails(
  requestId: string
): Promise<HoldDetailsResult> {
  try {
    const client = await nyplApiClient()
    const holdDetailsResult = await client.get(`/hold-requests/${requestId}`)

    const { id, pickupLocation, patron } = holdDetailsResult.data

    return {
      requestId: id,
      patronId: patron,
      pickupLocation,
      status: 200,
    }
  } catch (error) {
    logServerError(
      "fetchHoldDetails",
      `requestId: ${requestId}, error message: ${error.message}`
    )

    return { status: 500 }
  }
}

/**
 * Getter function for hold request eligibility for patrons.
 */
export async function fetchPatronEligibility(
  patronId: string
): Promise<PatronEligibilityStatus> {
  const eligibilityEndpoint = `/patrons/${patronId}/hold-request-eligibility`

  try {
    const client = await nyplApiClient()
    const eligibilityResult = await client.get(eligibilityEndpoint, {
      cache: false,
    })

    // There should always be en eligibilty boolean attribute returned from Discovery API
    if (eligibilityResult.eligibility === undefined) {
      throw new Error("Improperly formatted eligibility from Discovery API")
    }

    if (eligibilityResult.eligibility === false) {
      return { status: 401, ...eligibilityResult }
    }

    return { status: 200, ...eligibilityResult }
  } catch (error) {
    logger.error(
      `Error fetching hold request eligibility in fetchPatronEligibility server function, patronId: ${patronId}`,
      error.message
    )

    return { status: 500 }
  }
}
