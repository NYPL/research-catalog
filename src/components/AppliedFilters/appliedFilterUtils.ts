import type { TagSetFilterDataProps } from "@nypl/design-system-react-components"
import type {
  Aggregation,
  CollapsedMultiValueAppliedFilters,
  Option,
} from "../../types/filterTypes"
import { mapCollectionToFilterTag } from "../../utils/advancedSearchUtils"

export const buildAppliedFiltersValueArrayWithTagRemoved = (
  tag: TagSetFilterDataProps,
  appliedFilters: CollapsedMultiValueAppliedFilters
): CollapsedMultiValueAppliedFilters => {
  const fieldToUpdate = tag.field
  const updatedFilters = {} as CollapsedMultiValueAppliedFilters
  for (const field in appliedFilters) {
    if (field !== fieldToUpdate) {
      updatedFilters[field] = appliedFilters[field]
    } else {
      updatedFilters[field] = appliedFilters[field].filter(
        (value) => value !== tag.value
      )
    }
  }

  return updatedFilters
}

// Get label from aggregations to display in filter tags, with special handling for
// date and collection filters. Falls back to just displaying filter value.
export const addLabelPropAndParseFilters = (
  aggregations: Aggregation[],
  appliedFilterValues: CollapsedMultiValueAppliedFilters
): Record<string, Option[]> => {
  const appliedFilterValuesWithLabels: Record<string, Option[]> = {}

  for (const appliedFilterField in appliedFilterValues) {
    const matchingFieldAggregation = aggregations.find(
      ({ field }) => field === appliedFilterField
    )

    appliedFilterValuesWithLabels[appliedFilterField] = appliedFilterValues[
      appliedFilterField
    ].map((filterValue: string): Option => {
      const defaultOption: Option = {
        count: null,
        value: filterValue,
        label: filterValue,
      }

      // Date: Add "From"/"To" to filter labels
      if (appliedFilterField.includes("date")) {
        const labelPrefix = appliedFilterField.split("date")[1]
        return {
          count: null,
          value: filterValue,
          label: `${labelPrefix} ${filterValue}`,
        }
      }

      // Collection: Map collection name to filter label with parent location nickname
      if (appliedFilterField === "collection") {
        const collectionLabel =
          matchingFieldAggregation?.values.find(
            (option) => option.value === filterValue
          )?.label ?? filterValue

        return {
          count: null,
          value: filterValue,
          label: mapCollectionToFilterTag(filterValue, collectionLabel),
        }
      }

      const matchingOption = matchingFieldAggregation?.values.find(
        (option) => option.value === filterValue
      )

      // If there's no matching option in the aggregations,
      // or no matching aggregations for the field, fall back to value as label
      return matchingOption ?? defaultOption
    })

    // Don't pass on falsy options
    appliedFilterValuesWithLabels[appliedFilterField] =
      appliedFilterValuesWithLabels[appliedFilterField].filter(Boolean)
  }

  delete appliedFilterValuesWithLabels["q"]

  return appliedFilterValuesWithLabels
}

export const buildTagsetData = (
  appliedFiltersWithLabels: Record<string, Option[]>
) => {
  const appliedFilterFields = Object.keys(appliedFiltersWithLabels)
  return appliedFilterFields
    .map((field: string) => {
      const appliedFiltersWithLabelsPerField = appliedFiltersWithLabels[field]
      return appliedFiltersWithLabelsPerField.map((filter: Option) => {
        return {
          id: field + "-" + filter?.label,
          label: filter?.label,
          field,
          value: filter.value,
        }
      })
    })
    .flat()
}
