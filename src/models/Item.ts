import { isEmpty } from "underscore"

import type {
  SearchResultsItem,
  ItemStatus,
  ItemLocation,
} from "../types/itemTypes"
import type SearchResultsBib from "./SearchResultsBib"
import {
  itemAvailabilityKeys,
  defaultNYPLLocation,
  nonNYPLReCAPLocation,
  locationLabelToKey,
  locationEndpointsMap,
} from "../utils/itemUtils"

/**
 * The Item class contains the data and getter functions
 * associated with an item, as well as helper functions required
 * for building an ItemTable.
 */
export default class Item {
  id: string
  bib: SearchResultsBib
  status?: ItemStatus
  source?: string
  accessMessage?: string
  callNumber?: string
  isElectronicResource: boolean
  volume?: string
  format?: string
  location?: ItemLocation

  constructor(item: SearchResultsItem, bib: SearchResultsBib) {
    this.id = item["@id"] ? item["@id"].substring(4) : ""
    this.bib = bib
    this.status = item.status?.length ? item.status[0] : null
    this.source = item.idNyplSourceId ? item.idNyplSourceId["@type"] : null
    this.accessMessage = item.accessMessage?.length
      ? item.accessMessage[0]?.prefLabel
      : ""
    this.callNumber = item.shelfMark.length ? item.shelfMark[0] : null
    this.isElectronicResource = !!item.electronicLocator?.length
    this.volume = item.enumerationChronology?.length
      ? item.enumerationChronology[0]
      : null
    this.format = item.formatLiteral?.length
      ? item.formatLiteral[0]
      : this.bib.materialType
    this.location = this.getLocationFromItem(item)
  }

  // Item availability is determined by the existence of status label in the availability keys list
  get isAvailable(): boolean {
    // Lowercase and remove non-word characters from status label
    const availability =
      !isEmpty(this.status) && this.status?.prefLabel
        ? this.status.prefLabel.replace(/\W/g, "").toLowerCase()
        : ""
    return itemAvailabilityKeys.includes(availability)
  }

  // Determine if item is Non-NYPL ReCAP by existence of "Recap" string in item source attribute
  get isNonNYPLReCAP(): boolean {
    return this.source.indexOf("Recap") !== -1
  }

  // It's an NYPL-owned ReCAP item if item source is Sierra and location is ReCAP
  get isNYPLReCAP(): boolean {
    return this.isSierraItem() && this.locationIsRecap()
  }

  // It's non-ReCAP NYPL-owned item if item source is Sierra and location is not ReCAP
  get isNYPLNonReCAP(): boolean {
    return this.isSierraItem() && !this.locationIsRecap()
  }

  // Pre-processing logic for setting Item holding location
  getLocationFromItem(item: SearchResultsItem): ItemLocation {
    let location = defaultNYPLLocation
    if (this.isNonNYPLReCAP) location = nonNYPLReCAPLocation

    // Check for existence of Location object in API response
    const itemLocationFromAPI = item.holdingLocation?.length
      ? item.holdingLocation[0]
      : null

    // If location exists in the API response, parse the label and set branch endpoint
    if (itemLocationFromAPI) {
      location = itemLocationFromAPI

      // Set branch endpoint based on API location label
      const locationKey = locationLabelToKey(location.prefLabel)
      location.branchEndpoint = locationEndpointsMap[locationKey]
    }

    return location
  }

  isSierraItem(): boolean {
    return this.source === "SierraNypl"
  }

  // Determine is item location is ReCAP via the location ID
  locationIsRecap(): boolean {
    return this.location["@id"].substring(4, 6) === "rc"
  }
}
