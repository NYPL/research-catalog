import type { DiscoveryBibResult } from "../types/bibTypes"
import Bib from "../models/Bib"
import ItemTableData from "./ItemTableData"
import { ITEMS_PER_SEARCH_RESULT } from "../config/constants"

/**
 * The SearchResultsBib class contains the data and getter functions
 * for a single bib as it appears in search results.
 *
 */
export default class SearchResultsBib extends Bib {
  publicationStatement?: string

  constructor(result: DiscoveryBibResult) {
    super(result)
    this.publicationStatement = result.publicationStatement?.length
      ? result.publicationStatement[0]
      : null
  }

  showViewAllItemsLink() {
    return this.numPhysicalItems > ITEMS_PER_SEARCH_RESULT
  }

  // Map Bib items to ItemTableData class instances
  // Unlike the Bib Page, a Search Result renders an ItemTable component per Item
  get itemTables(): ItemTableData[] {
    return this.items
      ? this.items.slice(0, ITEMS_PER_SEARCH_RESULT).map((item) => {
          return new ItemTableData([item], {
            inSearchResult: true,
            isArchiveCollection: this.isArchiveCollection,
          })
        })
      : null
  }

  numItems() {
    return this.hasPhysicalItems
      ? this.numPhysicalItems
      : this.numElectronicResources
  }
}
