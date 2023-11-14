type BibPageQueryParams = {
  item_location?: string
  item_format?: string
  item_status?: string
}
import type { AppliedFilters } from "../types/filterTypes"

import type { ItemFilterData } from "../models/itemFilterData"

class ItemFilterQuery {
  location: string[]
  format: string[]
  status: string[]
  constructor(query: BibPageQueryParams) {
    this.location = query.item_location
      ? ItemFilterQuery.combineRecapLocations(query.item_location.split(","))
      : []
    this.format = query.item_format?.split(",") || []
    this.status = query.item_status?.split(",") || []
  }

  static isRecapLocation(loc: string) {
    return loc.split(":")[1].startsWith("rc")
  }
  static combineRecapLocations = (locations: string[]) => {
    if (locations.find(this.isRecapLocation)) {
      return [
        ...locations.filter((loc) => !this.isRecapLocation(loc)),
        "Offsite",
      ]
    } else return locations
  }

  static buildItemFilterQueryString(
    { location, format, status }: AppliedFilters,
    recapLocations: string
  ) {
    const locs = location.map((loc) => {
      if (loc === "Offsite") return recapLocations
      else return loc
    })
    const location_query = locs.length ? "item_location=" + locs.join(",") : ""
    const format_query = format.length ? "item_format=" + format.join(",") : ""
    const status_query = status.length ? "item_status=" + status.join(",") : ""

    const query = [location_query, format_query, status_query]
      .filter((q) => q)
      .join("&")
    if (query.length) return encodeURI("?" + query)
    else return ""
  }

  buildAppliedFilterString(itemAggs: ItemFilterData[]) {
    const filters = ["status", "location", "format"]
      .map((field: string) => {
        const appliedFilterPerField = this[field]
        if (appliedFilterPerField.length) {
          const fieldAggregations = itemAggs.find(
            (agg: ItemFilterData) => agg.field === field
          )
          const labels = fieldAggregations.labelsForConcatenatedValues(
            appliedFilterPerField
          )
          return field + ": " + labels
        }
      })
      .filter((filter) => filter)
    return "Filtered by " + filters.join(", ")
  }
  appliedFilters() {
    return { location: this.location, format: this.format, status: this.status }
  }
}

export default ItemFilterQuery
