import type { Aggregation, Option } from "../types/filterTypes"

export const collapseMultiValueQueryParams = (
  queryParams: object
): Record<string, string[]> => {
  return Object.keys(queryParams)
    .filter((param) => param.includes("filters["))
    .reduce((acc, currentFilter) => {
      const field = currentFilter.split("[")[1].split("]")[0]
      if (acc[field]) acc[field].push(queryParams[currentFilter])
      else acc[field] = [queryParams[currentFilter]]
      return acc
    }, {})
}

export const buildQuery = (filters: Record<string, string[]>) => {
  return Object.keys(filters).reduce((acc, field) => {
    filters[field] && filters[field].length
    filters[field].forEach(
      (option, i) => (acc[`filters[${field}][${i}]`] = option)
    )
    return acc
  }, {})
}

export const getQueryWithoutFilters = (filters: object) => {
  return Object.keys(filters).reduce((acc, field) => {
    if (!field.includes("filters")) acc[field] = filters[field]
    return acc
  }, {})
}

export const addLabelPropAndParseFilters = (
  // from the api response
  aggregations: Aggregation[],
  // parsed from url query params
  appliedFilterValues: Record<string, string[]>
): Record<string, Option[]> => {
  const appliedFilterValuesWithLabels = {}
  for (const appliedFilterField in appliedFilterValues) {
    // Find the aggregation that corresponds to the filter field we are working on
    const matchingFieldAggregation = aggregations.find(
      ({ field: aggregationField }) => aggregationField === appliedFilterField
    )
    appliedFilterValuesWithLabels[appliedFilterField] = appliedFilterValues[
      appliedFilterField
    ].map((filterValue: string): Option => {
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
