import nyplApiClient from "../nyplApiClient"
import type { DeliveryLocation } from "../../types/locationTypes"
import { mapBarcodeApiResultToDeliveryLocations } from "../../utils/holdUtils"

/**
 * Getter function for hold delivery locations.
 */
export async function fetchDeliveryLocations(
  barcode: string,
  patronId: string
): Promise<DeliveryLocation[]> {
  const deliveryEndpoint = `/request/deliveryLocationsByBarcode?barcodes[]=${barcode}&patronId=${patronId}`

  try {
    const client = await nyplApiClient()
    const discoveryLocationsResult = await client.get(deliveryEndpoint)
    const deliveryLocations = mapBarcodeApiResultToDeliveryLocations(
      discoveryLocationsResult
    )

    if (!deliveryLocations) {
      throw new Error("No delivery locations found")
    }
    return deliveryLocations
  } catch (error) {
    console.error(`Error fetching delivery locations ${error.message}`)
    throw new Error(error)
  }
}
