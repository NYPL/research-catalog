import nyplApiClient from "../nyplApiClient"
import type {
  DeliveryLocation,
  DeliveryLocationsResponse,
  DiscoveryLocationElement,
} from "../../types/locationTypes"
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
