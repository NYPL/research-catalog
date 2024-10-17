import type {
  DiscoveryLocationsResult,
  DiscoveryLocationElement,
  DeliveryLocation,
} from "../types/locationTypes"
import { LOCATIONS_DETAILS } from "../config/constants"

/**
 * Given a hash of SearchFilters, returns an array of DRBFilters
 * as expected by the DRB API
 */
export function mapBarcodeApiResultToDeliveryLocations(
  discoveryLocationsResult: DiscoveryLocationsResult
): DeliveryLocation[] | null {
  const itemListElement = discoveryLocationsResult?.itemListElement[0]
  const locationsFromResult = itemListElement?.deliveryLocation

  if (!locationsFromResult) return null

  const deliveryLocations = locationsFromResult.map((locationElement) =>
    getDeliveryLocationsFromResult(locationElement)
  )

  const eddRequestable = Boolean(itemListElement?.eddRequestable)
}

function getDeliveryLocationsFromResult(
  locationElements: DiscoveryLocationElement[]
): DeliveryLocation[] {
  return locationElements.map((location) => {
    let deliveryLocation: DeliveryLocation

    const slug = getLocationSlug(location)
    if (slug && LOCATIONS_DETAILS[slug]) {
      const details = LOCATIONS_DETAILS[slug]

      deliveryLocation.address = details.address.address1
      deliveryLocation.shortName = details["short-name"]
    }
    return deliveryLocation
  })
}

function getLocationSlug(locationElement: DiscoveryLocationElement) {
  if (!locationElement || !locationElement["@id"]) return null

  const sierraId = locationElement["@id"].replace("loc:", "")
  switch (sierraId.slice(0, 2)) {
    case "my":
    case "lp":
    case "pa":
      return "lpa"
    case "ma":
      return "schwarzman"
    case "sc":
      return "schomburg"
    default:
      return null
  }
}
