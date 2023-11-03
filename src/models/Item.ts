import { isEmpty } from "underscore"

import type {
  SearchResultsItem,
  ItemStatus,
  ItemLocation,
} from "../types/itemTypes"
import { locationLabelToKey } from "../utils/itemUtils"
import type SearchResultsBib from "./SearchResultsBib"
import {
  itemAvailabilityKeys,
  defaultNYPLLocation,
  nonNYPLDefaultLocation,
  locationEndpointsMap,
} from "../utils/itemUtils"

/**
 * The Item class contains the data and getter functions
 * associated with an item, as well as helper functions required
 * for building an ItemTable.
 */
export default class Item {
  id: string
  bibId: string
  status?: ItemStatus
  source?: string
  accessMessage?: string
  callNumber?: string
  volume?: string
  format?: string
  barcode?: string
  location?: ItemLocation
  aeonUrl?: string
  isPhysicallyRequestable: boolean
  isEDDRequestable: boolean

  constructor(item: SearchResultsItem, bib: SearchResultsBib) {
    this.id = item["@id"] ? item["@id"].substring(4) : ""
    this.bibId = bib.id
    this.status = item.status?.length ? item.status[0] : null
    this.source = item.idNyplSourceId ? item.idNyplSourceId["@type"] : null
    this.accessMessage = item.accessMessage?.length
      ? item.accessMessage[0]?.prefLabel
      : ""
    this.callNumber = item.shelfMark.length ? item.shelfMark[0] : null
    this.volume = item.enumerationChronology?.length
      ? item.enumerationChronology[0]
      : null
    this.format = item.formatLiteral?.length
      ? item.formatLiteral[0]
      : bib.materialType
    this.barcode = item.idBarcode?.length ? item.idBarcode[0] : null
    this.location = this.getLocationFromItem(item)
    this.aeonUrl = item.aeonUrl?.length ? item.aeonUrl[0] : null
    this.isPhysicallyRequestable = item.physRequestable
    this.isEDDRequestable = item.eddRequestable
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

  get isReCAP(): boolean {
    return this.isNonNYPLReCAP() || this.isNYPLReCAP()
  }

  // Pre-processing logic for setting Item holding location
  getLocationFromItem(item: SearchResultsItem): ItemLocation {
    let location = defaultNYPLLocation
    if (this.isNonNYPLReCAP) location = nonNYPLDefaultLocation

    // Check for existence of Location object in API response
    const itemLocationFromAPI = item.holdingLocation?.length
      ? item.holdingLocation[0]
      : null

    // If location exists in the API response, parse the label and set branch endpoint
    if (itemLocationFromAPI) {
      location = itemLocationFromAPI

      // Set branch endpoint based on API location label
      const locationKey = locationLabelToKey(location.prefLabel)
      location.endpoint = locationEndpointsMap[locationKey]
    }

    return location
  }

  // Determine if item is Non-NYPL ReCAP by existence of "Recap" string in item source attribute
  isNonNYPLReCAP(): boolean {
    return this.source.indexOf("Recap") !== -1
  }

  // It's an NYPL-owned ReCAP item if item source is Sierra and location is ReCAP
  isNYPLReCAP(): boolean {
    return this.isSierraItem() && this.locationIsReCAP()
  }

  // It's non-ReCAP NYPL-owned item if item source is Sierra and location is not ReCAP
  isNYPLNonReCAP(): boolean {
    return this.isSierraItem() && !this.locationIsReCAP()
  }

  isSierraItem(): boolean {
    return this.source === "SierraNypl"
  }

  // Determine is item location is ReCAP via the location ID
  locationIsReCAP(): boolean {
    return this.location["@id"].substring(4, 6) === "rc"
  }
}
