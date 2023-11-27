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
 */
export default class ItemTableData {
  items: Item[]
  isDesktop: boolean
  isBibPage: boolean
  isArchiveCollection: boolean

  constructor(items: Item[], itemTableParams: ItemTableParams) {
    this.items = items
    this.isDesktop = itemTableParams.isDesktop
    this.isBibPage = itemTableParams.isBibPage
    this.isArchiveCollection = itemTableParams.isArchiveCollection
  }

  get tableHeadings(): string[] {
    return [
      ...(this.showStatusColumn() ? ["Status"] : []),
      ...(this.showVolumeColumn() ? [this.volumeColumnHeading()] : []),
      "Format",
      ...(!this.showVolumeColumn() && !this.isDesktop ? ["Call Number"] : []),
      ...(this.showAccessColumn() ? ["Access"] : []),
      ...(this.isDesktop ? ["Call Number"] : []),
      ...(this.showLocationColumn ? ["Item Location"] : []),
    ]
  }

  get tableData(): (string | ReactElement)[][] {
    return this.items.map((item) => {
      return [
        ...(this.showStatusColumn() ? [StatusLinks()] : []),
        ...(this.showVolumeColumn() ? [item.volume] : []),
        item.format,
        ...(!this.showVolumeColumn() && !this.isDesktop
          ? [item.callNumber]
          : []),
        ...(this.showAccessColumn() ? [item.accessMessage] : []),
        ...(this.isDesktop ? [item.callNumber] : []),
        ...(this.showLocationColumn ? [item.location.prefLabel] : []),
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
    return this.isBibPage && this.isDesktop
  }

  showLocationColumn(): boolean {
    return this.isDesktop
  }

  volumeColumnHeading(): string {
    return this.isArchiveCollection ? "Vol/Date" : "Container"
  }
}
