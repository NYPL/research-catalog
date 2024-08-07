import { filter } from "underscore"
import AppliedFilters from "../components/SearchFilters/AppliedFilters"
import type { CollapsedMultiValueAppliedFilters } from "../types/filterTypes"

// Filters are always multivalue query params in the form
// filters[field][index]=value eg filters[materialType][0]=resourcetypes:aud.
// This method returns an object that maps a field to an array of the values
// provided in the query string with that field called out.
export const collapseMultiValueQueryParams = (
  queryParams: object
): CollapsedMultiValueAppliedFilters => {
  const collapsedFilters = Object.keys(queryParams)
    .filter(
      (param) =>
        param.includes("filters[") && !param.includes("holdingLocation")
    )
    .reduce((acc, currentFilter) => {
      const field = currentFilter.split("[")[1].split("]")[0]
      if (acc[field]) acc[field].push(queryParams[currentFilter])
      else acc[field] = [queryParams[currentFilter]]
      return acc
    }, {})

  const holdingLocations = collapseHoldingLocations(queryParams)
  if (holdingLocations) collapsedFilters["holdingLocations"] = holdingLocations
  return collapsedFilters
}
export const collapseHoldingLocations = (queryParams) => {
  const sasb = { accessed: false, locations: "loc:mal82,loc:mal92" }
  const sc = { accessed: false, locations: "loc:scff2,loc:scff3" }
  Object.keys(queryParams)
    .filter(
      (param) => param.includes("filters[") && param.includes("holdingLocation")
    )
    .map((currentFilter) => {
      const paramValue = queryParams[currentFilter]
      if (paramValue.includes("sc")) sc.accessed = true
      if (paramValue.includes("mal")) sasb.accessed = true
    })
  const collapsedLocations = [sc, sasb]
    .filter(({ accessed }) => accessed)
    .map(({ locations }) => locations)
  return collapsedLocations.length ? collapsedLocations : null
}

// This method does the inverse of the one above. Turn an object into a
// multivalue query param string
export const buildFilterQuery = (
  filters: CollapsedMultiValueAppliedFilters
) => {
  return Object.keys(filters).reduce((acc, field) => {
    if (
      filters[field]?.filter((x) => x).length &&
      field !== "holdingLocation"
    ) {
      filters[field].forEach(
        (option, i) => (acc[`filters[${field}][${i}]`] = option)
      )
    }
    return acc
  }, {})
}

export const buildHoldingLocationFilters = (holdingLocations: string[]) => {
  return holdingLocations
    ?.join(",")
    .split(",")
    .reduce((acc, location, i) => {
      acc[`filters[holdingLocation][${i}]`] = location
      return acc
    }, {})
}

export const getQueryWithoutFilters = (filters: object) => {
  return Object.keys(filters).reduce((acc, field) => {
    if (!field.includes("filters")) acc[field] = filters[field]
    return acc
  }, {})
}
