import type {
  SearchQueryParams,
  SearchFilters,
  SearchParams,
} from "../types/searchTypes"
import type { DRBQueryParams, DRBFilters } from "../types/drbTypes"

const searchFieldToDRBFieldMap = {
  all: "keyword",
  contributor: "author",
  standard_number: "standardNumber",
  title: "title",
  subject: "subject",
  date: "date",
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
        fieldValue && `${searchFieldToDRBFieldMap[fieldType]}:${fieldValue}`
      )
    })
    .filter((str) => str)
    .join(",")
}

/**
 *  Given a hash of SearchFilters, returns an array of DRBFilters as expected by the DRB API
 */
const mapSearchFiltersToDRBFilters = (
  filters: SearchFilters = {}
): DRBFilters => {
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
export function mapSearchQueryParamsToDRBQueryParams(
  params: SearchQueryParams
): DRBQueryParams {
  const { q, search_scope, sort, sort_direction, filters, per_page } = params

  const keywordQuery = getDRBKeywordQuery(q, search_scope)
  const advancedQuery = getDRBAdvancedQuery(params)

  const mainQuery = keywordQuery + (advancedQuery ? "," : "") + advancedQuery

  const drbQuery: DRBQueryParams = {
    query: [mainQuery],
    page: 1,
    source: "catalog",
  }

  if (sort) {
    const sortDirection = sort_direction || (sort === "date" ? "desc" : "asc")
    drbQuery.sort = [sort, sortDirection].join(":")
  }

  if (per_page) drbQuery.size = per_page

  const {
    subjectLiteral,
    contributorLiteral,
    language,
    dateAfter,
    dateBefore,
  } = filters || {}

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
export function getQueryStringFromDRBParams(params: DRBQueryParams): string {
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
  const drbParams = mapSearchQueryParamsToDRBQueryParams(searchParams)
  return getQueryStringFromDRBParams(drbParams)
}
