import type {
  DiscoveryBibResult,
  ElectronicResource,
  SubjectHeading,
} from "../types/bibTypes"
import type { JSONLDValue } from "../types/itemTypes"
import type { Aggregation } from "../types/filterTypes"
import Item from "../models/Item"
import { ITEM_PAGINATION_BATCH_SIZE } from "../config/constants"
import { getFindingAidFromSupplementaryContent } from "../utils/bibUtils"
import type { ReactElement } from "react"
import ItemTableCell from "../components/ItemTable/ItemTableCell"
import StatusLinks from "../components/ItemTable/StatusLinks"

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
  titleDisplay: string
  electronicResources?: ElectronicResource[]
  numPhysicalItems: number
  numItemsMatched: number
  format?: string
  issuance?: JSONLDValue[]
  items?: Item[]
  itemAggregations?: Aggregation[]
  hasItemDates?: boolean
  subjectHeadings?: SubjectHeading[]
  findingAid?: string

  constructor(result: DiscoveryBibResult) {
    this.id = result["@id"] ? result["@id"].substring(4) : ""
    this.title = result.title?.[0] || result.titleDisplay?.[0] || "[Untitled]"
    this.titleDisplay = this.getTitleDisplayFromResult(result)
    this.electronicResources = result.electronicResources || null
    this.numPhysicalItems = result.numItemsTotal || 0
    this.numItemsMatched = result.numItemsMatched || 0
    this.format = (result.format?.length && result.format[0]?.prefLabel) || null
    this.issuance = (result.issuance?.length && result.issuance) || null
    this.itemAggregations = result.itemAggregations || null
    this.hasItemDates = result.hasItemDates || false
    this.subjectHeadings = result.subjectHeadings || null
    this.findingAid = getFindingAidFromSupplementaryContent(
      result.supplementaryContent
    )
    this.items = this.getItemsFromResult(result)
  }

  get url() {
    return `/bib/${this.id}`
  }

  get numElectronicResources() {
    return this.electronicResources?.length || 0
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

  getItemTable({
    inSearchResult,
    maxItems,
  }: {
    inSearchResult: boolean
    maxItems?: number
  }): {
    items: Item[]
    tableHeadings: string[]
    tableData: ReactElement[][]
  }[] {
    if (!this.items?.length) return []
    if (inSearchResult) {
      return this.items.slice(0, maxItems).map((item) => ({
        items: [item],
        tableHeadings: this.getItemTableHeadings({ inSearchResult }),
        tableData: this.getItemTableContents({ inSearchResult, items: [item] }),
      }))
    }
    return [
      {
        items: this.items,
        tableHeadings: this.getItemTableHeadings({ inSearchResult }),
        tableData: this.getItemTableContents({ inSearchResult }),
      },
    ]
  }

  getItemTableHeadings({
    inSearchResult,
  }: {
    inSearchResult: boolean
  }): string[] {
    return [
      ...(this.showStatusColumn(inSearchResult) ? ["Status"] : []),
      ...(this.showVolumeColumn(inSearchResult)
        ? [this.volumeColumnHeading()]
        : []),
      "Format",
      ...(this.showAccessColumn(inSearchResult) ? ["Access"] : []),
      "Call number",
      "Item location",
    ]
  }

  getItemTableContents({
    inSearchResult,
    items = this.items,
  }: {
    inSearchResult: boolean
    items?: Item[]
  }): ReactElement[][] {
    return (
      items?.map((item) => {
        return [
          ...(this.showStatusColumn(inSearchResult)
            ? [StatusLinks({ item })]
            : []),
          ...(this.showVolumeColumn(inSearchResult)
            ? [ItemTableCell({ children: item.volume })]
            : []),
          ItemTableCell({ children: item.format }),
          ...(this.showAccessColumn(inSearchResult)
            ? [ItemTableCell({ children: item.accessMessage })]
            : []),
          ItemTableCell({ children: item.callNumber }),
          ItemTableCell({ children: item.location.prefLabel }),
        ]
      }) || []
    )
  }

  showVolumeColumn(inSearchResult: boolean): boolean {
    return this.items?.some((item) => item.volume) && !inSearchResult
  }

  showStatusColumn(inSearchResult: boolean): boolean {
    return !inSearchResult
  }

  showAccessColumn(inSearchResult: boolean): boolean {
    return !inSearchResult
  }

  volumeColumnHeading(): string {
    return this.isArchiveCollection ? "Container" : "Vol/date"
  }

  get resourceType() {
    return this.hasPhysicalItems ? "Item" : "Resource"
  }

  // Used to determine the Volume column text in the ItemTable
  get isArchiveCollection() {
    return (
      Array.isArray(this.issuance) &&
      this.issuance.some((issuance) => issuance["@id"] === "urn:biblevel:c")
    )
  }

  numItems(filtersAreApplied = false) {
    return filtersAreApplied ? this.numItemsMatched : this.numPhysicalItems
  }

  showViewAllItemsLink(filtersAreApplied = false) {
    return this.numItems(filtersAreApplied) > ITEM_PAGINATION_BATCH_SIZE
  }

  getNumItemsMessage(filtersAreApplied = false) {
    const totalItems = this.numItems(filtersAreApplied)
    return `${totalItems} ${
      filtersAreApplied ? "matching " : ""
    }${this.resourceType.toLowerCase()}${totalItems !== 1 ? "s" : ""}`
  }

  getItemsViewAllLoadingMessage(filtersAreApplied = false) {
    // We don't want to show the number of filtered items since this may change during loading.
    return `Loading all ${
      filtersAreApplied ? "matching" : this.numPhysicalItems
    } items. This may take a few moments...`
  }

  getTitleDisplayFromResult(result: DiscoveryBibResult) {
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
