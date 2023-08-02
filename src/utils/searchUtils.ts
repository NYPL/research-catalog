import type {
  SearchParams,
  SearchQueryParams,
  SearchFilters,
  IdentifierNumbers,
  SearchResultsResponse,
} from "../config/types"

import { RESULTS_PER_PAGE } from "../config/constants"

import {
  isArray as _isArray,
  isEmpty as _isEmpty,
  mapObject as _mapObject,
  forEach as _forEach,
  findWhere as _findWhere,
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
 * getFieldParam
 * Get the search param from the field selected.
 */
const getFieldParam = (field: string = ""): string => {
  if (!field || field.trim() === "all") {
    return ""
  }
  return `&search_scope=${field}`
}

const getIdentifierQuery = (identifierNumbers: IdentifierNumbers) =>
  Object.entries(identifierNumbers)
    .map(([key, value]) => (value ? `&${key}=${value as string}` : ""))
    .join("")

/**
 * getFilterParam
 * Get the search params from the filter values.
 */
const getFilterParam = (filters: SearchFilters) => {
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

/**
 * basicQuery
 * A curry function that will take in a search parameters object and return a function that will
 * overwrite whatever values it needs to overwrite to create the needed API query.
 * @example
 * const apiQueryFunc = basicQuery(this.props);
 * const apiQuery = apiQueryFunc();
 * // apiQuery === 'q='
 * const apiQuery2 = apiQueryFunc({ page: 3 });
 * // apiQuery2 === 'q=&page=3'
 * const apiQuery3 = apiQueryFunc({ page: 3, q: 'hamlet' });
 * // apiQuery3 === 'q=hamlet&page=3'
 */
export const basicQuery = (searchParams: SearchParams = {}) => {
  return ({
    sortBy,
    field,
    selectedFilters,
    searchKeywords,
    contributor,
    title,
    subject,
    page,
    clearTitle,
    clearSubject,
    clearContributor,
    identifierNumbers,
  }: SearchParams) => {
    const sortQuery = getSortQuery(sortBy || searchParams.sortBy)
    const fieldQuery = getFieldParam(field || searchParams.field)
    const filterQuery = getFilterParam(
      selectedFilters || searchParams.selectedFilters
    )
    const identifierQuery = getIdentifierQuery(
      identifierNumbers || searchParams.identifierNumbers
    )
    // `searchKeywords` can be an empty string, so check if it's undefined instead.
    const query =
      searchKeywords !== undefined
        ? searchKeywords
        : searchParams.searchKeywords
    const searchKeywordsQuery = query ? `${encodeURIComponent(query)}` : ""
    let pageQuery =
      searchParams.page && searchParams.page !== "1"
        ? `&page=${searchParams.page}`
        : ""
    pageQuery = page && page !== "1" ? `&page=${page}` : pageQuery
    pageQuery = page === "1" ? "" : pageQuery
    const contributorQuery =
      (contributor || searchParams.contributor) && !clearContributor
        ? `&contributor=${contributor || searchParams.contributor}`
        : ""
    const titleQuery =
      (title || searchParams.title) && !clearTitle
        ? `&title=${title || searchParams.title}`
        : ""
    const subjectQuery =
      (subject || searchParams.subject) && !clearSubject
        ? `&subject=${subject || searchParams.subject}`
        : ""
    const advancedQuery = `${contributorQuery}${titleQuery}${subjectQuery}`

    const completeQuery = `${searchKeywordsQuery}${advancedQuery}${filterQuery}${sortQuery}${fieldQuery}${pageQuery}${identifierQuery}`

    return completeQuery ? `q=${completeQuery}` : ""
  }
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

export const createSelectedFiltersHash = (
  filters: SearchFilters,
  apiFilters: SearchResultsResponse
) => {
  const selectedFilters = {
    materialType: [],
    language: [],
    dateAfter: "",
    dateBefore: "",
    subjectLiteral: [],
  }
  if (!_isEmpty(filters)) {
    _mapObject(filters, (value, key) => {
      let filterObj
      if (key === "dateAfter" || key === "dateBefore") {
        selectedFilters[key] = value
      } else if (key === "subjectLiteral") {
        const subjectLiteralValues = _isArray(value) ? value : [value]
        subjectLiteralValues.forEach((subjectLiteralValue) => {
          selectedFilters[key].push({
            selected: true,
            value: subjectLiteralValue,
            label: subjectLiteralValue,
          })
        })
      } else if (_isArray(value) && value.length) {
        if (!selectedFilters[key]) {
          selectedFilters[key] = []
        }
        _forEach(value, (filterValue) => {
          filterObj = _findWhere(apiFilters.itemListElement, { field: key })
          const foundFilter = _isEmpty(filterObj)
            ? {}
            : _findWhere(filterObj.values, { value: filterValue })

          if (
            foundFilter &&
            !_findWhere(selectedFilters[key], { id: foundFilter.value })
          ) {
            selectedFilters[key].push({
              selected: true,
              value: foundFilter.value,
              label: foundFilter.label || foundFilter.value,
              count: foundFilter.count,
            })
          }
        })
      } else if (typeof value === "string") {
        filterObj = _findWhere(apiFilters.itemListElement, { field: key })
        const foundFilter = _isEmpty(filterObj)
          ? {}
          : _findWhere(filterObj.values, { value })

        if (
          foundFilter &&
          !_findWhere(selectedFilters[key], { id: foundFilter.value })
        ) {
          selectedFilters[key] = [
            {
              selected: true,
              value: foundFilter.value,
              label: foundFilter.label || foundFilter.value,
              count: foundFilter.count,
            },
          ]
        }
      }
    })
  }
  return selectedFilters
}
