import { getDRBQueryStringFromSearchParams } from "../../src/utils/drbUtils"
import { DRB_RESULTS_PER_PAGE } from "../../src/config/constants"
import type { SearchParams } from "../../src/types/searchTypes"

/**
 * An effort to avoid brittleness due to potentially variable order in query
 * parameters. This testing util splits query strings into arrays that are
 * compared for matching elements instead of comparing for strict equality of
 * string literals.
 *  */

const queryParamsEquality = (
  test: string,
  queryParamsToConstruct: SearchParams
) => {
  const testQueries = test.substring(1).split("&")
  const constructedQueries = getDRBQueryStringFromSearchParams(
    queryParamsToConstruct
  )
    .substring(1)
    .split("&")
  return (
    testQueries.every((queryParam: string) =>
      constructedQueries.includes(queryParam)
    ) &&
    constructedQueries.every((queryParam) => testQueries.includes(queryParam))
  )
}

describe("researchNowUtils", () => {
  describe("getDRBQueryStringFromSearchParams", () => {
    it("should handle empty query", () => {
      const testQuery = `?query=keyword%3A*&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(queryParamsEquality(testQuery, {})).toBe(true)
    })

    it("should handle simple keyword query", () => {
      const testQuery = `?query=keyword%3Atoast&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(queryParamsEquality(testQuery, { q: "toast" })).toBe(true)
    })

    it("should handle field", () => {
      const testQuery = `?query=title%3Atoast&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(
        queryParamsEquality(testQuery, { q: "toast", field: "title" })
      ).toBe(true)
    })

    it("should handle keyword & subject query", () => {
      const testQuery = `?query=keyword%3Atoast,subject%3ASnacks&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(
        queryParamsEquality(testQuery, {
          q: "toast",
          filters: { subjectLiteral: "Snacks" },
        })
      ).toBe(true)
    })

    it("should handle contributor filter", () => {
      const testQuery = `?query=keyword%3A*,author%3APoe&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(
        queryParamsEquality(testQuery, {
          filters: { contributorLiteral: "Poe" },
        })
      ).toBe(true)
    })

    it("should handle lang filter", () => {
      const testQuery = `?query=keyword%3A*&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}&filter=language%3Aen`
      expect(
        queryParamsEquality(testQuery, { filters: { language: "lang:en" } })
      ).toBe(true)
    })

    it("should handle dateAfter filter", () => {
      const testQuery = `?query=keyword%3A*&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}&filter=startYear%3A2000`
      expect(
        queryParamsEquality(testQuery, { filters: { dateAfter: "2000" } })
      ).toBe(true)
    })

    it("should handle dateBefore filter", () => {
      const testQuery = `?query=keyword%3A*&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}&filter=endYear%3A2020`
      expect(
        queryParamsEquality(testQuery, { filters: { dateBefore: "2020" } })
      ).toBe(true)
    })

    it("should handle dateAfter & dateBefore filter", () => {
      const testQuery = `?query=keyword%3A*&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}&filter=startYear%3A2000,endYear%3A2020`
      expect(
        queryParamsEquality(testQuery, {
          filters: { dateAfter: "2000", dateBefore: "2020" },
        })
      ).toBe(true)
    })

    it("should handle contributor param", () => {
      const testQuery = `?query=keyword%3A*%2Cauthor%3APoe&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(queryParamsEquality(testQuery, { contributor: "Poe" })).toBe(true)
    })

    it("should handle title param", () => {
      const testQuery = `?query=keyword%3A*%2Ctitle%3ARaven&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(queryParamsEquality(testQuery, { title: "Raven" })).toBe(true)
    })

    it("should handle subject param", () => {
      const testQuery = `?query=keyword%3A*%2Csubject%3Acorvids&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(queryParamsEquality(testQuery, { subject: "corvids" })).toBe(true)
    })

    it("should combine query params", () => {
      const testQuery = `?query=keyword%3ARaven%2Cauthor%3APoe%2Csubject%3Acorvids&page=1&source=catalog&size=${DRB_RESULTS_PER_PAGE}`
      expect(
        queryParamsEquality(testQuery, {
          contributor: "Poe",
          subject: "corvids",
          q: "Raven",
        })
      ).toBe(true)
    })
  })
})
