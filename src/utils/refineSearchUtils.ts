import type { CollapsedMultiValueAppliedFilters } from "../types/filterTypes"

// Filters are always multivalue query params in the form
// filters[field][index]=value eg filters[format][0]=resourcetypes:aud.
// This method returns an object that maps a field to an array of the values
// provided in the query string with that field called out.
export const collapseMultiValueQueryParams = (
  queryParams: Record<string, any>
): CollapsedMultiValueAppliedFilters => {
  return Object.keys(queryParams)
    .filter((param) => param.includes("filters["))
    .reduce((acc, currentFilter) => {
      const field = currentFilter.split("[")[1].split("]")[0]

      const value = queryParams[currentFilter] ?? ""

      if (acc[field]) acc[field].push(String(value))
      else acc[field] = [String(value)]

      return acc
    }, {} as CollapsedMultiValueAppliedFilters)
}

// This method does the inverse of the one above. Turn an object into a
// multivalue query param string
export const buildFilterQuery = (
  filters: CollapsedMultiValueAppliedFilters
) => {
  return Object.keys(filters).reduce((acc, field) => {
    //const canonicalField = FILTER_ALIASES[field] ?? field

    if (filters[field]?.filter(Boolean).length) {
      filters[field].forEach(
        (value, i) => (acc[`filters[${field}][${i}]`] = value)
      )
    }

    return acc
  }, {})
}
export const getQueryWithoutFiltersOrPage = (filters: object) => {
  return Object.keys(filters).reduce((acc, field) => {
    if (!field.includes("filters") && field !== "page") {
      acc[field] = filters[field]
    }
    return acc
  }, {} as Record<string, any>)
}
