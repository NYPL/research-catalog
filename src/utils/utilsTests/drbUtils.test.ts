import {
  getDRBKeywordQuery,
  getDRBAdvancedQuery,
  mapSearchFiltersToDRBFilters,
  mapSearchParamsToDRBQueryParams,
  getQueryStringFromDRBQueryParams,
  getDRBQueryStringFromSearchParams,
  mapWorksToDRBResults,
  getAuthorURL,
} from "../drbUtils"
import { DRB_RESULTS_PER_PAGE } from "../../config/constants"
import { queryParamsEquality } from "../../../__test__/helpers/searchHelpers"

const checkQueryParamsEquality = queryParamsEquality(
  getDRBQueryStringFromSearchParams
)

describe("drbUtils", () => {
  describe("getDRBKeywordQuery", () => {
    it("should handle empty keyword", () => {
      expect(getDRBKeywordQuery()).toBe("keyword:*")
    })

    it("should handle only keywords argument", () => {
      expect(getDRBKeywordQuery("toast")).toBe("keyword:toast")
    })

    it("should handle keywords and field arguments", () => {
      expect(getDRBKeywordQuery("toast", "title")).toBe("title:toast")
    })
  })

  describe("getDRBAdvancedQuery", () => {
    it("should handle empty params", () => {
      expect(getDRBAdvancedQuery()).toBe("")
    })

    it("should handle contributor param", () => {
      expect(getDRBAdvancedQuery({ contributor: "Poe" })).toBe("author:Poe")
    })

    it("should handle title param", () => {
      expect(getDRBAdvancedQuery({ title: "Raven" })).toBe("title:Raven")
    })

    it("should handle subject param", () => {
      expect(getDRBAdvancedQuery({ subject: "corvids" })).toBe(
        "subject:corvids"
      )
    })

    it("should combine params", () => {
      expect(
        getDRBAdvancedQuery({
          contributor: "Poe",
          subject: "corvids",
          title: "Raven",
        })
      ).toBe("author:Poe,title:Raven,subject:corvids")
    })
  })

  describe("mapSearchFiltersToDRBFilters", () => {
    it("should handle empty filters", () => {
      expect(mapSearchFiltersToDRBFilters()).toEqual([])
    })

    it("should handle dateAfter filter", () => {
      expect(mapSearchFiltersToDRBFilters({ dateAfter: "2000" })).toEqual([
        "startYear:2000",
      ])
    })

    it("should handle dateBefore filter", () => {
      expect(mapSearchFiltersToDRBFilters({ dateBefore: "2020" })).toEqual([
        "endYear:2020",
      ])
    })

    it("should handle dateAfter & dateBefore filter", () => {
      expect(
        mapSearchFiltersToDRBFilters({
          dateAfter: "2000",
          dateBefore: "2020",
        })
      ).toEqual(["startYear:2000", "endYear:2020"])
    })

    it("should handle language filter", () => {
      expect(mapSearchFiltersToDRBFilters({ language: "lang:en" })).toEqual([
        "language:en",
      ])
    })

    it("should handle multiple language filters", () => {
      expect(
        mapSearchFiltersToDRBFilters({ language: ["lang:en", "lang:fr"] })
      ).toEqual(["language:en", "language:fr"])
    })
  })

  describe("mapSearchParamsToDRBQueryParams", () => {
    it("should handle empty params", () => {
      expect(mapSearchParamsToDRBQueryParams()).toEqual({
        query: ["keyword:*"],
        page: 1,
        source: "catalog",
        size: DRB_RESULTS_PER_PAGE,
      })
    })

    it("should handle field", () => {
      expect(
        mapSearchParamsToDRBQueryParams({ q: "toast", field: "title" })
      ).toEqual({
        query: ["title:toast"],
        page: 1,
        source: "catalog",
        size: DRB_RESULTS_PER_PAGE,
      })
    })

    it("should handle keyword & subject query", () => {
      expect(
        mapSearchParamsToDRBQueryParams({
          q: "toast",
          filters: { subjectLiteral: "Snacks" },
        })
      ).toEqual({
        query: ["keyword:toast", "subject:Snacks"],
        page: 1,
        source: "catalog",
        size: DRB_RESULTS_PER_PAGE,
      })
    })

    it("should handle contributor filter", () => {
      expect(
        mapSearchParamsToDRBQueryParams({
          filters: { contributorLiteral: "Poe" },
        })
      ).toEqual({
        query: ["keyword:*", "author:Poe"],
        page: 1,
        source: "catalog",
        size: DRB_RESULTS_PER_PAGE,
      })
    })

    it("should handle lang filter", () => {
      expect(
        mapSearchParamsToDRBQueryParams({
          filters: { language: "lang:en" },
        })
      ).toEqual({
        query: ["keyword:*"],
        page: 1,
        source: "catalog",
        size: DRB_RESULTS_PER_PAGE,
        filter: ["language:en"],
      })
    })
    it("should handle sortBy", () => {
      expect(
        mapSearchParamsToDRBQueryParams({
          sortBy: "title",
        })
      ).toEqual({
        query: ["keyword:*"],
        page: 1,
        source: "catalog",
        size: DRB_RESULTS_PER_PAGE,
        sort: "title:asc",
      })
    })
  })

  describe("getQueryStringFromDRBQueryParams", () => {
    it("should handle field", () => {
      expect(
        getQueryStringFromDRBQueryParams({
          query: ["title:toast"],
          page: 1,
          source: "catalog",
          size: DRB_RESULTS_PER_PAGE,
        })
      ).toBe("?query=title%3Atoast&page=1&source=catalog&size=3")
    })

    it("should handle keyword & subject query", () => {
      expect(
        getQueryStringFromDRBQueryParams({
          query: ["keyword:toast", "subject:Snacks"],
          page: 1,
          source: "catalog",
        })
      ).toBe("?query=keyword%3Atoast,subject%3ASnacks&page=1&source=catalog")
    })

    it("should handle lang filter", () => {
      expect(
        getQueryStringFromDRBQueryParams({
          query: ["keyword:*"],
          page: 1,
          source: "catalog",
          filter: ["language:en"],
        })
      ).toBe("?query=keyword%3A*&page=1&source=catalog&filter=language%3Aen")
    })

    it("should handle sortBy", () => {
      expect(
        getQueryStringFromDRBQueryParams({
          query: ["keyword:*"],
          page: 1,
          source: "catalog",
          sort: "title:asc",
        })
      ).toBe("?query=keyword%3A*&page=1&source=catalog&sort=title%3Aasc")
    })
  })

  describe("getDRBQueryStringFromSearchParams", () => {
    it("should handle empty query", () => {
      const testQuery = `?query=keyword%3A*&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(checkQueryParamsEquality(testQuery, {})).toBe(true)
    })

    it("should handle simple keyword query", () => {
      const testQuery = `?query=keyword%3Atoast&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(checkQueryParamsEquality(testQuery, { q: "toast" })).toBe(true)
    })

    it("should handle field", () => {
      const testQuery = `?query=title%3Atoast&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(
        checkQueryParamsEquality(testQuery, { q: "toast", field: "title" })
      ).toBe(true)
    })

    it("should handle keyword & subject query", () => {
      const testQuery = `?query=keyword%3Atoast,subject%3ASnacks&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(
        checkQueryParamsEquality(testQuery, {
          q: "toast",
          filters: { subjectLiteral: "Snacks" },
        })
      ).toBe(true)
    })

    it("should handle contributor filter", () => {
      const testQuery = `?query=keyword%3A*,author%3APoe&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(
        checkQueryParamsEquality(testQuery, {
          filters: { contributorLiteral: "Poe" },
        })
      ).toBe(true)
    })

    it("should handle lang filter", () => {
      const testQuery = `?query=keyword%3A*&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}&filter=language%3Aen`
      expect(
        checkQueryParamsEquality(testQuery, {
          filters: { language: "lang:en" },
        })
      ).toBe(true)
    })

    it("should handle dateAfter filter", () => {
      const testQuery = `?query=keyword%3A*&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}&filter=startYear%3A2000`
      expect(
        checkQueryParamsEquality(testQuery, { filters: { dateAfter: "2000" } })
      ).toBe(true)
    })

    it("should handle dateBefore filter", () => {
      const testQuery = `?query=keyword%3A*&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}&filter=endYear%3A2020`
      expect(
        checkQueryParamsEquality(testQuery, { filters: { dateBefore: "2020" } })
      ).toBe(true)
    })

    it("should handle dateAfter & dateBefore filter", () => {
      const testQuery = `?query=keyword%3A*&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}&filter=startYear%3A2000,endYear%3A2020`
      expect(
        checkQueryParamsEquality(testQuery, {
          filters: { dateAfter: "2000", dateBefore: "2020" },
        })
      ).toBe(true)
    })

    it("should handle contributor param", () => {
      const testQuery = `?query=keyword%3A*%2Cauthor%3APoe&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(checkQueryParamsEquality(testQuery, { contributor: "Poe" })).toBe(
        true
      )
    })

    it("should handle title param", () => {
      const testQuery = `?query=keyword%3A*%2Ctitle%3ARaven&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(checkQueryParamsEquality(testQuery, { title: "Raven" })).toBe(true)
    })

    it("should handle subject param", () => {
      const testQuery = `?query=keyword%3A*%2Csubject%3Acorvids&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(checkQueryParamsEquality(testQuery, { subject: "corvids" })).toBe(
        true
      )
    })

    it("should combine query params", () => {
      const testQuery = `?query=keyword%3ARaven%2Cauthor%3APoe%2Csubject%3Acorvids&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(
        checkQueryParamsEquality(testQuery, {
          contributor: "Poe",
          subject: "corvids",
          q: "Raven",
        })
      ).toBe(true)
    })
  })

  describe("mapWorksToDRBResults", () => {
    it("should handle empty works", () => {
      expect(mapWorksToDRBResults()).toEqual(null)
    })

    it("should handle works", () => {
      expect(
        mapWorksToDRBResults([
          {},
          {
            title: "The Raven",
            uuid: "123",
            editions: [],
            authors: [{ name: "Poe" }],
            agents: [],
          },
          {
            title: "Some other work without uuid",
          },
        ])
      ).toEqual([
        {
          title: "The Raven",
          id: "123",
          editions: [],
          authors: [{ name: "Poe" }],
        },
        {
          authors: undefined,
          editions: [],
          id: undefined,
          title: "Some other work without uuid",
        },
      ])
    })
  })

  describe("getAuthorURL", () => {
    it("should handle empty author", () => {
      expect(getAuthorURL()).toBe("")
    })

    it("should handle author name", () => {
      expect(
        getAuthorURL({
          name: "Poe",
          roles: ["some role"],
        })
      ).toBe(
        "http://sfr-front-end-development.us-east-1.elasticbeanstalk.com/search?source=catalog&query=author:Poe"
      )
    })
  })
})
