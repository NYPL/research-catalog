import type {
  DiscoveryLocationElement,
  DeliveryLocation,
} from "../types/locationTypes"
import { LOCATIONS_DETAILS } from "../config/locations"
import { appConfig } from "../config/config"

/**
 * Maps locations from the discovery API response to an array of the Delivery Locations type.
 * Null is returned if there are no locations in the response.
 */
export function mapLocationsFromResultToDeliveryLocations(
  locationsFromResult: DiscoveryLocationElement[]
): DeliveryLocation[] | null {
  if (!locationsFromResult?.length) return null

  const deliveryLocations = locationsFromResult.map((locationElement) =>
    mapLocationElementToDeliveryLocation(locationElement)
  )

  // FROM DFE
  // TODO: Is this the best place to filter out closed locations?
  // If this is removed we can probably get rid of this whole function and call
  // mapLocationElementToDeliveryLocation directly in fetchDeliveryLocations
  return deliveryLocations.filter(
    (deliveryLocation: DeliveryLocation) =>
      !locationIsClosed(deliveryLocation, appConfig.closedLocations)
  )
}

/**
 * Maps a single location element from the discovery API response to a DeliveryLocation object.
 */
const mapLocationElementToDeliveryLocation = (
  locationElement: DiscoveryLocationElement
): DeliveryLocation => {
  const slug = getLocationSlug(locationElement)
  const details = LOCATIONS_DETAILS[slug]

  if (!details) return null

  const shortName = details["short-name"]

  return {
    address: details.address.address1,
    shortName,
    label: formatDeliveryLocationLabel(locationElement.prefLabel, shortName),
  }
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
