import {
  getSearchQuery,
  mapQueryToSearchParams,
  mapRequestBodyToSearchParams,
  getSearchResultsHeading,
} from "../searchUtils"
import { queryParamsEquality } from "../../../__test__/helpers/searchHelpers"
import type { SearchQueryParams, SearchParams } from "../../types/searchTypes"
import { render } from "@testing-library/react"

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
        "?q=shel%20silverstein&contributor=shel%20silverstein&title=the%20giving%20tree&subject=books"
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
    it("encodes special characters in advanced search params", () => {
      const testQuery =
        "?q=uber&title=%C3%9Cber%20den%20Prozess&contributor=G%C3%BCnther&subject=%C3%84sthetik"

      expect(
        checkQueryParamsEquality(testQuery, {
          q: "uber",
          title: "Über den Prozess",
          contributor: "Günther",
          subject: "Ästhetik",
          field: "all",
        })
      ).toBe(true)
    })

    it("appends role when there's one contributor literal filter and a role is passed", () => {
      const testQuery =
        "?q=merrily&filters[contributorLiteral][0]=Sondheim%2C%20Stephen&role=lyricist%2E"
      expect(
        checkQueryParamsEquality(testQuery, {
          q: "merrily",
          filters: { contributorLiteral: ["Sondheim, Stephen"] },
          role: "lyricist.",
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
      const { container } = render(heading)
      expect(container.textContent?.toLowerCase().includes("keyword")).toBe(
        false
      )
    })
    it("displays the default keyword display string", () => {
      const heading = getSearchResultsHeading({ q: "spaghetti" }, 100)
      const { container } = render(heading)
      expect(container.textContent).toBe(
        'Displaying 1-50 of 100 results for keyword "spaghetti"'
      )
      expect(container.querySelector('[translate="no"]')?.textContent).toBe(
        '"spaghetti"'
      )
    })
    it("handles the special case for the author search scope", () => {
      const heading = getSearchResultsHeading({ contributor: "spaghetti" }, 100)
      const { container } = render(heading)
      expect(container.textContent).toBe(
        'Displaying 1-50 of 100 results for author/contributor "spaghetti"'
      )
      expect(container.querySelector('[translate="no"]')?.textContent).toBe(
        '"spaghetti"'
      )
    })
    it("handles the special case for the contributorLiteral filter", () => {
      const heading = getSearchResultsHeading(
        { filters: { contributorLiteral: ["spaghetti", "pasta"] } },
        100
      )
      const { container } = render(heading)
      expect(container.textContent).toBe(
        'Displaying 1-50 of 100 results for authors/contributors "spaghetti, pasta"'
      )
      expect(container.querySelector('[translate="no"]')?.textContent).toBe(
        '"spaghetti, pasta"'
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
      const { container } = render(heading)
      expect(container.textContent).toBe(
        'Displaying 1-50 of 100 results for keyword "spaghetti" and title "ricotta" and author/contributor "pasta mama" and subject "italian"'
      )
      const noTranslateSpans = container.querySelectorAll('[translate="no"]')
      expect(noTranslateSpans).toHaveLength(4)
      expect(noTranslateSpans[0].textContent).toBe('"spaghetti"')
      expect(noTranslateSpans[1].textContent).toBe('"ricotta"')
      expect(noTranslateSpans[2].textContent).toBe('"pasta mama"')
      expect(noTranslateSpans[3].textContent).toBe('"italian"')
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
      const { container } = render(heading)
      expect(container.textContent).toBe(
        'Displaying 1-50 of 100 results for journal title "spaghetti"'
      )
      expect(container.querySelector('[translate="no"]')?.textContent).toBe(
        '"spaghetti"'
      )
    })
    it("returns the correct heading string for first page", () => {
      const heading = getSearchResultsHeading({ page: 1, q: "cats" }, 1200)
      const { container } = render(heading)
      expect(container.textContent).toBe(
        'Displaying 1-50 of 1,200 results for keyword "cats"'
      )
      expect(container.querySelector('[translate="no"]')?.textContent).toBe(
        '"cats"'
      )
    })
    it("returns the correct heading string for other pages", () => {
      const heading = getSearchResultsHeading({ page: 5, q: "cats" }, 1200)
      const { container } = render(heading)
      expect(container.textContent).toBe(
        'Displaying 201-250 of 1,200 results for keyword "cats"'
      )
      expect(container.querySelector('[translate="no"]')?.textContent).toBe(
        '"cats"'
      )
    })
    it("doesn't display the 'for' part of the display text when the q param is absent", () => {
      const heading = getSearchResultsHeading({ page: 5 }, 1200)
      const { container } = render(heading)
      expect(container.textContent).toBe("Displaying 201-250 of 1,200 results")
      expect(container.querySelector('[translate="no"]')).toBeNull()
    })

    describe("identifier searches", () => {
      it("returns the correct heading string for OCLC searches", () => {
        const heading = getSearchResultsHeading(
          { page: 1, identifiers: { oclc: "1234" } },
          3
        )
        const { container } = render(heading)
        expect(container.textContent).toBe(
          'Displaying 3 of 3 results for OCLC "1234"'
        )
        expect(container.querySelector('[translate="no"]')?.textContent).toBe(
          '"1234"'
        )
      })

      it("returns the correct heading string for ISBN searches", () => {
        const heading = getSearchResultsHeading(
          { page: 5, identifiers: { isbn: "1234" } },
          3
        )
        const { container } = render(heading)
        expect(container.textContent).toBe(
          'Displaying 3 of 3 results for ISBN "1234"'
        )
        expect(container.querySelector('[translate="no"]')?.textContent).toBe(
          '"1234"'
        )
      })

      it("returns the correct heading string for ISSN searches", () => {
        const heading = getSearchResultsHeading(
          { page: 5, identifiers: { issn: "1234" } },
          3
        )
        const { container } = render(heading)
        expect(container.textContent).toBe(
          'Displaying 3 of 3 results for ISSN "1234"'
        )
        expect(container.querySelector('[translate="no"]')?.textContent).toBe(
          '"1234"'
        )
      })

      it("returns the correct heading string for LCCN searches", () => {
        const heading = getSearchResultsHeading(
          { page: 5, identifiers: { lccn: "1234" } },
          3
        )
        const { container } = render(heading)
        expect(container.textContent).toBe(
          'Displaying 3 of 3 results for LCCN "1234"'
        )
        expect(container.querySelector('[translate="no"]')?.textContent).toBe(
          '"1234"'
        )
      })
    })
    describe("browse result searches", () => {
      it("returns subject heading", () => {
        const heading = getSearchResultsHeading({ page: 1, q: "" }, 100, {
          slug: "History",
          browseType: "subjects",
        })
        const { container } = render(heading)
        expect(container.textContent).toContain(
          'Displaying 1-50 of 100 results for Subject Heading "History"'
        )
        expect(container.querySelector('[translate="no"]')?.textContent).toBe(
          '"History"'
        )
      })

      it("returns heading with contributor and role", () => {
        const heading = getSearchResultsHeading({ page: 1, q: "" }, 100, {
          slug: "Sondheim, Stephen",
          browseType: "contributors",
          role: "editor.",
        })
        const { container } = render(heading)
        expect(container.textContent).toContain(
          'Displaying 1-50 of 100 results for author/contributor "Sondheim, Stephen, editor."'
        )
        expect(container.querySelector('[translate="no"]')?.textContent).toBe(
          '"Sondheim, Stephen, editor."'
        )
      })
    })
  })
})
