/* eslint-disable @typescript-eslint/naming-convention */
import type { ItemFilterData } from "../models/ItemFilterData"
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

export const buildItemFilterQueryParams = (
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

export const buildAppliedFiltersString = (
  query: BibPageQueryParams,
  numItems = 20,
  itemAggs: ItemFilterData[]
) => {
  const items = `Item${numItems === 1 ? "" : "s"}`
  if (Object.keys(query).length === 0) return `${numItems} ${items}`
  const num = numItems === 0 ? "No" : numItems
  const numMatchingItems = `${num} ${items} Matching `
  const filters = Object.keys(query)
    .map((field: string) => {
      const queryPerField = query[field]
      if (queryPerField) {
        const fieldAggregations = itemAggs.find(
          (agg: ItemFilterData) => agg.field === field.substring(5)
        )
        const labels =
          fieldAggregations.labelsForConcatenatedValues(queryPerField)
        return field.substring(5) + ": " + labels
      }
    })
    .filter((filter) => filter)
  return numMatchingItems + "Filtered by " + filters.join(", ")
}
