import type { SearchResultsItem } from "../types/itemTypes"
import type SearchResultsBib from "./SearchResultsBib"

/**
 * The Item class contains the data and getter functions
 * associated with an item, as well as helper functions required
 * for building an ItemTable.
 */
export default class Item {
  id: string
  bib: SearchResultsBib
  itemSource?: string
  accessMessage?: string
  callNumber?: string
  isElectronicResource: boolean

  constructor(item: SearchResultsItem, bib: SearchResultsBib) {
    this.id = item["@id"] ? item["@id"].substring(4) : ""
    this.bib = bib
    this.itemSource = item.idNyplSourceId ? item?.idNyplSourceId["@type"] : ""
    this.accessMessage = item.accessMessage.length
      ? item.accessMessage[0]?.prefLabel
      : ""
    this.callNumber = item.shelfMark.length ? item.shelfMark[0] : ""
    this.isElectronicResource = !!item.electronicLocator?.length
  }
}
