import nyplApiClient from "../nyplApiClient"
import type { DeliveryLocationsResponse } from "../../types/locationTypes"
import { mapLocationsFromResultToDeliveryLocations } from "../../utils/locationUtils"

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

    const deliveryLocations = mapLocationsFromResultToDeliveryLocations(
      discoveryLocationsItem?.deliveryLocation
    )
    const eddRequestable = discoveryLocationsItem.eddRequestable || false

    // No locations in response
    if (!deliveryLocations) {
      return {
        deliveryLocations: [],
        status: 200,
      }
    }

    // Locations found
    return {
      deliveryLocations,
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
