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
  tableData: string[][]

  constructor(items: Item[], itemTableParams: ItemTableParams) {
    this.items = items
    this.isDesktop = itemTableParams.isDesktop
    this.isBibPage = itemTableParams.isBibPage
    this.isArchiveCollection = itemTableParams.isArchiveCollection
    this.tableData = [[]]
  }

  get tableHeadings(): string[] {
    return [
      ...(this.hasStatusColumn() ? ["Status"] : []),
      ...(this.hasVolumeColumn() ? [this.volumeColumnHeading()] : []),
      "Format",
      ...(!this.hasVolumeColumn() && !this.isDesktop ? ["Call Number"] : []),
      ...(this.isBibPage && this.isDesktop ? ["Access"] : []),
      ...(this.isDesktop ? ["Call Number"] : []),
      ...(this.hasLocationColumn ? ["Item Location"] : []),
    ]
  }

  hasVolumeColumn(): boolean {
    return this.items.some((item) => item.volume?.length) && this.isBibPage
  }

  hasStatusColumn(): boolean {
    return this.isBibPage
  }

  hasLocationColumn(): boolean {
    return this.isDesktop
  }

  volumeColumnHeading(): string {
    return this.isArchiveCollection ? "Vol/Date" : "Container"
  }
}
