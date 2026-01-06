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

// The aggregations from the api response have the label we want to display
// in the filter dialog. The applied filter values parsed from the url only have
// values. Using the filter values, find the label from the aggregations array.
export const addLabelPropAndParseFilters = (
  aggregations: Aggregation[], // from the api response
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
      .map((filterValue: string): Option => {
        // dateTo and dateFrom fields are not based on
        // aggregations results. Pass the year along with out
        // transforming fieldname or finding the label
        if (appliedFilterField.includes("date")) {
          const labelPrefix = appliedFilterField.split("date")[1]
          return {
            count: null,
            value: filterValue,
            label: `${labelPrefix} ${filterValue}`,
          }
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
        if (appliedFilterField === "contributorLiteral") {
          // contributorLiteral filters use special display string rather than tags
          // with agg-derived labels
          return null
        }
        // Find the option with the same value, so we can eventually display the label
        const matchingOption = matchingFieldAggregation.values.find(
          (option: Option) => option.value === filterValue
        )
        return matchingOption
      })
      // don't pass on falsy options. this happens when no aggregations are
      // returned for a given param, which is not uncommon when many filters
      // are applied at once (and possibly in other scenarios).
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
