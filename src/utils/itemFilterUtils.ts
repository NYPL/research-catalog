import type { TagSetFilterDataProps } from "@nypl/design-system-react-components"
import { capitalize } from "lodash"

import type { ItemFilterData } from "../models/ItemFilterData"
import type {
  AppliedItemFilters,
  CollapsedMultiValueAppliedFilters,
  ItemFilterQueryParams,
  SelectedCheckboxes,
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
  { location, format, status, year }: AppliedItemFilters,
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

export const removeValueFromFilters = (
  id: string,
  appliedFilters: AppliedItemFilters
): [string[], string] => {
  let field: string
  const filtersWithValueRemoved = Object.entries(appliedFilters).reduce(
    (acc, [key, value]) => {
      if (value.includes(id)) {
        field = key
        return value.filter((val) => val !== id)
      }
      return value
    },
    []
  )
  return [filtersWithValueRemoved, field]
}

export const getSelectedCheckboxesFromAppliedFilters = (
  appliedFilters: AppliedItemFilters
): SelectedCheckboxes => {
  return {
    location: { items: appliedFilters.location },
    format: { items: appliedFilters.format },
    status: { items: appliedFilters.status },
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export const parseItemFilterQueryParams = ({
  item_status,
  item_format,
  item_location,
  item_date,
}: ItemFilterQueryParams) => {
  return {
    location: item_location
      ? combineRecapLocations(item_location.split(","))
      : [],
    format: item_format?.split(",") || [],
    status: item_status?.split(",") || [],
    year: item_date?.split(",") || [],
  }
}
