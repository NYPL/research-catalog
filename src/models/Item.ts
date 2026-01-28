import type {
  JSONLDValue,
  ItemLocation,
  DiscoveryItemResult,
} from "../types/itemTypes"
import { locationLabelToKey } from "../utils/itemUtils"
import type Bib from "./Bib"
import {
  itemAvailableIds,
  defaultNYPLLocation,
  partnerDefaultLocation,
  locationEndpointsMap,
} from "../utils/itemUtils"
import { appConfig } from "../config/appConfig"
import ItemAvailability from "./ItemAvailability"
import { convertCamelToShishKabobCase } from "../utils/appUtils"

/**
 * The Item class contains the data and getter functions
 * associated with an item, as well as helper functions required
 * for building an ItemTable.
 */
export default class Item {
  id: string
  bibId: string
  status?: JSONLDValue
  source?: string
  accessMessage?: string
  callNumber?: string
  volume?: string
  format?: string
  barcode?: string
  location?: ItemLocation
  aeonUrl?: string
  dueDate?: string
  isPhysicallyRequestable: boolean
  isEDDRequestable: boolean
  bibTitle: string
  availability: ItemAvailability

  constructor(item: DiscoveryItemResult, bib: Bib) {
    this.id = item.uri || ""
    this.bibId = bib.id
    this.status = item.status?.length ? item.status[0] : null
    this.source = item.idNyplSourceId ? item.idNyplSourceId["@type"] : null
    this.accessMessage = item.accessMessage?.length
      ? item.accessMessage[0]?.prefLabel
      : ""
    this.callNumber = item.shelfMark?.length ? item.shelfMark[0] : null
    this.volume = item.enumerationChronology?.length
      ? item.enumerationChronology[0]
      : null
    this.format = item.formatLiteral?.length
      ? item.formatLiteral[0]
      : bib.format

    this.barcode = item.idBarcode?.length ? item.idBarcode[0] : null
    this.location = this.getLocationFromItem(item)
    this.aeonUrl = item.aeonUrl?.length ? item.aeonUrl[0] : null
    this.dueDate = item.dueDate?.length ? item.dueDate[0] : null
    this.isPhysicallyRequestable = item.physRequestable
    this.isEDDRequestable = item.eddRequestable
    this.bibTitle = bib.titleDisplay
    this.availability = new ItemAvailability({
      isSpecRequestable: item.specRequestable,
      isAvailable: this.isAvailable,
      isReCAP: this.isReCAP,
      aeonUrl: this.aeonUrl,
      findingAid: bib.findingAid,
    })
  }

  // Item availability is determined by the existence of status id in the availability ids list
  get isAvailable(): boolean {
    return itemAvailableIds.includes(this?.status?.["@id"]) || false
  }

  get requestButtonAriaLabel(): string {
    return `${this.bibTitle}${this.volume ? `, ${this.volume}` : ""}`
  }

  get isReCAP(): boolean {
    return this.isPartnerReCAP() || this.isNYPLReCAP()
  }

  get allLocationsClosed(): boolean {
    const { closedLocations, recapClosedLocations, nonRecapClosedLocations } =
      appConfig

    return closedLocations
      .concat(this.isReCAP ? recapClosedLocations : nonRecapClosedLocations)
      .includes("all")
  }

  get formattedSourceForHoldRequest(): string {
    return convertCamelToShishKabobCase(this.source)
  }

  // Pre-processing logic for setting Item holding location
  getLocationFromItem(item: DiscoveryItemResult): ItemLocation {
    let location = defaultNYPLLocation
    if (this.isPartnerReCAP) location = partnerDefaultLocation

    // Check for existence of Location object in API response
    const itemLocationFromAPI = item.holdingLocation?.length
      ? item.holdingLocation[0]
      : null

    // If location exists in the API response, parse the label and set branch endpoint
    if (itemLocationFromAPI) {
      location = itemLocationFromAPI

      // Set branch endpoint based on API location label
      const locationKey = locationLabelToKey(location.prefLabel)
      location.endpoint = locationEndpointsMap[locationKey] || null
    }
    return location
  }

  // Determine if item is Non-NYPL ReCAP by existence of "Recap" string in item source attribute
  isPartnerReCAP(): boolean {
    return this.source?.indexOf("Recap") !== -1
  }

  // It's an NYPL-owned ReCAP item if item source is Sierra and location is ReCAP
  isNYPLReCAP(): boolean {
    return this.isSierraItem() && this.locationIsReCAP()
  }

  // It's non-ReCAP NYPL-owned item if item source is Sierra and location is not ReCAP
  isOnsite(): boolean {
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
