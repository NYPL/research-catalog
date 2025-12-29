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

export const addLabelPropAndParseFilters = (
  aggregations: Aggregation[], // from the API response
  appliedFilterValues: CollapsedMultiValueAppliedFilters // parsed from url query params
): Record<string, Option[]> => {
  const appliedFilterValuesWithLabels = {}
  for (const appliedFilterField in appliedFilterValues) {
    // Find the aggregation that corresponds to the filter field we are working on
    const matchingFieldAggregation = aggregations.find(
      ({ field: aggregationField }) => aggregationField === appliedFilterField
    )
    // See line 69 for explanation of date exclusion.
    if (!matchingFieldAggregation && !appliedFilterField.includes("date"))
      continue

    appliedFilterValuesWithLabels[appliedFilterField] = appliedFilterValues[
      appliedFilterField
    ]
      .map((filterValue: string): Option | null => {
        // dateTo and dateFrom fields are not based on
        // aggregations results. Pass the year along without
        // transforming fieldname or finding the label
        if (appliedFilterField.includes("date")) {
          const labelPrefix = appliedFilterField.split("date")[1]
          return {
            count: null,
            value: filterValue,
            label: `${labelPrefix} ${filterValue}`,
          }
        }

        // Subject literals can be combinations of multiple subjects
        if (appliedFilterField === "subjectLiteral")
          return {
            count: null,
            value: filterValue,
            label: filterValue,
          }

        if (appliedFilterField === "collection") {
          const collectionName = matchingFieldAggregation.values.find(
            (option: Option) => option.value === filterValue
          )
          return {
            count: null,
            value: filterValue,
            label: mapCollectionToFilterTag(filterValue, collectionName.label),
          }
        }

        // Find the option with the same value, so we can eventually display the label
        const matchingOption = matchingFieldAggregation.values.find(
          (option: Option) => option.value === filterValue
        )

        // Only fall back to raw value for creatorLiteral or contributorLiteral
        if (matchingOption) return matchingOption
        if (
          appliedFilterField === "creatorLiteral" ||
          appliedFilterField === "contributorLiteral"
        ) {
          return {
            count: null,
            value: filterValue,
            label: filterValue,
          }
        }

        // Otherwise, drop it
        return null
      })
      .filter((option) => option)
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
