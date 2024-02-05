import type { Bib, EbscoResult } from "../types/bibTypes"
import type { ElectronicResource } from "../types/bibTypes"
import type { JSONLDValue } from "../types/itemTypes"
import Item from "../models/Item"
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
export default class SearchResultsBib {
  id: string
  title: string
  yearPublished?: string
  materialType?: string
  publicationStatement?: string
  electronicResources?: ElectronicResource[]
  issuance?: JSONLDValue[]
  numPhysicalItems: number
  items: Item[]
  ebscoResults: EbscoResult[]

  constructor(result: Bib) {
    this.id = result["@id"] ? result["@id"].substring(4) : ""
    this.title = this.getTitleFromResult(result)
    this.yearPublished = this.getYearFromResult(result)
    this.materialType =
      (result.materialType?.length && result.materialType[0]?.prefLabel) || null
    this.publicationStatement = result.publicationStatement?.length
      ? result.publicationStatement[0]
      : null
    this.electronicResources = result.electronicResources || null
    this.issuance = (result.issuance?.length && result.issuance) || null
    this.numPhysicalItems = result.numItemsTotal || 0
    this.items = this.getItemsFromResult(result)
    this.ebscoResults = result.ebscoResults
  }

  get url() {
    return `/bib/${this.id}`
  }

  get numElectronicResources() {
    return this.electronicResources?.length || 0
  }

  // Used to determine the Volume column text in the ItemTable
  get isArchiveCollection() {
    return (
      Array.isArray(this.issuance) &&
      this.issuance.some((issuance) => issuance["@id"] === "urn:biblevel:c")
    )
  }

  get hasItems() {
    return this.items.length > 0
  }

  get hasPhysicalItems() {
    return this.numPhysicalItems > 0
  }

  get hasElectronicResources() {
    return this.numElectronicResources > 0
  }

  get showViewAllItemsLink() {
    return this.numPhysicalItems > ITEMS_PER_SEARCH_RESULT
  }

  get numItems() {
    return this.hasPhysicalItems
      ? this.numPhysicalItems
      : this.numElectronicResources
  }

  get resourceType() {
    return this.hasPhysicalItems ? "Item" : "Resource"
  }

  get itemMessage() {
    return `${this.numItems} ${this.resourceType}${
      this.numItems !== 1 ? "s" : ""
    }`
  }

  getTitleFromResult(result: Bib) {
    if (!result.titleDisplay || !result.titleDisplay.length) {
      const author =
        result.creatorLiteral && result.creatorLiteral.length
          ? ` / ${result.creatorLiteral[0]}`
          : ""
      return result.title && result.title.length
        ? `${result.title[0]}${author}`
        : ""
    }
    return result.titleDisplay[0]
  }

  getYearFromResult(result: Bib) {
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

  // Map Bib items to Item class instances and sort them by their sortableShelfMark field
  getItemsFromResult(result: Bib): Item[] {
    return result.items
      .map((item) => {
        return new Item(item, this)
      })
      .sort((a, b) => (a.sortableShelfMark > b.sortableShelfMark ? 1 : -1))
  }
}
