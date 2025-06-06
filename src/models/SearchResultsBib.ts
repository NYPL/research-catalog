import type { DiscoveryBibResult } from "../types/bibTypes"
import Bib from "../models/Bib"
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

  constructor(result: DiscoveryBibResult) {
    super(result)
    this.yearPublished = this.getYearFromResult(result)
    this.publicationStatement = result.publicationStatement?.length
      ? result.publicationStatement[0]
      : null
  }

  showViewAllItemsLink() {
    return this.numPhysicalItems > ITEMS_PER_SEARCH_RESULT
  }

  numItems() {
    return this.hasPhysicalItems
      ? this.numPhysicalItems
      : this.numElectronicResources
  }

  getYearFromResult(result: DiscoveryBibResult) {
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
