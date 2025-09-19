import type { TagSetFilterDataProps } from "@nypl/design-system-react-components"
import { capitalize } from "lodash"

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

export const areFiltersApplied = (appliedFilters: AppliedItemFilters) =>
  Object.entries(appliedFilters).some(([, value]) => value.length > 0)

export const buildItemFilterQuery = (
  { location, status, year }: AppliedItemFilters,
  recapLocations: string
) => {
  const locs = location.map((loc) => {
    if (loc === "Offsite") return recapLocations
    else return loc
  })

  return {
    ...(locs.length && { item_location: locs.join(",") }),
    ...(status.length && { item_status: status.join(",") }),
    ...(year.length && { item_date: year.join(",") }),
  }
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
      const valueLabel =
        field === "year"
          ? filterValue
          : fieldAggregations?.labelForValue(filterValue)
      if (valueLabel) {
        filters.push({
          label: `${capitalize(field)} > ${valueLabel}`,
          // This ID needs to be the filters value to allow for proper clearing of the individual filters
          id: filterValue,
        })
      }
    })
  })
  return filters
}

/**
 * Returns a tuple with the new filter values and the field that the value was removed from.
 * We need to be able to remove a filter without prior knowledge of the filter group that contains it
 * So that we can clear individual filters with the TagSet clearing buttons.
 */
export const removeValueFromFilters = (
  id: string,
  appliedFilters: AppliedItemFilters
) => {
  // find the filter field that includes the value to remove
  const field = Object.keys(appliedFilters).find((field) => {
    return appliedFilters[field].includes(id)
  })
  // get a copy of the filter values with the value removed
  const newValues = appliedFilters[field].filter(
    (filterValue: string) => filterValue !== id
  )
  return [newValues, field]
}

/* eslint-disable @typescript-eslint/naming-convention */
export const parseItemFilterQueryParams = ({
  item_status,
  item_location,
  item_date,
}: ItemFilterQueryParams) => {
  return {
    location: item_location
      ? combineRecapLocations(item_location.split(","))
      : [],
    status: item_status?.split(",") || [],
    year: item_date?.split(",") || [],
  }
}
