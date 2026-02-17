import { isArray, isEmpty, mapObject, forEach } from "underscore"

import { textInputFields as advancedSearchFields } from "./advancedSearchUtils"
import type {
  SearchParams,
  SearchQueryParams,
  SearchFilters,
  Identifiers,
  DiscoverySearchResultsElement,
} from "../types/searchTypes"
import SearchResultsBib from "../models/SearchResultsBib"
import { RESULTS_PER_PAGE } from "../config/constants"
import { collapseMultiValueQueryParams } from "./refineSearchUtils"
import {
  encodeURIComponentWithPeriods,
  getPaginationOffsetStrings,
} from "./appUtils"

/**
 * getSearchResultsHeading
 * Used to generate the search results heading text (Displaying 100 results for keyword "cats")
 * for search results or browse bib results.
 * TODO: Make search query type (i.e. "Keyword") dynamic
 */
export function getSearchResultsHeading(
  searchParams: SearchParams,
  totalResults: number,
  browseOptions?: { slug: string; browseType: string; role?: string }
): string {
  const [resultsStart, resultsEnd] = getPaginationOffsetStrings(
    searchParams.page,
    totalResults,
    RESULTS_PER_PAGE
  )

  const queryDisplayString = browseOptions
    ? ` for ${
        browseOptions.browseType === "subjects"
          ? "Subject Heading"
          : "Author/Contributor"
      } "${browseOptions.slug}${
        browseOptions.role ? `, ${browseOptions.role}` : ""
      }"`
    : buildQueryDisplayString(searchParams)

  return `Displaying ${
    totalResults > RESULTS_PER_PAGE
      ? `${resultsStart}-${resultsEnd}`
      : totalResults.toLocaleString()
  } of${
    totalResults === 10000 ? " over" : ""
  } ${totalResults.toLocaleString()} results${queryDisplayString}`
}

// Shows the final part of the search query string (e.g. "for keyword 'cats'")
function buildQueryDisplayString(searchParams: SearchParams): string {
  const searchFields = advancedSearchFields
    // Lowercase the adv search field labels:
    .map((field) => ({ ...field, label: field.label.toLowerCase() }))
    .concat([
      { name: "journal_title", label: "journal title" },
      { name: "standard_number", label: "standard number" },
      { name: "contributorLiteral", label: "author" },
      { name: "oclc", label: "OCLC" },
      { name: "isbn", label: "ISBN" },
      { name: "issn", label: "ISSN" },
      { name: "lccn", label: "LCCN" },
      { name: "callnumber", label: "call number" },
    ])
  const paramsStringCollection = {}
  const searchParamsObject = {
    ...searchParams,
    ...searchParams.filters,
    ...searchParams.identifiers,
  }

  Object.keys(searchParamsObject).forEach((param) => {
    const displayParam = searchFields.find((field) => field.name === param)
    if (displayParam && searchParamsObject[param]) {
      let label = displayParam.label
      const value = searchParamsObject[param]
      const plural = label === "keyword" && value.indexOf(" ") > -1 ? "s" : ""
      // Special case for the author display string for both
      // the "contributor" search scope and the "contributorLiteral" filter.
      if (label === "author") {
        label = "author/contributor"
      }

      paramsStringCollection[param] = `${label}${plural} "${value}"`
    }
  })

  // If the field is set, i.e. through the search_scope query param,
  // then use that and remove the keyword from the display string.
  // Note: mapQueryToSearchParams sets the search_scope value in the field property.
  if (searchParamsObject.field) {
    delete paramsStringCollection["q"]
  }

  const displayStringArray = Object.values(paramsStringCollection)

  return displayStringArray.length
    ? ` for ${displayStringArray.join(" and ")}`
    : ""
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
            filterQuery += `&filters[${key}][${index}]=${encodeURIComponentWithPeriods(
              filter.value
            )}`
          } else if (typeof filter === "string") {
            filterQuery += `&filters[${key}][${index}]=${encodeURIComponentWithPeriods(
              filter
            )}`
          }
        })
      } else if (val?.value && val.value !== "") {
        filterQuery += `&filters[${key}]=${encodeURIComponentWithPeriods(
          val.value
        )}`
      } else if (val && typeof val === "string") {
        filterQuery += `&filters[${key}]=${encodeURIComponentWithPeriods(val)}`
      }
    })
  }

  return filterQuery
}

