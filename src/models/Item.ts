import { isEmpty } from "underscore"

import type { SearchResultsItem, ItemStatus } from "../types/itemTypes"
import type SearchResultsBib from "./SearchResultsBib"
import { itemAvailabilityKeys } from "../utils/itemUtils"

/**
 * The Item class contains the data and getter functions
 * associated with an item, as well as helper functions required
 * for building an ItemTable.
 */
export default class Item {
  id: string
  bib: SearchResultsBib
  status?: ItemStatus
  itemSource?: string
  accessMessage?: string
  callNumber?: string
  isElectronicResource: boolean
  volume?: string
  format?: string

  constructor(item: SearchResultsItem, bib: SearchResultsBib) {
    this.id = item["@id"] ? item["@id"].substring(4) : ""
    this.bib = bib
    this.status = item.status?.length ? item.status[0] : null
    this.itemSource = item.idNyplSourceId ? item?.idNyplSourceId["@type"] : null
    this.accessMessage = item?.accessMessage?.length
      ? item.accessMessage[0]?.prefLabel
      : ""
    this.callNumber = item?.shelfMark.length ? item.shelfMark[0] : null
    this.isElectronicResource = !!item?.electronicLocator?.length
    this.volume = item?.enumerationChronology?.length
      ? item.enumerationChronology[0]
      : null
    this.format = item?.formatLiteral?.length
      ? item.formatLiteral[0]
      : this.bib.materialType
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
}
