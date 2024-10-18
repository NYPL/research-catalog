import type {
  DiscoveryLocationElement,
  DeliveryLocation,
} from "../types/locationTypes"
import { LOCATIONS_DETAILS } from "../config/locations"

/**
 * Maps a single location element from the discovery API response to a DeliveryLocation object.
 */
export const mapLocationElementToDeliveryLocation = (
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

export const locationIsClosed = (
  deliveryLocation: DeliveryLocation,
  closedLocations: string[]
): boolean =>
  closedLocations.some((closedLocationName) =>
    deliveryLocation.label.startsWith(closedLocationName)
  ) || closedLocations.includes("all")
