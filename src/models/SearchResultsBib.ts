import type { BibResult } from "../types/bibTypes"
import Bib from "../models/Bib"
import ItemTableData from "./ItemTableData"
import { ITEMS_PER_SEARCH_RESULT } from "../config/constants"

/**
 * The SearchResultsBib class contains the data and getter functions
 * for a single Search Results Bib entity.
 *
 * Search Results returned from the API are mapped and initialized into
 * SearchResultsBib objects in the SearchResults component.
 *
 * Certain string fields (e.g. publicationStatement) returned from the API are
 * formatted as a single item in an array. These fields are extracted and parsed
 * into simple string attributes via the object's constructor.
 */
export default class SearchResultsBib extends Bib {
  yearPublished?: string
  publicationStatement?: string

  constructor(result: BibResult) {
    super(result)
    this.yearPublished = this.getYearFromResult(result)
    this.publicationStatement = result.publicationStatement?.length
      ? result.publicationStatement[0]
      : null
  }

  get showViewAllItemsLink() {
    return this.numPhysicalItems > ITEMS_PER_SEARCH_RESULT
  }

  get resourceType() {
    return this.hasPhysicalItems ? "Item" : "Resource"
  }

  get itemMessage() {
    return `${this.numItems} ${this.resourceType}${
      this.numItems !== 1 ? "s" : ""
    }`
  }

  // Map Bib items to ItemTableData class instances
  // Unlike the Bib Page, a Search Result renders an item table per item
  get itemTables(): ItemTableData[] {
    return this.items
      ? this.items.slice(0, ITEMS_PER_SEARCH_RESULT).map((item) => {
          return new ItemTableData([item], {
            isBibPage: false,
            isArchiveCollection: this.isArchiveCollection,
          })
        })
      : null
  }

  getYearFromResult(result: BibResult) {
    const { dateStartYear, dateEndYear } = result

    const displayStartYear: string =
      dateStartYear === 999 ? "unknown" : dateStartYear?.toString()
    const displayEndYear: string =
      dateEndYear === 9999 ? "present" : dateEndYear?.toString()

    if (dateStartYear && dateEndYear) {
      return `${displayStartYear}-${displayEndYear}`
    } else if (dateStartYear) {
      return displayStartYear
    }
    return null
  }
}
