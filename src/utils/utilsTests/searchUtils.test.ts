import { textInputFields } from "../advancedSearchUtils"
import {
  getPaginationOffsetStrings,
  getSearchQuery,
  mapQueryToSearchParams,
  mapRequestBodyToSearchParams,
  getSearchResultsHeading,
} from "../searchUtils"
import { queryParamsEquality } from "../../../__test__/helpers/searchHelpers"

const checkQueryParamsEquality = queryParamsEquality(getSearchQuery)

describe("searchUtils", () => {
  describe("getSearchQuery", () => {
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
          sort: "relevance",
        })
      ).toEqual({
        identifiers: {
          issn: "123",
          isbn: "456",
        },
        page: 1,
        q: "",
        field: "contributor",
        order: "asc",
        sortBy: "relevance",
      })
    })
    it("parses the page number query string value into a number", () => {
      expect(
        mapQueryToSearchParams({
          page: "2",
        })
      ).toEqual({
        page: 2,
        q: "",
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
  describe("getPaginationOffsetStrings", () => {
    it("returns a tuple of strings with the correct start and end values for the first page", () => {
      const [start, end] = getPaginationOffsetStrings(1, 1200)
      expect(start).toEqual("1")
      expect(end).toEqual("50")
    })
    it("returns a tuple of strings with the correct start and end values for any given page", () => {
      const [start, end] = getPaginationOffsetStrings(5, 1200)
      expect(start).toEqual("201")
      expect(end).toEqual("250")
    })
    it("correctly sets the end value for the last page", () => {
      const [start, end] = getPaginationOffsetStrings(24, 1195)
      expect(start).toEqual("1,151")
      expect(end).toEqual("1,195")
    })
  })
  describe("getSearchResultsHeading", () => {
    it("doesn't display empty keyword if other params are present", () => {
      const heading = getSearchResultsHeading(
        { page: 1, q: "", title: "Strega Nonna" },
        1200
      )
      expect(heading.toLocaleLowerCase().includes("keyword")).toBe(false)
    })
    it("displays all of the values from advanced search and nothing else", () => {
      const heading = getSearchResultsHeading(
        {
          page: 1,
          q: "spaghetti",
          title: "ricotta",
          contributor: "pasta mama",
          subject: "italian",
          filters: { language: "italian" },
        },
        100
      )
      expect(heading).toEqual(
        'Displaying 1-50 of 100 results for keyword "spaghetti" and title "ricotta" and author "pasta mama" and subject "italian"'
      )
    })
    it("returns the correct heading string for first page", () => {
      const heading = getSearchResultsHeading({ page: 1, q: "cats" }, 1200)
      expect(heading).toEqual(
        'Displaying 1-50 of 1,200 results for keyword "cats"'
      )
    })
    it("returns the correct heading string for other pages", () => {
      const heading = getSearchResultsHeading({ page: 5, q: "cats" }, 1200)
      expect(heading).toEqual(
        'Displaying 201-250 of 1,200 results for keyword "cats"'
      )
    })
  })
})
