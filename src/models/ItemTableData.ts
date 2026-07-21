import type { ReactElement } from "react"

import type Item from "./Item"
import type { ItemTableParams } from "../types/itemTypes"
import AvailabilityLinks from "../components/ItemTable/AvailabilityLinks"
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
   * Returns an object with table headings as the keys, and the table data for each item as the values.
   * The presence of certain table headings/columns are determined by whether the table is to be displayed on a
   * search results card or bib page
   */
  getTable(): { [key: string]: ReactElement[] } {
    const callNumberCells = this.items?.map((item) =>
      ItemTableCell({
        text: item.callNumber ? `${item.callNumber}` : "",
      })
    )
    const volumeCells = this.items?.map((item) =>
      ItemTableCell({ text: item.volume })
    )
    const availabilityCells = this.items?.map((item) =>
      AvailabilityLinks({ item })
    )
    const accessMessageCells = this.items?.map((item) =>
      ItemTableCell({ text: item.accessMessage })
    )
    const locationCells = this.items?.map((item) =>
      ItemTableCell({ text: item.location?.prefLabel })
    )

    const divisionCells = this.items?.map((item) =>
      ItemTableCell({
        text: item.collection?.prefLabel,
        url:
          item.collection?.locationsPath &&
          `https://nypl.org/${item.collection.locationsPath}`,
      })
    )

    const volumeColumnWrapped = this.showVolumeColumn() && {
      [this.volumeColumnHeading()]: volumeCells,
    }

    const divisionColumnWrapped = this.showDivisionColumn() && {
      Division: divisionCells,
    }

    const useRestrictionsColumnWrapped = this.showUseRestrictionsColumn() && {
      "Use restrictions": accessMessageCells,
    }

    return this.inSearchResult
      ? {
          "Call Number": callNumberCells,
          ...volumeColumnWrapped,
          "Item Location": locationCells,
          ...divisionColumnWrapped,
        }
      : {
          Availability: availabilityCells,
          ...volumeColumnWrapped,
          "Call Number": callNumberCells,
          "Item Location": locationCells,
          Division: divisionCells,
          ...useRestrictionsColumnWrapped,
        }
  }

  get tableHeadings(): string[] {
    return Object.keys(this.getTable())
  }

  get tableData(): ReactElement[][] {
    const tableObject = this.getTable()
    return this.items?.map((_, itemIndex) =>
      Object.keys(tableObject).map((heading) => tableObject[heading][itemIndex])
    )
  }

  showDivisionColumn(): boolean {
    return (
      this.items?.some((item) => item.collection?.prefLabel) &&
      this.items?.some((item) => !item.isPartnerReCAP())
    )
  }

  showUseRestrictionsColumn(): boolean {
    return this.items?.some((item) => item.accessMessage !== "")
  }

  showVolumeColumn(): boolean {
    return this.items?.some((item) => item.volume)
  }

  volumeColumnHeading(): string {
    return this.isArchiveCollection ? "Container" : "Vol/date"
  }
}
