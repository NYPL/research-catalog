import type { SearchResultsItem } from "../types/searchTypes"

/**
 * The Item class contains the data and getter functions
 * associated with an item, as well as helper functions required
 * for building an ItemTable.
 */
export default class Item {
  id: string

  constructor(item: SearchResultsItem) {
    this.id = item["@id"]
  }
}
