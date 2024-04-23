import {
  getPaginationOffsetStrings,
  getSearchQuery,
  mapQueryToSearchParams,
  mapRequestBodyToSearchParams,
  getSearchResultsHeading,
  getFreshSortByQuery,
  mapQueryFiltersToSearchFilters,
} from "../searchUtils"
import { queryParamsEquality } from "../../../__test__/helpers/searchHelpers"
import type {
  SearchQueryFilters,
  SearchQueryParams,
} from "../../types/searchTypes"

const checkQueryParamsEquality = queryParamsEquality(getSearchQuery)

describe("searchUtils", () => {
  describe("getFreshSortByQuery", () => {
    it("returns false if there is no prevUrl", () => {
      expect(getFreshSortByQuery(undefined, "thebomb.com")).toBe(false)
    })
    it("returns false if the prevUrl and currentUrl have same sort by params", () => {
      const prev =
        "http://local.nypl.org:8080/research/research-catalog/search?q=spaghetti&sort=title&sort_direction=asc"
      const curr =
        "http://local.nypl.org:8080/research/research-catalog/search?q=spaghetti&sort=title&sort_direction=asc&shape=pasta"
      expect(getFreshSortByQuery(prev, curr)).toBe(false)
    })
    it("returns true if sort is same but direction is different", () => {
      const prev =
        "http://local.nypl.org:8080/research/research-catalog/search?q=spaghetti&sort=title&sort_direction=asc"
      const curr =
        "http://local.nypl.org:8080/research/research-catalog/search?q=spaghetti&sort=title&sort_direction=desc"
      expect(getFreshSortByQuery(prev, curr)).toBe(true)
    })
    it("returns true if sort is different and direction is same", () => {
      const prev =
        "http://local.nypl.org:8080/research/research-catalog/search?q=spaghetti&sort=title&sort_direction=asc"
      const curr =
        "http://local.nypl.org:8080/research/research-catalog/search?q=spaghetti&sort=date&sort_direction=asc"
      expect(getFreshSortByQuery(prev, curr)).toBe(true)
    })
  })
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
    it("maps the filters correctly", () => {
      expect(
        mapQueryToSearchParams({
          "filters[language][0]": "lang:rus",
          "filters[subjectLiteral][0]": "Spaghetti",
          "filters[subjectLiteral][1]": "Linguini",
        } as SearchQueryParams)
      ).toEqual({
        page: 1,
        q: "",
        filters: {
          language: ["lang:rus"],
          subjectLiteral: ["Spaghetti", "Linguini"],
        },
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
  describe("mapQueryFiltersToSearchFilters", () => {
    it("maps filter query keys to a SearchFilters object", () => {
      const filters = mapQueryFiltersToSearchFilters([
        ["filters[language][0]", "lang:rus"],
        ["filters[subjectLiteral][0]", "Spaghetti"],
        ["filters[subjectLiteral][1]", "Linguini"],
        ["filters[dateAfter][0]", "1999"],
      ])

      expect(filters).toEqual({
        language: ["lang:rus"],
        subjectLiteral: ["Spaghetti", "Linguini"],
        dateAfter: ["1999"],
      })
    })
    it("returns an empty object when an empty value is passed in", () => {
      const filters = mapQueryFiltersToSearchFilters([])

      expect(filters).toEqual({})
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
