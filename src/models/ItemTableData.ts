import type { ReactElement } from "react"

import type Item from "./Item"
import type { ItemTableParams } from "../types/itemTypes"
import StatusLinks from "../components/ItemTable/StatusLinks"
import ItemTableCell from "../components/ItemTable/ItemTableCell"

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
  items?: Item[]
  inSearchResult: boolean
  isArchiveCollection: boolean

  constructor(items: Item[], itemTableParams: ItemTableParams) {
    this.items = items || null
    this.inSearchResult = itemTableParams.inSearchResult || false
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
      ...(this.showAccessColumn() ? ["Access"] : []),
      "Call number",
      "Item location",
    ]
  }

  get tableData(): ReactElement[][] {
    return this.items?.map((item) => {
      return [
        ...(this.showStatusColumn() ? [StatusLinks({ item })] : []),
        ...(this.showVolumeColumn()
          ? [ItemTableCell({ children: item.volume })]
          : []),
        ...(this.showAccessColumn()
          ? [ItemTableCell({ children: item.accessMessage })]
          : []),
        ItemTableCell({
          children: item.callNumber
            ? `${item.callNumber}${
                item.volume && !this.showVolumeColumn() ? ` ${item.volume}` : ""
              }`
            : "",
        }),
        ItemTableCell({ children: item.location.prefLabel }),
      ]
    })
  }

  showVolumeColumn(): boolean {
    return this.items?.some((item) => item.volume) && !this.inSearchResult
  }

  showStatusColumn(): boolean {
    return !this.inSearchResult
  }

  showAccessColumn(): boolean {
    return !this.inSearchResult
  }

  volumeColumnHeading(): string {
    return this.isArchiveCollection ? "Container" : "Vol/date"
  }
}
