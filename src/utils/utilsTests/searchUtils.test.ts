import {
  getSearchQuery,
  mapQueryToSearchParams,
  mapRequestBodyToSearchParams,
  getSearchResultsHeading,
} from "../searchUtils"
import { queryParamsEquality } from "../../../__test__/helpers/searchHelpers"
import type { SearchQueryParams, SearchParams } from "../../types/searchTypes"

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
    it("includes advanced search query params when field is set to 'all'", () => {
      const testQuery =
        "?q=shel%20silverstein&contributor=shel silverstein&title=the giving tree&subject=books"
      expect(
        checkQueryParamsEquality(testQuery, {
          q: "shel silverstein",
          title: "the giving tree",
          contributor: "shel silverstein",
          subject: "books",
          field: "all",
        })
      ).toBe(true)
    })
    it("clears advanced search query params when field param is anything other than 'all'", () => {
      const titleQuery = "?q=shel%20silverstein&search_scope=title"
      expect(
        checkQueryParamsEquality(titleQuery, {
          q: "shel silverstein",
          title: "the giving tree",
          contributor: "shel silverstein",
          subject: "books",
          field: "title",
        })
      ).toBe(true)

      const subjectQuery = "?q=shel%20silverstein&search_scope=subject"
      expect(
        checkQueryParamsEquality(subjectQuery, {
          q: "shel silverstein",
          title: "the giving tree",
          contributor: "shel silverstein",
          subject: "books",
          field: "subject",
        })
      ).toBe(true)

      const contributorQuery = "?q=shel%20silverstein&search_scope=contributor"
      expect(
        checkQueryParamsEquality(contributorQuery, {
          q: "shel silverstein",
          title: "the giving tree",
          contributor: "shel silverstein",
          subject: "books",
          field: "contributor",
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
  describe("mapRequestBodyToSearchParams", () => {
    it("combines filters", () => {
      const params = mapRequestBodyToSearchParams({
        q: "spaghetti",
        language: "igbo",
        format: "scroll",
        dateFrom: "1900",
        dateTo: "1902",
      })
      expect(params).toEqual({
        q: "spaghetti",
        page: 1,
        filters: {
          language: "igbo",
          format: "scroll",
          dateFrom: "1900",
          dateTo: "1902",
        },
      })
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
    it("displays the default keyword display string", () => {
      const heading = getSearchResultsHeading({ q: "spaghetti" }, 100)
      expect(heading).toEqual(
        'Displaying 1-50 of 100 results for keyword "spaghetti"'
      )
    })
    it("handles the special case for the author field", () => {
      const heading = getSearchResultsHeading({ contributor: "spaghetti" }, 100)
      expect(heading).toEqual(
        'Displaying 1-50 of 100 results for author/contributor "spaghetti"'
      )
    })
    it("handles the special case for the creatorLiteral field", () => {
      const heading = getSearchResultsHeading(
        { filters: { creatorLiteral: ["spaghetti"] } },
        100
      )
      expect(heading).toEqual(
        'Displaying 1-50 of 100 results for author "spaghetti"'
      )
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
        'Displaying 1-50 of 100 results for keyword "spaghetti" and title "ricotta" and author/contributor "pasta mama" and subject "italian"'
      )
    })
    it("displays the appropriate string for certain values", () => {
      const heading = getSearchResultsHeading(
        {
          page: 1,
          q: "spaghetti",
          field: "journal_title",
          journal_title: "spaghetti",
        } as SearchParams,
        100
      )
      expect(heading).toEqual(
        'Displaying 1-50 of 100 results for journal title "spaghetti"'
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
    it("doesn't display the 'for' part of the display text when the q param is absent", () => {
      const heading = getSearchResultsHeading({ page: 5 }, 1200)
      expect(heading).toEqual("Displaying 201-250 of 1,200 results")
    })

    describe("identifier searches", () => {
      it("returns the correct heading string for OCLC searches", () => {
        const heading = getSearchResultsHeading(
          { page: 1, identifiers: { oclc: "1234" } },
          3
        )
        expect(heading).toEqual('Displaying 3 of 3 results for OCLC "1234"')
      })

      it("returns the correct heading string for ISBN searches", () => {
        const heading = getSearchResultsHeading(
          { page: 5, identifiers: { isbn: "1234" } },
          3
        )
        expect(heading).toEqual('Displaying 3 of 3 results for ISBN "1234"')
      })

      it("returns the correct heading string for ISSN searches", () => {
        const heading = getSearchResultsHeading(
          { page: 5, identifiers: { issn: "1234" } },
          3
        )
        expect(heading).toEqual('Displaying 3 of 3 results for ISSN "1234"')
      })

      it("returns the correct heading string for LCCN searches", () => {
        const heading = getSearchResultsHeading(
          { page: 5, identifiers: { lccn: "1234" } },
          3
        )
        expect(heading).toEqual('Displaying 3 of 3 results for LCCN "1234"')
      })
    })
  })
})