/**
 * getSearchQuery
 * Builds a query string from a SearchParams object
 */
export function getSearchQuery(params: SearchParams): string {
  const {
    sortBy = "relevance",
    field = "all",
    order,
    filters = {},
    identifiers = {},
    q,
    page = 1,
  } = params
  const searchKeywordsQuery = encodeURIComponentWithPeriods(q)
  const sortQuery = getSortQuery(sortBy, order)

  const filterQuery = getFilterQuery(filters)
  const fieldQuery = getFieldQuery(field)
  const identifierQuery = getIdentifierQuery(identifiers)
  const pageQuery = page !== 1 ? `&page=${page}` : ""

  const advancedSearchQueryParams = advancedSearchFields
    .map(({ name: advancedSearchParam }) => {
      if (advancedSearchParam === "q") return
      return params[advancedSearchParam]
        ? `&${advancedSearchParam}=${encodeURIComponentWithPeriods(
            params[advancedSearchParam]
          )}`
        : ""
    })
    .join("")

  // if a search_scope is "all", we want to clear the advanced search query params
  // and default to the q param
  const isAdvancedSearchOrAllFields = field.length && field === "all"

  const advancedQuery = isAdvancedSearchOrAllFields
    ? advancedSearchQueryParams
    : ""

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
    format,
    dateFrom,
    dateTo,
  } = reqBody
  return {
    q,
    page,
    contributor,
    title,
    subject,
    filters: {
      format,
      language,
      dateFrom,
      dateTo,
    },
  }
}

/**
 * mapElementsToSearchResultsBibs
 * Maps the DiscoverySearchResultsElement structure from the search results response to an array of SearchResultsBib objects
 */
export function mapElementsToSearchResultsBibs(
  elements: DiscoverySearchResultsElement[]
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
 * mapQueryToSearchParams
 * Maps the SearchQueryParams structure from the request to a SearchParams object, which is expected by fetchSearchResults
 * It also parses the results page number from a string, defaulting to 1 if absent
 */
export function mapQueryToSearchParams({
  q = "",
  search_scope,
  sort_direction,
  page,
  callnumber,
  standard_number,
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
  const filters = collapseMultiValueQueryParams(queryFilters)
  //TODO: can we merge the SearchQueryParams and SearchParams types by renaming some params? e.g. search_scope, sort, sort_direction. Also maybe passing in identifiers so it maches this pattern.
  return {
    q,
    field: search_scope,
    page: page ? parseInt(page) : 1,
    callnumber,
    standard_number,
    contributor,
    title,
    subject,
    // TODO: this is a "catch-all" for journal title and standard number
    // fields but will also update other fields such as title, subject, and
    // contributor. This will override other fields if a value is present.
    // Is this the best way to handle this?
    ...(search_scope && q ? { [search_scope]: q } : {}),
    sortBy: sort,
    order: sort_direction,
    filters: Object.keys(filters).length ? filters : undefined,
    identifiers: hasIdentifiers && {
      issn,
      isbn,
      oclc,
      lccn,
    },
  }
}

/**
 * checkForRedirectOnMatch
 * Given a SearchResultsResponse and a query object (representing a query string)
 * returns an object representing a suitable redirect destination if there is
 * only one result and the query indicates we should redirect on match.
 * Otherwise returns `null`
 */
export function checkForRedirectOnMatch(results, query): object {
  const hasOneResult = results?.results?.totalResults === 1
  if (hasOneResult && query.oclc && query.redirectOnMatch) {
    const matchedBib = results.results.itemListElement[0].result
    return {
      destination: `/bib/${matchedBib.uri}`,
      permanent: false,
    }
  }

  return null
}

export function filtersObjectLength(obj) {
  let total = 0
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      total += obj[key].length
    }
  }
  return total
}
