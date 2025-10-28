import type { TagSetFilterDataProps } from "@nypl/design-system-react-components"
import type {
  Aggregation,
  CollapsedMultiValueAppliedFilters,
  Option,
} from "../../types/filterTypes"
import { mapCollectionToFilterTag } from "../../utils/advancedSearchUtils"

export const buildAppliedFiltersValueArrayWithTagRemoved = (
  tag: TagSetFilterDataProps,
  appliedFiltersWithLabels: Record<string, Option[]>
): Record<string, string[]> => {
  const fieldToUpdate = tag.field
  const doesNotMatchLabelToRemove = (option: Option) =>
    option.label !== tag.label

  const updatedFilters = {} as CollapsedMultiValueAppliedFilters
  for (const field in appliedFiltersWithLabels) {
    if (field !== fieldToUpdate) {
      updatedFilters[field] = appliedFiltersWithLabels[field].map(
        (option: Option) => option.value
      )
    } else {
      // regenerate the selected options for the relevant field by removing only
      // the tag that was selected.
      updatedFilters[field] = appliedFiltersWithLabels[field]
        .filter(doesNotMatchLabelToRemove)
        // only return the value so we can generate the query again
        .map((option: Option) => option.value)
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
        // Subject literals can be combinations of multiple subjects, ie a -- b -- c.
        // We need special handling for when a query is made for a -- b, but
        // aggregations only returns a -- b -- c.
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
        }
      })
    })
    .flat()
}
