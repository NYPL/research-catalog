import type { ReactElement } from "react"

import type Item from "./Item"
import type { ItemTableParams } from "../types/itemTypes"
import StatusLinks from "../components/ItemTable/StatusLinks"

/**
 * The ItemTable class converts a Bib's item data to the format
 * expected by the Design System's Table component props.
 *
 * It factors in additional contextual parameters including whether we're seeing
 * the table in a Search Result or a Bib page, and whether we're on a Desktop
 * or Mobile breakpoint.
 *
 * TODO: Remove this class and move functionality to Bib class
 */
export default class ItemTableData {
  items: Item[]
  isBibPage: boolean
  isArchiveCollection: boolean

  constructor(items: Item[], itemTableParams: ItemTableParams) {
    this.items = items
    this.isBibPage = itemTableParams.isBibPage
    this.isArchiveCollection = itemTableParams.isArchiveCollection
  }
  /**
   * TODO: Consolidate tableHeadings and tableData into a single object to avoid relying on consistent ordering between the two.
   * Add getter functions to build the array structures expected by the tableHeadings and tableData props
   * Extra credit: Create separate prop constructors for Bib page and Search Results to deprecate the excessive showColumn helpers.
   */
  get tableHeadings(): string[] {
    return [
      ...(this.showStatusColumn() ? ["Status"] : []),
      ...(this.showVolumeColumn() ? [this.volumeColumnHeading()] : []),
      "Format",
      "Call Number",
      ...(this.showAccessColumn() ? ["Access"] : []),
      "Item Location",
    ]
  }

  get tableData(): (string | ReactElement)[][] {
    return this.items.map((item) => {
      return [
        ...(this.showStatusColumn() ? [StatusLinks({ item })] : []),
        ...(this.showVolumeColumn() ? [item.volume] : []),
        item.format,
        item.callNumber,
        ...(this.showAccessColumn() ? [item.accessMessage] : []),
        item.location.prefLabel,
      ]
    })
  }

  showVolumeColumn(): boolean {
    return this.items.some((item) => item.volume) && this.isBibPage
  }

  showStatusColumn(): boolean {
    return this.isBibPage
  }

  showAccessColumn(): boolean {
    return this.isBibPage
  }

  volumeColumnHeading(): string {
    return this.isArchiveCollection ? "Vol/Date" : "Container"
  }
}
