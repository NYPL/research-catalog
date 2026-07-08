import type { DiscoveryBibResult } from "../types/bibTypes"
import Bib from "../models/Bib"
import ItemTableData from "./ItemTableData"
import { ITEMS_PER_SEARCH_RESULT } from "../config/constants"
import ItemTableCell from "../components/ItemTable/ItemTableCell"

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

  // Bibs with no items still display a table with their call number
  // and division, if they have it
  get noItemsBibTableData() {
    const callNumberCell =
      this.callNumber &&
      ItemTableCell({
        children: this.callNumber,
      })

    const collection = this.collection?.length
      ? this.bibResult.collection[0]
      : null

    const divisionCell =
      collection?.prefLabel &&
      ItemTableCell({
        children: collection.prefLabel,
        url:
          collection.locationsPath &&
          `https://nypl.org/${collection.locationsPath}`,
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
