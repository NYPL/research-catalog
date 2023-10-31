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

  constructor(resultsItem: SearchResultsItem, bib: SearchResultsBib) {
    this.id = resultsItem["@id"] ? resultsItem["@id"].substring(4) : ""
    this.bib = bib
    this.itemSource = resultsItem.idNyplSourceId
      ? resultsItem?.idNyplSourceId["@type"]
      : ""
    this.accessMessage = resultsItem.accessMessage[0]?.prefLabel || ""
    this.callNumber = resultsItem.shelfMark[0] || ""
  }
}
