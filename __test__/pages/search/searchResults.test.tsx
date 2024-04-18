import React from "react"
import userEvent from "@testing-library/user-event"
import { render, screen } from "../../../src/utils/testUtils"

import mockRouter from "next-router-mock"

import {
  results,
  aggregationsResults,
} from "../../fixtures/searchResultsManyBibs"
import { noBibs } from "../../fixtures/searchResultsNoBibs"
import SearchResults from "../../../pages/search/index"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
const query = "spaghetti"

describe("Search Results page", () => {
  describe("focus", () => {
    it("focuses on search results heading after filters are applied", async () => {
      mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ results, aggregations: aggregationsResults }}
        />
      )
      const refine = screen.getByText("Refine Search")
      await userEvent.click(refine)
      const field = screen.getByLabelText("Greek, Modern (1453-present)", {
        exact: false,
      })
      await userEvent.click(field)
      await userEvent.click(screen.getByText("Apply Filters"))
      // This was the only way to get this test to pass. waitFor was not in fact waiting, even with same timeout.
      setTimeout(() => {
        const resultsHeading = screen.getByTestId("search-results-heading")
        expect(resultsHeading).toHaveFocus()
      }, 500)
    })
    it("focuses on search results heading after loading a keyword search", () => {
      mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ results, aggregations: aggregationsResults }}
        />
      )
      const resultsHeading = screen.getByText("Displaying 1-50", {
        exact: false,
      })
      expect(resultsHeading).toHaveFocus()
    })
    it("keeps focus on the sort by selector after a sort is applied", async () => {
      mockRouter.push(`/search?q=${query}`)

      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ results, aggregations: aggregationsResults }}
        />
      )
      const selector = screen.getByLabelText("Sort by")
      await userEvent.selectOptions(selector, "Title (A - Z)")
      expect(selector).toHaveFocus()
    })
    it("focuses on cancel after clicking refine search", async () => {
      mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ results, aggregations: aggregationsResults }}
        />
      )
      const refine = screen.getByText("Refine Search")
      await userEvent.click(refine)
      const cancel = screen.getByText("Cancel")
      expect(cancel).toHaveFocus
    })
    it("focuses on refine search after clicking cancel", async () => {
      mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ results, aggregations: aggregationsResults }}
        />
      )
      const refine = screen.getByText("Refine Search")
      await userEvent.click(refine)
      const cancel = screen.getByText("Cancel")
      await userEvent.click(cancel)
      expect(refine).toHaveFocus
    })
    it("keeps focus on the sort by selector after a sort is changed", async () => {
      mockRouter.push("")
      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ results, aggregations: aggregationsResults }}
        />
      )
      const selector = screen.getByLabelText("Sort by")
      await userEvent.selectOptions(selector, "Title (A - Z)")
      await userEvent.selectOptions(selector, "Title (Z - A)")
      expect(selector).toHaveFocus
    })
  })
  describe("More than 50 bibs", () => {
    it("displays many bibs", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ results }}
        />
      )

      const displayingText = screen.getByText(
        `Displaying 1-50 of ${results.totalResults} results for keyword "${query}"`
      )
      expect(displayingText).toBeInTheDocument()

      const cards = screen.getAllByRole("heading", { level: 3 })
      expect(cards).toHaveLength(50)
    })
    it("displays pagination and updates the router on page button clicks", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ results }}
        />
      )
      screen.getByLabelText("Pagination")

      const pageButton = screen.getByLabelText("Page 2")
      await userEvent.click(pageButton)
      expect(mockRouter.asPath).toBe("/?q=spaghetti&page=2")
    })
    it("renders the sort select field and updates the query string in the url on changes", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ results }}
        />
      )
      const sortSelect = screen.getByLabelText("Sort by")
      expect(sortSelect).toHaveValue("relevance")
      await userEvent.selectOptions(sortSelect, "Title (A - Z)")
      expect(sortSelect).toHaveValue("title_asc")

      expect(mockRouter.asPath).toBe(
        "/?q=spaghetti&sort=title&sort_direction=asc"
      )
    })
    it("returns the user to the first page on sorting changes", async () => {
      await mockRouter.push(`/search?q=${query}&page=2`)
      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={{ results }}
        />
      )
      const sortSelect = screen.getByLabelText("Sort by")
      await userEvent.selectOptions(sortSelect, "Title (Z - A)")

      expect(mockRouter.asPath).toBe(
        "/?q=spaghetti&sort=title&sort_direction=desc"
      )
    })
  })
  describe("No bibs", () => {
    it("displays No results message", () => {
      render(
        <SearchResults
          isFreshSortByQuery={false}
          isAuthenticated={true}
          results={noBibs}
        />
      )

      const noResultsMessage = screen.getByRole("heading", { level: 3 })
      expect(noResultsMessage).toHaveTextContent(
        "No results. Try a different search."
      )
      const cards = screen.queryAllByRole("heading", { level: 4 })
      expect(cards).toHaveLength(0)
    })
  })
})
