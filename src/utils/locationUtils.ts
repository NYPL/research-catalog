import type {
  DiscoveryLocationElement,
  DeliveryLocation,
  NYPLocationKey,
} from "../types/locationTypes"
import { NYPL_LOCATIONS } from "../config/constants"

/**
 * Maps a single location element from the discovery API response to a DeliveryLocation object.
 */
export const mapLocationElementToDeliveryLocation = (
  locationElement: DiscoveryLocationElement
): DeliveryLocation => {
  const locationKey = getLocationKey(locationElement)
  const details = NYPL_LOCATIONS[locationKey]

  if (!details) return null

  const shortName = details.shortName
  const label = formatDeliveryLocationLabel(
    locationElement.prefLabel,
    shortName
  )

  return {
    address: details.address,
    shortName,
    label,
  }
}

function formatDeliveryLocationLabel(
  prefLabel: string,
  shortName: string
): string {
  const deliveryRoom = prefLabel?.split(" - ")[1] || ""

  return `${shortName}${deliveryRoom ? ` - ${deliveryRoom}` : ""}`
}

function getLocationKey(
  locationElement: DiscoveryLocationElement
): NYPLocationKey | null {
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
