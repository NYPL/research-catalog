import type { Aggregation, Option } from "../types/filterTypes"

// Filters are always multivalue query params in the form
// filters[field][index]=value eg filters[materialType][0]=resourcetypes:aud.
// This method returns an object that maps a field to an array of the values
// provided in the query string with that field called out.
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

// This method does the inverse of the one above. Turn an object into a
// multivalue query param object
export const buildFilterQuery = (filters: Record<string, string[]>) => {
  return Object.keys(filters).reduce((acc, field) => {
    if (filters[field]?.filter((x) => x).length) {
      filters[field].forEach(
        (option, i) => (acc[`filters[${field}][${i}]`] = option)
      )
    }
    return acc
  }, {})
}

export const getQueryWithoutFilters = (filters: object) => {
  return Object.keys(filters).reduce((acc, field) => {
    if (!field.includes("filters")) acc[field] = filters[field]
    return acc
  }, {})
}

// The aggregations from the api response have the label we want to display
// in the filter dialog. The applied filter values parsed from the url only have
// values. Using the filter values, find the label from the aggregations array.
export const addLabelPropAndParseFilters = (
  aggregations: Aggregation[], // from the api response
  appliedFilterValues: Record<string, string[]> // parsed from url query params
): Record<string, Option[]> => {
  const appliedFilterValuesWithLabels = {}
  for (const appliedFilterField in appliedFilterValues) {
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
      // Find the aggregation that corresponds to the filter field we are working on
      const matchingFieldAggregation = aggregations.find(
        ({ field: aggregationField }) => aggregationField === appliedFilterField
      )
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
