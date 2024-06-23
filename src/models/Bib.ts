import type { DiscoveryBibResult, ElectronicResource } from "../types/bibTypes"
import type { JSONLDValue } from "../types/itemTypes"
import Item from "../models/Item"
import { ITEM_PAGINATION_BATCH_SIZE } from "../config/constants"

/**
 * The Bib class represents a single Bib entity and contains the data
 * and getter functions used in both the Bib Details page and a single
 * Search Result.
 *
 * It is the parent class of SearchResultsBib, which adds functionality specific
 * to Search Results.
 */
export default class Bib {
  id: string
  title: string
  electronicResources?: ElectronicResource[]
  numPhysicalItems: number
  materialType?: string
  issuance?: JSONLDValue[]
  items?: Item[]

  constructor(result: DiscoveryBibResult) {
    this.id = result["@id"] ? result["@id"].substring(4) : ""
    this.title = this.getTitleFromResult(result)
    this.electronicResources = result.electronicResources || null
    this.numPhysicalItems = result.numItemsTotal || 0
    this.materialType =
      (result.materialType?.length && result.materialType[0]?.prefLabel) || null
    this.issuance = (result.issuance?.length && result.issuance) || null
    this.items = this.getItemsFromResult(result)
  }

  get url() {
    return `/bib/${this.id}`
  }

  get numElectronicResources() {
    return this.electronicResources?.length || 0
  }

  get numItems() {
    return this.hasPhysicalItems
      ? this.numPhysicalItems
      : this.numElectronicResources
  }

  get hasPhysicalItems() {
    return this.numPhysicalItems > 0
  }

  get hasElectronicResources() {
    return this.numElectronicResources > 0
  }

  get isOnlyElectronicResources() {
    return this.hasElectronicResources && !this.hasPhysicalItems
  }

  get showItemTable() {
    return !this.isOnlyElectronicResources && this.hasPhysicalItems
  }

  // Items should be shown but there are none set in the items attribute
  // Likely a problem with the pagination offset query in the initial Bib fetch
  get showItemTableError() {
    return this.showItemTable && !this.items
  }

  get showViewAllItemsLink() {
    return this.numPhysicalItems > ITEM_PAGINATION_BATCH_SIZE
  }

  get resourceType() {
    return this.hasPhysicalItems ? "Item" : "Resource"
  }

  get itemMessage() {
    return `${this.numItems} ${this.resourceType}${
      this.numItems !== 1 ? "s" : ""
    }`
  }

  get itemsViewAllLoadingMessage() {
    return `Loading all ${this.numPhysicalItems} items...this may take a few moments`
  }

  // Used to determine the Volume column text in the ItemTable
  get isArchiveCollection() {
    return (
      Array.isArray(this.issuance) &&
      this.issuance.some((issuance) => issuance["@id"] === "urn:biblevel:c")
    )
  }

  getTitleFromResult(result: DiscoveryBibResult) {
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

  getItemsFromResult(result: DiscoveryBibResult): Item[] | null {
    return result.items.length
      ? result.items.map((item) => new Item(item, this))
      : null
  }
}
