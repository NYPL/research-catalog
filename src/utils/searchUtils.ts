import type {
  SearchParams,
  QueryParams,
  SearchFilters,
  IdentifierNumbers,
} from "../types/searchTypes"

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
function getSortQuery(sortBy: string = "", order: string = ""): string {
  const reset = sortBy === "relevance"
  let sortQuery = ""

  if (sortBy?.length && !reset) {
    sortQuery = `&sort=${sortBy}&sort_direction=${order}`
  }

  return sortQuery
}

/**
 * getFieldQuery
 * Get the search param from the field selected.
 */
function getFieldQuery(field: string = ""): string {
  if (!field || field.trim() === "all") {
    return ""
  }
  return `&search_scope=${field}`
}

/**
 * getIdentifierQuery
 * Get the identifier query string from the identifier numbers.
 */
function getIdentifierQuery(identifierNumbers: IdentifierNumbers): string {
  return Object.entries(identifierNumbers)
    .map(([key, value]) => (value ? `&${key}=${value as string}` : ""))
    .join("")
}

/**
 * getFilterQuery
 * Get the search params from the filter values.
 */
function getFilterQuery(filters: SearchFilters) {
  let filterQuery = ""

  if (!_isEmpty(filters)) {
    _mapObject(filters, (val, key) => {
      // Property contains an array of its selected filter values:
      if (val?.length && _isArray(val)) {
        _forEach(val, (filter, index) => {
          if (filter.value && filter.value !== "") {
            filterQuery += `&filters[${key}][${index}]=${encodeURIComponent(
              filter.value
            )}`
          } else if (typeof filter === "string") {
            filterQuery += `&filters[${key}][${index}]=${encodeURIComponent(
              filter
            )}`
          }
        })
      } else if (val?.value && val.value !== "") {
        filterQuery += `&filters[${key}]=${encodeURIComponent(val.value)}`
      } else if (val && typeof val === "string") {
        filterQuery += `&filters[${key}]=${encodeURIComponent(val)}`
      }
    })
  }

  return filterQuery
}

export function getQueryString({
  sortBy = "relevance",
  field = "all",
  order,
  selectedFilters = {},
  identifierNumbers = {},
  searchKeywords,
  contributor,
  title,
  subject,
  page = "1",
}: SearchParams): string {
  const searchKeywordsQuery = encodeURIComponent(searchKeywords)
  const sortQuery = getSortQuery(sortBy, order)

  const filterQuery = getFilterQuery(selectedFilters)
  const fieldQuery = getFieldQuery(field)
  const identifierQuery = getIdentifierQuery(identifierNumbers)
  const pageQuery = page !== "1" ? `&page=${page}` : ""

  // advanced search query
  const contributorQuery = contributor ? `&contributor=${contributor}` : ""
  const titleQuery = title ? `&title=${title}` : ""
  const subjectQuery = subject ? `&subject=${subject}` : ""
  const advancedQuery = `${contributorQuery}${titleQuery}${subjectQuery}`

  const completeQuery = `${searchKeywordsQuery}${advancedQuery}${filterQuery}${sortQuery}${fieldQuery}${pageQuery}${identifierQuery}`

  return completeQuery?.length ? `q=${completeQuery}` : ""
}

/**
 * mapQueryToSearchParams
 * Maps the query param structure from the request to a SearchParams object, which is expected by the fetch helper
 */
export function mapQueryToSearchParams({
  q,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  search_scope,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  sort_direction,
  page,
  contributor,
  title,
  subject,
  sort,
  issn,
  isbn,
  oclc,
  lccn,
  redirectOnMatch,
}: QueryParams): SearchParams {
  return {
    searchKeywords: q,
    field: search_scope,
    page,
    contributor,
    title,
    subject,
    sortBy: sort,
    order: sort_direction,
    identifierNumbers: {
      issn,
      isbn,
      oclc,
      lccn,
      redirectOnMatch,
    },
  }
}
