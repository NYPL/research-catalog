import { isArray, isEmpty, mapObject, forEach } from "underscore"

import type {
  SearchParams,
  SearchQueryParams,
  SearchFilters,
  Identifiers,
  SearchResultsElement,
} from "../types/searchTypes"
import SearchResultsBib from "../models/SearchResultsBib"

/**
 * getSortQuery
 * Get the sort type and order and format into query param snippet.
 */
function getSortQuery(sortBy = "", order = ""): string {
  const reset = sortBy === "relevance"
  let sortQuery = ""
  const sortDirectionQuery = order === "" ? "" : `&sort_direction=${order}`

  if (sortBy?.length && !reset) {
    sortQuery = `&sort=${sortBy}${sortDirectionQuery}`
  }

  return sortQuery
}

/**
 * getFieldQuery
 * Get the search param from the field selected.
 */
function getFieldQuery(field = ""): string {
  if (!field || field.trim() === "all") {
    return ""
  }
  return `&search_scope=${field}`
}

/**
 * getIdentifierQuery
 * Get the identifier query string from the identifier numbers.
 */
function getIdentifierQuery(identifiers: Identifiers): string {
  return Object.entries(identifiers)
    .map(([key, value]) => (value ? `&${key}=${value as string}` : ""))
    .join("")
}

/**
 * getFilterQuery
 * Get the search params from the filter values.
 */
function getFilterQuery(filters: SearchFilters) {
  let filterQuery = ""

  if (!isEmpty(filters)) {
    mapObject(filters, (val, key) => {
      // Property contains an array of its selected filter values:
      if (val?.length && isArray(val)) {
        forEach(val, (filter, index) => {
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

/**
 * getQueryString
 * Builds a query string from a SearchParams object
 */
export function getQueryString({
  sortBy = "relevance",
  field = "all",
  order,
  filters = {},
  identifiers = {},
  q,
  contributor,
  title,
  subject,
  page = 1,
}: SearchParams): string {
  const searchKeywordsQuery = encodeURIComponent(q)
  const sortQuery = getSortQuery(sortBy, order)

  const filterQuery = getFilterQuery(filters)
  const fieldQuery = getFieldQuery(field)
  const identifierQuery = getIdentifierQuery(identifiers)
  const pageQuery = page !== 1 ? `&page=${page}` : ""

  // advanced search query
  const contributorQuery = contributor ? `&contributor=${contributor}` : ""
  const titleQuery = title ? `&title=${title}` : ""
  const subjectQuery = subject ? `&subject=${subject}` : ""
  const advancedQuery = `${contributorQuery}${titleQuery}${subjectQuery}`

  const completeQuery = `${searchKeywordsQuery}${advancedQuery}${filterQuery}${sortQuery}${fieldQuery}${pageQuery}${identifierQuery}`

  return completeQuery?.length ? `?q=${completeQuery}` : ""
}

/**
 * mapRequestBodyToSearchParams
 * Maps the POST request body from an JS disabled advanced search to a SearchParams object
 */
export function mapRequestBodyToSearchParams(
  reqBody: SearchParams & SearchFilters
): SearchParams {
  const {
    q,
    page,
    contributor,
    title,
    subject,
    language,
    materialType,
    dateAfter,
    dateBefore,
  } = reqBody
  return {
    q,
    page,
    contributor,
    title,
    subject,
    filters: {
      materialType,
      language,
      dateAfter,
      dateBefore,
    },
  }
}

/**
 * mapElementsToSearchResultsBibs
 * Maps the SearchResultsElement structure from the search results response to an array of SearchResultsBib objects
 */
export function mapElementsToSearchResultsBibs(
  elements: SearchResultsElement[]
): SearchResultsBib[] | null {
  return elements
    .filter((result) => {
      return !(isEmpty(result) || (result.result && isEmpty(result.result)))
    })
    .map((result) => {
      return new SearchResultsBib(result.result)
    })
}

/* eslint-disable @typescript-eslint/naming-convention */

/**
 * mapQueryToSearchParams
 * Maps the SearchQueryParams structure from the request to a SearchParams object, which is expected by fetchResults
 */
export function mapQueryToSearchParams({
  q,
  search_scope,
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
  filters,
}: SearchQueryParams): SearchParams {
  return {
    q,
    field: search_scope,
    page,
    contributor,
    title,
    subject,
    sortBy: sort,
    order: sort_direction,
    filters,
    identifiers: {
      issn,
      isbn,
      oclc,
      lccn,
    },
  }
}
