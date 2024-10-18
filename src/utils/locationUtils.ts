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
export function mapLocationsResultToDeliveryLocations(
  discoveryLocationsResult: DiscoveryLocationsResult
): DeliveryLocation[] | null {
  const itemListElement = discoveryLocationsResult?.itemListElement[0]
  const locationsFromResult = itemListElement?.deliveryLocation

  if (!locationsFromResult) return null

  const deliveryLocations = locationsFromResult.map((locationElement) =>
    getDeliveryLocationsFromResult(locationElement)
  )
  // TODO: Do we need to check eddRequestable here?
  // const eddRequestable = Boolean(itemListElement?.eddRequestable)

  // TODO: Do we need to filter out closed locations here?
  return deliveryLocations.filter((deliveryLocation: DeliveryLocation) =>
    locationIsClosed(deliveryLocation.label, appConfig.closedLocations)
  )
}

const getDeliveryLocationsFromResult = (
  locationElements: DiscoveryLocationElement[]
): DeliveryLocation[] =>
  locationElements.map((location) => {
    let deliveryLocation: DeliveryLocation

    const slug = getLocationSlug(location)
    const details = LOCATIONS_DETAILS[slug]

    if (!details) return null

    const shortName = details["short-name"]

    deliveryLocation.address = details.address.address1
    deliveryLocation.label = formatDeliveryLocationLabel(
      location.prefLabel,
      shortName
    )
    deliveryLocation.shortName = shortName

    return deliveryLocation
  })

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
  if (!locationElement?.["@id"]) return null

  const sierraId = getLocationSierraId(locationElement)

  switch (sierraId?.slice(0, 2)) {
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

const getLocationSierraId = (
  locationElement: DiscoveryLocationElement
): string | null =>
  locationElement["@id"] ? locationElement["@id"].replace("loc:", "") : null

const locationIsClosed = (
  deliveryLabel: string,
  closedLocations: string[]
): boolean =>
  closedLocations.some((closedLocationName) =>
    deliveryLabel.startsWith(closedLocationName)
  )
