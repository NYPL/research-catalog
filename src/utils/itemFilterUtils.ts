/* eslint-disable @typescript-eslint/naming-convention */
import type { ItemFilterData } from "../models/itemFilterData"
import type { AppliedFilters } from "../types/filterTypes"

export const isRecapLocation = (loc: string) => {
  return loc.split(":")[1].startsWith("rc")
}

export const combineRecapLocations = (locations: string[]) => {
  if (locations.find(isRecapLocation)) {
    return [...locations.filter((loc) => !isRecapLocation(loc)), "Offsite"]
  } else return locations
}

type BibPageQueryParams = {
  item_location?: string
  item_format?: string
  item_status?: string
}

export const parseItemFilterQueryParams = ({
  item_status,
  item_format,
  item_location,
}: BibPageQueryParams) => {
  return {
    location: item_location
      ? combineRecapLocations(item_location.split(","))
      : [],
    format: item_format?.split(",") || [],
    status: item_status?.split(",") || [],
  }
}

export const buildItemFilterQueryString = (
  { location, format, status }: AppliedFilters,
  recapLocations: string
) => {
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

// numItems default is for development purposes only. Once data is being
// passed in to the Item Filters components, this default should be removed.
export const buildItemsMatchedStringString = (query, numItems = 20) => {
  const items = `Item${numItems === 1 ? "" : "s"}`
  if (Object.keys(query).length === 0) return `${numItems} ${items}`
  const num = numItems === 0 ? "No" : numItems
  return `${num} Matching ${items} `
}

export const buildAppliedFiltersString = (
  appliedFilters: AppliedFilters,
  itemAggs: ItemFilterData[]
) => {
  const filters = Object.keys(appliedFilters)
    .map((field: string) => {
      const appliedFilterPerField = appliedFilters[field]
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
  if (filters.length) return "Filtered by " + filters.join(", ")
}
