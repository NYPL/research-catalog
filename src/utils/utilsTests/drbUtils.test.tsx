import { getDRBQueryStringFromSearchParams } from "../drbUtils"
import { DRB_RESULTS_PER_PAGE } from "../../config/constants"
import { queryParamsEquality } from "../../../__test__/helpers/searchHelpers"

const checkQueryParamsEquality = queryParamsEquality(
  getDRBQueryStringFromSearchParams
)

describe("researchNowUtils", () => {
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
})
