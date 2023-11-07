import {
  getQueryString,
  mapQueryToSearchParams,
  mapRequestBodyToSearchParams,
} from "../searchUtils"
import { queryParamsEquality } from "../../../__test__/helpers/searchHelpers"

const checkQueryParamsEquality = queryParamsEquality(getQueryString)

describe("searchUtils", () => {
  describe("getQueryString", () => {
    it("constructs a basic query", () => {
      const testQuery =
        "?q=shel%20silverstein&search_scope=contributor&sort=datePublished&sort_direction=asc"
      expect(
        checkQueryParamsEquality(testQuery, {
          q: "shel silverstein",
          field: "contributor",
          sortBy: "datePublished",
          order: "asc",
        })
      ).toBe(true)
    })
  })
  describe("mapQueryToSearchParams", () => {
    it("should consolidate identifiers, change some keys, and initializes the page number to 1", () => {
      expect(
        mapQueryToSearchParams({
          issn: "123",
          isbn: "456",
          search_scope: "contributor",
          sort_direction: "asc",
          sort: "spaghetti",
        })
      ).toEqual({
        identifiers: {
          issn: "123",
          isbn: "456",
        },
        page: 1,
        field: "contributor",
        order: "asc",
        sortBy: "spaghetti",
      })
    })
    it("parses the page number query string value into a number", () => {
      expect(
        mapQueryToSearchParams({
          page: "2",
        })
      ).toEqual({
        page: 2,
      })
    })
  })
  describe("mapRequestBodyToSearchParams", () => {
    it("combines filters", () => {
      const params = mapRequestBodyToSearchParams({
        q: "spaghetti",
        language: "igbo",
        materialType: "scroll",
        dateAfter: "1900",
        dateBefore: "1902",
      })
      expect(params).toEqual({
        q: "spaghetti",
        page: 1,
        filters: {
          language: "igbo",
          materialType: "scroll",
          dateAfter: "1900",
          dateBefore: "1902",
        },
      })
    })
  })
})
