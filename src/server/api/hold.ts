import nyplApiClient from "../nyplApiClient"

/**
 * Getter function for hold delivery locations.
 */
export async function fetchDeliveryLocations(
  barcode: string,
  patronId: string
): Promise<string> {
  const deliveryEndpoint = `/request/deliveryLocationsByBarcode?barcodes[]=${barcode}&patronId=${patronId}`
  try {
    const client = await nyplApiClient()
    const { data } = await client.get(deliveryEndpoint)
    return data
  } catch (error) {
    console.error(`Error fetching delivery locations ${error.message}`)
    throw new Error(error)
  }
}
