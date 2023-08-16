import type {
  SearchQueryParams,
  SearchFilters,
  SearchParams,
} from "../types/searchTypes"
import type { DRBParams, DRBQueryParams, DRBFilters } from "../types/drbTypes"
import { DRB_RESULTS_PER_PAGE } from "../config/constants"

const mapSearchFieldToDRBField = {
  all: "keyword",
  contributor: "author",
  standard_number: "standardNumber",
  title: "title",
  subject: "subject",
  date: "date",
}

/**
 * Utility function to strip non-DRB fields from Search Params
 * This is used in the Search page to memoize the DRB params when fields change in the SearchParams (e.g. page).
 * It may also be useful if DRB params diverge from search params in the future.
 */
export function mapSearchParamsToDRBParams({
  searchKeywords,
  field,
  sortBy,
  order,
  selectedFilters,
}: SearchParams): DRBParams {
  return { searchKeywords, field, sortBy, order, selectedFilters }
}

/**
 *  Given a keyword and a search field, format and return a keyword query string expected by the DRB API
 */
function getDRBKeywordQuery(keywords = "*", field = "keyword"): string {
  return `${field}:${keywords}`
}

/**
 *  Given a hash of SearchQueryParams, format and return an advanced field query string expected by the DRB API
 */
function getDRBAdvancedQuery(params: SearchQueryParams): string {
  return ["contributor", "title", "subject"]
    .map((fieldType) => {
      const fieldValue = params[fieldType]
      return (
        fieldValue && `${mapSearchFieldToDRBField[fieldType]}:${fieldValue}`
      )
    })
    .filter((str) => str)
    .join(",")
}

/**
 *  Given a hash of SearchFilters, returns an array of DRBFilters as expected by the DRB API
 */
function mapSearchFiltersToDRBFilters(filters: SearchFilters = {}): DRBFilters {
  let drbFilters = [] as DRBFilters

  if (filters.dateAfter) drbFilters.push(`startYear:${filters.dateAfter}`)
  if (filters.dateBefore) drbFilters.push(`endYear:${filters.dateBefore}`)
  if (filters.language) {
    drbFilters = drbFilters.concat(
      (Array.isArray(filters.language)
        ? filters.language
        : [filters.language]
      ).map((lang) => lang.replace("lang:", "language:"))
    )
  }

  return drbFilters
}

/**
 *  Given a hash of SearchQueryParams, returns a hash representing an equivalent query against DRB API
 */
function mapDRBParamsToDRBQueryParams(params: DRBParams): DRBQueryParams {
  const { searchKeywords, field, sortBy, order, selectedFilters } = params

  const keywordQuery = getDRBKeywordQuery(searchKeywords, field)
  const advancedQuery = getDRBAdvancedQuery(params)

  const mainQuery = keywordQuery + (advancedQuery ? "," : "") + advancedQuery

  const drbQuery: DRBQueryParams = {
    query: [mainQuery],
    page: 1,
    source: "catalog",
  }

  if (sortBy) {
    const sortDirection = order || (sortBy === "date" ? "desc" : "asc")
    drbQuery.sort = [sortBy, sortDirection].join(":")
  }

  drbQuery.size = DRB_RESULTS_PER_PAGE

  const {
    subjectLiteral,
    contributorLiteral,
    language,
    dateAfter,
    dateBefore,
  } = selectedFilters || {}

  // DRB doesn't handle subject or contributor in `filter` param, so handle
  // them separately:
  if (subjectLiteral) {
    drbQuery.query = drbQuery.query.concat(
      (Array.isArray(subjectLiteral) ? subjectLiteral : [subjectLiteral]).map(
        (subject) => ["subject", subject].join(":")
      )
    )
  }
  if (contributorLiteral)
    drbQuery.query.push(["author", contributorLiteral].join(":"))

  // Extract language and date filters for drb `filter` param:
  if (language || dateAfter || dateBefore) {
    drbQuery.filter = mapSearchFiltersToDRBFilters({
      dateAfter,
      dateBefore,
      language,
    })
  }

  return drbQuery
}

/**
 *  Given a hash DRBQueryParams, e.g.
 *    {
 *      query: [ 'keyword:toast', 'subject:snacks' ],
 *      page: 1
 *    }
 *
 *  returns a URI encoded query string representation of the values, e.g.
 *    "query=keyword:toast,subject:snacks&page=1"
 */
export function getQueryStringFromDRBQueryParams(
  params: DRBQueryParams
): string {
  return (
    "?" +
    (params &&
      Object.keys(params)
        .reduce((pairs, key) => {
          // Get array of values for this key
          let values = params[key]
          if (!Array.isArray(values)) values = [values]
          values = values.map(encodeURIComponent)
          return pairs.concat(
            // Join values with ','
            [encodeURIComponent(key), values.join(",")].join("=")
          )
        }, [])
        .join("&"))
  )
}

/**
 * Given a SearchParams hash, return a DRB query string
 */
export function getDRBQueryStringFromSearchParams(
  searchParams: SearchParams
): string {
  const drbParams = mapSearchParamsToDRBParams(searchParams)
  const drbQueryParams = mapDRBParamsToDRBQueryParams(drbParams)
  return getQueryStringFromDRBQueryParams(drbQueryParams)
}
