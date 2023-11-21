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
    it("should consolidate identifiers and change some keys", () => {
      expect(
        mapQueryToSearchParams({
          issn: "123",
          isbn: "456",
          search_scope: "contributor",
          sort_direction: "asc",
          sort: "relevance",
        })
      ).toEqual({
        identifiers: {
          issn: "123",
          isbn: "456",
        },
        field: "contributor",
        order: "asc",
        sortBy: "relevance",
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
