/* eslint-disable @typescript-eslint/naming-convention */
import { capitalize } from "lodash"
import type { TagSetFilterDataProps } from "@nypl/design-system-react-components"

import type { ItemFilterData } from "../models/ItemFilterData"
import type {
  AppliedItemFilters,
  CollapsedMultiValueAppliedFilters,
  ItemFilterQueryParams,
} from "../types/filterTypes"

export const isRecapLocation = (loc: string) => {
  return loc.split(":")[1].startsWith("rc")
}

export const combineRecapLocations = (locations: string[]) => {
  if (locations.find(isRecapLocation)) {
    return [...locations.filter((loc) => !isRecapLocation(loc)), "Offsite"]
  } else return locations
}

export const filtersAreApplied = (appliedFilters: AppliedItemFilters) =>
  Object.entries(appliedFilters).some(([, value]) => value.length > 0)

export const parseItemFilterQueryParams = ({
  item_status,
  item_format,
  item_location,
}: ItemFilterQueryParams) => {
  return {
    location: item_location
      ? combineRecapLocations(item_location.split(","))
      : [],
    format: item_format?.split(",") || [],
    status: item_status?.split(",") || [],
  }
}

export const buildItemFilterQuery = (
  { location, format, status }: AppliedItemFilters,
  recapLocations: string
) => {
  const locs = location.map((loc) => {
    if (loc === "Offsite") return recapLocations
    else return loc
  })

  return {
    ...(locs.length && { item_location: locs.join(",") }),
    ...(format.length && { item_format: format.join(",") }),
    ...(status.length && { item_status: status.join(",") }),
  }
}

// numItems default is for development purposes only. Once data is being
// passed in to the Item Filters components, this default should be removed.
export const buildItemsMatchedStringString = (
  query: ItemFilterQueryParams,
  numItemsMatched = 0
) => {
  const items = `Item${numItemsMatched === 1 ? "" : "s"}`
  if (Object.keys(query).length === 0) return `${numItemsMatched} ${items}`
  const num = numItemsMatched === 0 ? "No" : numItemsMatched
  return `${num} Matching ${items} `
}

export const buildAppliedFiltersTagSetData = (
  appliedFilters: CollapsedMultiValueAppliedFilters,
  itemAggregations: ItemFilterData[]
): TagSetFilterDataProps[] => {
  const filters: TagSetFilterDataProps[] = []
  Object.keys(appliedFilters).forEach((field: string) => {
    const appliedFilterPerField = appliedFilters[field]
    appliedFilterPerField.forEach((filterValue: string) => {
      const fieldAggregations = itemAggregations.find(
        (aggregation: ItemFilterData) => aggregation.field === field
      )

      filters.push({
        label: `${capitalize(field)} > ${fieldAggregations.labelForValue(
          filterValue
        )}`,
        id: filterValue,
        iconName: "close",
      })
    })
  })
  return filters
}

export const getFiltersWithItemRemoved = (
  id: string,
  appliedFilters: AppliedItemFilters
): [values?: string[], field?: string] => {
  let valuesAndField: [values?: string[], field?: string] = [null, null]
  Object.keys(appliedFilters).forEach((field) => {
    const filterValueIndex = appliedFilters[field].indexOf(id)
    if (filterValueIndex >= 0) {
      appliedFilters[field].splice(filterValueIndex, 1)
      valuesAndField = [appliedFilters[field], field]
    }
  })
  return valuesAndField
}
