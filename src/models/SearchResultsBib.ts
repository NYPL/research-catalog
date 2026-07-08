import type { DiscoveryBibResult } from "../types/bibTypes"
import Bib from "../models/Bib"
import ItemTableData from "./ItemTableData"
import { ITEMS_PER_SEARCH_RESULT } from "../config/constants"
import ItemTableCell from "../components/ItemTable/ItemTableCell"
import type { Collection } from "../types/itemTypes"

/**
 * The SearchResultsBib class contains the data and getter functions
 * for a single bib as it appears in search results.
 *
 */
export default class SearchResultsBib extends Bib {
  publicationStatement?: string
  callNumber?: string
  collection?: Collection

  constructor(result: DiscoveryBibResult) {
    super(result)
    this.publicationStatement = result.publicationStatement?.length
      ? result.publicationStatement[0]
      : null
    // Potential bib level fields to check if bib has no items:
    this.callNumber = result.shelfMark?.[0] || null
    this.collection = result.collection?.[0] || null
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

  // Bibs with no items still display a table with their
  // call number and division, if they have it
  get noItemsBibTableData() {
    const callNumberCell =
      this.callNumber &&
      ItemTableCell({
        text: this.callNumber,
      })

    const divisionCell =
      this.collection &&
      ItemTableCell({
        text: this.collection.prefLabel,
        url:
          this.collection.locationsPath &&
          `https://nypl.org/${this.collection.locationsPath}`,
      })

    if (!divisionCell && !callNumberCell) return null

    const tableObject = {
      ...(callNumberCell && { "Call Number": callNumberCell }),
      ...(divisionCell && { Division: divisionCell }),
    }

    return {
      tableHeadings: Object.keys(tableObject),
      tableData: [Object.values(tableObject)],
      inSearchResult: true,
    }
  }
}
