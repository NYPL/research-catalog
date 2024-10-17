import type {
  DiscoveryLocationsResult,
  DiscoveryLocationElement,
  DeliveryLocation,
} from "../types/locationTypes"
import { LOCATIONS_DETAILS } from "../config/constants"
import { appConfig } from "../config/config"

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
    getOpenDeliveryLocationsFromResult(locationElement)
  )

  const eddRequestable = Boolean(itemListElement?.eddRequestable)
}

function getOpenDeliveryLocationsFromResult(
  locationElements: DiscoveryLocationElement[]
): DeliveryLocation[] {
  const { closedLocations } = appConfig

  return locationElements.map((location) => {
    let deliveryLocation: DeliveryLocation

    const slug = getLocationSlug(location)
    const details = LOCATIONS_DETAILS[slug]

    if (!details) return null

    const shortName = details["short-name"]
    const label = formatDeliveryLocationLabel(location.prefLabel, shortName)

    if (slug && LOCATIONS_DETAILS[slug]) {
      deliveryLocation.address = details.address.address1
      deliveryLocation.shortName = label
    }
    return deliveryLocation
  })
}

function formatDeliveryLocationLabel(
  prefLabel: string,
  shortName: string
): string {
  if (!prefLabel || !shortName) return ""
  const deliveryRoom = prefLabel.split(" - ")[1]
    ? ` - ${prefLabel.split(" - ")[1]}`
    : ""

  return `${shortName}${deliveryRoom}`
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
