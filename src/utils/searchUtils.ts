import type {
  SearchParams,
  SearchQueryParams,
  SearchFilters,
  IdentifierNumbers,
} from "../types/searchTypes"

import { RESULTS_PER_PAGE } from "../config/constants"

import {
  isArray as _isArray,
  isEmpty as _isEmpty,
  mapObject as _mapObject,
  forEach as _forEach,
} from "underscore"

/**
 * getSortQuery
 * Get the sort type and order and pass it in URL query form.
 */
const getSortQuery = (sortBy: string = ""): string => {
  const reset = sortBy === "relevance"
  let sortQuery = ""

  if (sortBy && !reset) {
    const [sort, order] = sortBy.split("_")
    sortQuery = `&sort=${sort}&sort_direction=${order}`
  }

  return sortQuery
}

/**
 * getFieldQuery
 * Get the search param from the field selected.
 */
const getFieldQuery = (field: string = ""): string => {
  if (!field || field.trim() === "all") {
    return ""
  }
  return `&search_scope=${field}`
}

/**
 * getIdentifierQuery
 * Get the identifier query string from the identifier numbers.
 */
const getIdentifierQuery = (identifierNumbers: IdentifierNumbers) =>
  Object.entries(identifierNumbers)
    .map(([key, value]) => (value ? `&${key}=${value as string}` : ""))
    .join("")

/**
 * getFilterQuery
 * Get the search params from the filter values.
 */
const getFilterQuery = (filters: SearchFilters) => {
  let strSearch = ""

  if (!_isEmpty(filters)) {
    _mapObject(filters, (val, key) => {
      // Property contains an array of its selected filter values:
      if (val?.length && _isArray(val)) {
        _forEach(val, (filter, index) => {
          if (filter.value && filter.value !== "") {
            strSearch += `&filters[${key}][${index}]=${encodeURIComponent(
              filter.value
            )}`
          } else if (typeof filter === "string") {
            strSearch += `&filters[${key}][${index}]=${encodeURIComponent(
              filter
            )}`
          }
        })
      } else if (val?.value && val.value !== "") {
        strSearch += `&filters[${key}]=${encodeURIComponent(val.value)}`
      } else if (val && typeof val === "string") {
        strSearch += `&filters[${key}]=${encodeURIComponent(val)}`
      }
    })
  }

  return strSearch
}

export const getSearchQuery = ({
  sortBy = "relevance",
  field = "all",
  selectedFilters = {},
  identifierNumbers = {},
  searchKeywords,
  contributor,
  title,
  subject,
  page,
  clearTitle,
  clearSubject,
  clearContributor,
}: SearchParams) => {
  const searchKeywordsQuery = searchKeywords
    ? `${encodeURIComponent(searchKeywords)}`
    : ""
  const sortQuery = getSortQuery(sortBy)
  const filterQuery = getFilterQuery(selectedFilters)
  const fieldQuery = getFieldQuery(field)
  const identifierQuery = getIdentifierQuery(identifierNumbers)
  const pageQuery = page && page !== "1" ? `&page=${page}` : ""

  // advanced search query
  const contributorQuery =
    contributor && !clearContributor ? `&contributor=${contributor}` : ""
  const titleQuery = title && !clearTitle ? `&title=${title}` : ""
  const subjectQuery = subject && !clearSubject ? `&subject=${subject}` : ""
  const advancedQuery = `${contributorQuery}${titleQuery}${subjectQuery}`

  const completeQuery = `${searchKeywordsQuery}${advancedQuery}${filterQuery}${sortQuery}${fieldQuery}${pageQuery}${identifierQuery}`

  return completeQuery?.length ? `q=${completeQuery}` : ""
}

/**
 * getReqParams
 * Read each query param from the request object in API route handler and return its value or
 * default value.
 */
export function getSearchParams(query: SearchQueryParams) {
  const page = query.page || "1"
  const perPage = query.per_page || RESULTS_PER_PAGE.toString()
  const q = query.q || ""
  const sort = query.sort || ""
  const order = query.sort_direction || ""
  const sortQuery = query.sort_scope || ""
  const fieldQuery = query.search_scope || ""
  const filters = query.filters || {}

  const {
    contributor,
    title,
    subject,
    issn,
    isbn,
    oclc,
    lccn,
    redirectOnMatch,
  } = query

  return {
    contributor,
    title,
    subject,
    page,
    perPage,
    q,
    sort,
    order,
    sortQuery,
    fieldQuery,
    filters,
    issn,
    isbn,
    oclc,
    lccn,
    redirectOnMatch,
  }
}

// TODO: Refactor filter hash building utility

// export const createSelectedFiltersHash = (
//   filters: SearchFilters,
//   apiFilters: SearchResultsResponse
// ) => {
//   const selectedFilters = {
//     materialType: [],
//     language: [],
//     dateAfter: "",
//     dateBefore: "",
//     subjectLiteral: [],
//   }
//   if (!_isEmpty(filters)) {
//     _mapObject(filters, (value, key) => {
//       let filterObj
//       if (key === "dateAfter" || key === "dateBefore") {
//         selectedFilters[key] = value
//       } else if (key === "subjectLiteral") {
//         const subjectLiteralValues = _isArray(value) ? value : [value]
//         subjectLiteralValues.forEach((subjectLiteralValue) => {
//           selectedFilters[key].push({
//             selected: true,
//             value: subjectLiteralValue,
//             label: subjectLiteralValue,
//           })
//         })
//       } else if (_isArray(value) && value.length) {
//         if (!selectedFilters[key]) {
//           selectedFilters[key] = []
//         }
//         _forEach(value, (filterValue) => {
//           filterObj = _findWhere(apiFilters.itemListElement, { field: key })
//           const foundFilter = _isEmpty(filterObj)
//             ? {}
//             : _findWhere(filterObj.values, { value: filterValue })
//
//           if (
//             foundFilter &&
//             !_findWhere(selectedFilters[key], { id: foundFilter.value })
//           ) {
//             selectedFilters[key].push({
//               selected: true,
//               value: foundFilter.value,
//               label: foundFilter.label || foundFilter.value,
//               count: foundFilter.count,
//             })
//           }
//         })
//       } else if (typeof value === "string") {
//         filterObj = _findWhere(apiFilters.itemListElement, { field: key })
//         const foundFilter = _isEmpty(filterObj)
//           ? {}
//           : _findWhere(filterObj.values, { value })
//
//         if (
//           foundFilter &&
//           !_findWhere(selectedFilters[key], { id: foundFilter.value })
//         ) {
//           selectedFilters[key] = [
//             {
//               selected: true,
//               value: foundFilter.value,
//               label: foundFilter.label || foundFilter.value,
//               count: foundFilter.count,
//             },
//           ]
//         }
//       }
//     })
//   }
//   return selectedFilters
// }
