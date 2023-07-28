import type { RCPage, searchParams } from "../config/types"

import { isArray, isEmpty, mapObject, forEach } from "underscore"

/**
 * getActivePage(pathname)
 * Returns the Research Catalog page ID for a given pathname.
 * Used for determining the current page for activating menu links and
 * conditionally rendering the Search form.
 */
export const getActivePage = (pathname: string): RCPage => {
  if (pathname === "/") {
    return "search"
  } else if (pathname.includes("subject_headings")) {
    return "shep"
  } else if (pathname.includes("account")) {
    return "account"
  } else {
    return ""
  }
}

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

const getIdentifierQuery = (identifierNumbers: Record<string, string> = {}) =>
  Object.entries(identifierNumbers)
    .map(([key, value]) => (value ? `&${key}=${value}` : ""))
    .join("")

/**
 * getFilterParam
 * Get the search params from the filter values.
 */
const getFilterParam = (filters: Record<string, Record<string, string>>) => {
  let strSearch = ""

  if (!isEmpty(filters)) {
    mapObject(filters, (val, key) => {
      // Property contains an array of its selected filter values:
      if (val?.length && isArray(val)) {
        forEach(val, (filter, index) => {
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
export const basicQuery = (searchParams: searchParams = {}) => {
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
  }: searchParams) => {
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
