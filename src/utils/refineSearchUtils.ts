import type { CollapsedMultiValueAppliedFilters } from "../types/filterTypes"

// Filters are always multivalue query params in the form
// filters[field][index]=value eg filters[format][0]=resourcetypes:aud.
// This method returns an object that maps a field to an array of the values
// provided in the query string with that field called out.
export const collapseMultiValueQueryParams = (
  queryParams: object
): CollapsedMultiValueAppliedFilters => {
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
// multivalue query param string
export const buildFilterQuery = (
  filters: CollapsedMultiValueAppliedFilters
) => {
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
