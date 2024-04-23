import { isArray, isEmpty, mapObject, forEach } from "underscore"

import { textInputFields } from "./advancedSearchUtils"
import type {
  SearchParams,
  SearchQueryParams,
  SearchFilters,
  Identifiers,
  SearchResultsElement,
  SearchQueryFilters,
} from "../types/searchTypes"
import SearchResultsBib from "../models/SearchResultsBib"
import { RESULTS_PER_PAGE } from "../config/constants"

/**
 * determineFreshSortByQuery
 * Returns true only if the last update to the query was a sort by change.
 * Used to determine whether to focus on the search results header
 */
export const getFreshSortByQuery = (prevUrl: string, currentUrl: string) => {
  if (!prevUrl) return false
  const sortByAndDirection = (query) => {
    const match = query.match(/sort=(.*?)&sort_direction=(.*?)(&|$)/)
    if (match) return [match[1], match[2]]
  }
  const previousSortValues = sortByAndDirection(prevUrl)
  const currentSortValues = sortByAndDirection(currentUrl)
  if (!currentSortValues) return false
  const sortTypeHasChanged = previousSortValues?.[0] !== currentSortValues[0]
  const sortDirectionHasChanged =
    previousSortValues?.[1] !== currentSortValues[1]
  const sortValuesHaveUpdated = sortTypeHasChanged || sortDirectionHasChanged
  return sortValuesHaveUpdated
}

/**
 * getPaginationOffsetStrings
 * Used to generate search results start and end counts on Search Results page
 */
export function getPaginationOffsetStrings(
  page = 1,
  total: number
): [string, string] {
  const offset = RESULTS_PER_PAGE * page - RESULTS_PER_PAGE
  const start = offset + 1
  let end = offset + RESULTS_PER_PAGE
  end = end >= total ? total : end

  return [start.toLocaleString(), end.toLocaleString()]
}

/**
 * getSearchResultsHeading
 * Used to generate the search results heading text (Displaying 100 results for keyword "cats")
 * TODO: Make search query type (i.e. "Keyword") dynamic
 */
export function getSearchResultsHeading(
  searchParams: SearchParams,
  totalResults: number
): string {
  const [resultsStart, resultsEnd] = getPaginationOffsetStrings(
    searchParams.page,
    totalResults
  )
  const queryDisplayString = buildQueryDisplayString(searchParams)

  return `Displaying ${
    totalResults > RESULTS_PER_PAGE
      ? `${resultsStart}-${resultsEnd}`
      : totalResults.toLocaleString()
  } of ${totalResults.toLocaleString()} results ${queryDisplayString}`
}

function buildQueryDisplayString(searchParams: SearchParams): string {
  const params = Object.keys(searchParams)
  return params
    .reduce((displayString, param, i) => {
      const displayParam = textInputFields.find((field) => field.name === param)
      // if it's a param we want to display and it is a populated value
      if (displayParam && searchParams[param]) {
        const label = displayParam.label.toLowerCase()
        const value = searchParams[param]
        const plural = label === "keyword" && value.indexOf(" ") > -1 ? "s" : ""

        displayString += displayString.length ? "and " : "for "
        displayString += `${label}${plural} "${value}" `
      }
      return displayString
    }, "")
    .trim()
}

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
 * getSearchQuery
 * Builds a query string from a SearchParams object
 */
export function getSearchQuery({
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
    page = 1,
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
  return (
    elements
      ?.filter((result) => {
        return !(isEmpty(result) || (result.result && isEmpty(result.result)))
      })
      .map((result) => {
        return new SearchResultsBib(result.result)
      }) || null
  )
}

/* eslint-disable @typescript-eslint/naming-convention */

/**
 * sortOptions
 * The allowed keys for the sort field and their respective labels
 */
export const sortOptions: Record<string, string> = {
  relevance: "Relevance",
  title_asc: "Title (A - Z)",
  title_desc: "Title (Z - A)",
  date_asc: "Date (Old to New)",
  date_desc: "Date (New to Old)",
}

/**
 * mapQueryFiltersToSearchFilters
 * Maps the filter query params to a SearchFilters object
 */
function mapQueryFiltersToSearchFilters(
  filters: SearchQueryFilters
): SearchFilters {
  const searchFilters: SearchFilters = {}

  console.log(filters)
  filters.forEach((filter) => {
    const [key, filterValue] = filter
    // get values in between brackets in filter keys
    const filterKey = key.match(/\[(.*?)]/i)?.[1]

    if (searchFilters[filterKey]) {
      searchFilters[filterKey].push(filterValue)
    } else {
      searchFilters[filterKey] = [filterValue]
    }
  })
  return searchFilters
}

/**
 * mapQueryToSearchParams
 * Maps the SearchQueryParams structure from the request to a SearchParams object, which is expected by fetchResults
 * It also parses the results page number from a string, defaulting to 1 if absent
 */
export function mapQueryToSearchParams({
  q = "",
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
  ...queryFilters
}: SearchQueryParams): SearchParams {
  const hasIdentifiers = issn || isbn || oclc || lccn
  const filters = mapQueryFiltersToSearchFilters(Object.entries(queryFilters))
  return {
    q,
    field: search_scope,
    page: page ? parseInt(page) : 1,
    contributor,
    title,
    subject,
    sortBy: sort,
    order: sort_direction,
    filters,
    identifiers: hasIdentifiers && {
      issn,
      isbn,
      oclc,
      lccn,
    },
  }
}
