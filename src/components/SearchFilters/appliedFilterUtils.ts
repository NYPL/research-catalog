import type { TagSetFilterDataProps } from "@nypl/design-system-react-components"
import type {
  Aggregation,
  CollapsedMultiValueAppliedFilters,
  Option,
} from "../../types/filterTypes"

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
    // There are some filters which don't return aggregations and are not used
    // for applied filter fields (yet). This is mainly the unsupported holding
    // location filter (eg filters[holdingLocation][0]=loc:scff2), which is
    // used by devs to assist QA. See line 69 for explanation of date exclusion.
    if (!matchingFieldAggregation && !appliedFilterField.includes("date"))
      continue
    appliedFilterValuesWithLabels[appliedFilterField] = appliedFilterValues[
      appliedFilterField
    ].map((filterValue: string): Option => {
      // dateBefore and dateAfter fields are not based on
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
      // Find the option with the same value, so we can eventually display the label
      const matchingOption = matchingFieldAggregation.values.find(
        (option: Option) => option.value === filterValue
      )
      return matchingOption
    })
  }
  delete appliedFilterValuesWithLabels["q"]
  return appliedFilterValuesWithLabels
}

export const buildTagsetData = (
  appliedFiltersWithLabels: Record<string, Option[]>
) => {
  const appliedFilterFields = Object.keys(appliedFiltersWithLabels)
  return (
    appliedFilterFields
      .map((field: string) => {
        const appliedFiltersWithLabelsPerField = appliedFiltersWithLabels[field]
        // HOTFIX 5/9/24 - this is a temporary fix to resolve a 500 error on production caused by certain combinations of filters. Discovery API is bumping off certain resourcetypes from the aggregations.
        // Specifically on this query: local.nypl.org:8080/research/research-catalog/search?q=pop&filters[materialType][0]=resourcetypes%3Acar&filters[materialType][1]=resourcetypes%3Amul&filters[materialType][2]=resourcetypes%3Acar&filters[materialType][3]=resourcetypes%3Aaud&filters[materialType][4]=resourcetypes%3Anot&filters[materialType][5]=resourcetypes%3Amix&filters[materialType][6]=resourcetypes%3Amul&filters[materialType][7]=resourcetypes%3Amov&filters[language][0]=lang%3Aeng&filters[language][1]=lang%3Ager&filters[language][2]=lang%3Akor&filters[language][3]=lang%3Afre&filters[subjectLiteral][0]=Pop+music&filters[subjectLiteral][1]=Popular+music&filters[subjectLiteral][2]=Music+--+Social+aspects.&filters[subjectLiteral][3]=Pop+art+--+United+States.&filters[subjectLiteral][4]=Art%2C+Modern+--+20th+century+--+Exhibitions.&filters[subjectLiteral][5]=Popular+music+--+United+States+--+History+and+criticism.&filters[subjectLiteral][6]=Manners+and+customs
        // resourcetype:car and resourcetype:mul are not returned in the aggregations.
        // TODO: Find the root cause of this issue and remove this override
        if (appliedFiltersWithLabelsPerField.some((filter) => !filter))
          return null
        return appliedFiltersWithLabelsPerField.map((filter: Option) => {
          return {
            id: field + "-" + filter?.label,
            label: filter?.label,
            field,
          }
        })
      })
      // HOTFIX 5/9/24
      // See comment above
      .filter((filterArr) => !!filterArr)
      .flat()
  )
}
