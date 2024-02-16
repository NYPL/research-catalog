import type { SearchFilters, SearchParams } from "../types/searchTypes"
import type {
  DRBQueryParams,
  DRBFilters,
  DRBWork,
  Author,
  Agent,
} from "../types/drbTypes"
import DRBResult from "../models/DRBResult"
import { DRB_RESULTS_PER_PAGE, SOURCE_PARAM } from "../config/constants"
import { isEmpty } from "underscore"
import { appConfig } from "../config/config"

const mapSearchFieldToDRBField = {
  all: "keyword",
  contributor: "author",
  standard_number: "standardNumber",
  title: "title",
  subject: "subject",
  date: "date",
}

/**
 * Given a keyword and a search field, format and return a keyword query
 * string expected by the DRB API
 */
export function getDRBKeywordQuery(keywords = "*", field = "keyword"): string {
  return `${field}:${keywords}`
}

/**
 * Given a hash of SearchQueryParams, format and return an advanced field
 * query string expected by the DRB API
 */
export function getDRBAdvancedQuery(params: SearchParams = {}): string {
  if (isEmpty(params)) return ""

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
 * Given a hash of SearchFilters, returns an array of DRBFilters
 * as expected by the DRB API
 */
export function mapSearchFiltersToDRBFilters(
  filters: SearchFilters = {}
): DRBFilters {
  let drbFilters: DRBFilters = []

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
 * Given a hash of SearchParams, returns a hash representing
 * an equivalent query against DRB API
 */
export function mapSearchParamsToDRBQueryParams(
  params: SearchParams = {}
): DRBQueryParams {
  const { q, field, sortBy, order, filters } = params

  const keywordQuery = getDRBKeywordQuery(q, field)
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
 * Given a SearchParams hash, return a DRB query string.
 */
export function getDRBQueryStringFromSearchParams(
  searchParams: SearchParams
): string {
  const drbQueryParams = mapSearchParamsToDRBQueryParams(searchParams)
  return getQueryStringFromDRBQueryParams(drbQueryParams)
}

export function mapWorksToDRBResults(works?: DRBWork[]): DRBResult[] | null {
  if (!works) return null
  return works
    .filter((work: DRBWork) => {
      return !!(!isEmpty(work) || work.uuid || work.title)
    })
    .map((work: DRBWork) => {
      return new DRBResult(work)
    })
}

export const readOnlineMediaTypes = [
  "application/epub+xml",
  "application/webpub+json",
  "text/html",
]
export const downloadMediaTypes = ["application/epub+zip", "application/pdf"]

export function getAuthorURL(author: Author | Agent = { name: "" }) {
  if (!author.name) return ""
  return `${
    appConfig.apiEndpoints.drbFrontEnd[appConfig.environment]
  }/search${SOURCE_PARAM}&query=author:${author.name}`
}
