import type {
  DiscoveryLocationsResult,
  DiscoveryLocationElement,
  DeliveryLocation,
} from "../types/locationTypes"
import { LOCATIONS_DETAILS } from "../config/locations"
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

  if (!locationsFromResult?.length) return null

  const deliveryLocations = getDeliveryLocationsFromResult(locationsFromResult)

  // FROM DFE
  // TODO: Do we need to filter out closed locations here?
  return deliveryLocations.filter(
    (deliveryLocation: DeliveryLocation) =>
      !locationIsClosed(deliveryLocation, appConfig.closedLocations)
  )
}

const getDeliveryLocationsFromResult = (
  locationElements: DiscoveryLocationElement[]
): DeliveryLocation[] =>
  locationElements.map((location) => {
    const slug = getLocationSlug(location)
    const details = LOCATIONS_DETAILS[slug]

    if (!details) return null

    const shortName = details["short-name"]

    return {
      address: details.address.address1,
      shortName,
      label: formatDeliveryLocationLabel(location.prefLabel, shortName),
    }
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
  deliveryLocation: DeliveryLocation,
  closedLocations: string[]
): boolean =>
  closedLocations.some((closedLocationName) =>
    deliveryLocation.label.startsWith(closedLocationName)
  )
