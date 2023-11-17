import type Item from "./Item"
import type { ItemTableParams } from "../types/itemTypes"

/**
 * The ItemTable class converts a Bib's item data to the format
 * expected by the Design System's Table component props.
 *
 * It factors in additional contextual parameters including whether we're seeing
 * the table in a Search Result or a Bib page, and whether we're on a Desktop
 * or Mobile breakpoint.
 */
export default class ItemTableData {
  items: Item[]
  isDesktop: boolean
  isBibPage: boolean
  isArchiveCollection: boolean
  tableHeadings: string[]
  tableData: string[][]

  constructor(items: Item[], itemTableParams: ItemTableParams) {
    this.items = items
    this.isDesktop = itemTableParams.isDesktop
    this.isBibPage = itemTableParams.isBibPage
    this.isArchiveCollection = itemTableParams.isArchiveCollection
    this.tableHeadings = []
    this.tableData = [[]]
  }

  hasVolumeColumn(): boolean {
    return this.items.some((item) => item.volume?.length) && this.isBibPage
  }
}
