import React from "react"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"

import mockRouter from "next-router-mock"

import { results } from "../../fixtures/searchResultsManyBibs"
import { noBibs } from "../../fixtures/searchResultsNoBibs"
import SearchResults from "../../../pages/search/index"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
const query = "spaghetti"

describe("Search Results page", () => {
  describe("More than 50 bibs", () => {
    it("displays many bibs", () => {
      mockRouter.push(`/search?q=${query}`)
      render(<SearchResults results={results} />)

      const displayingText = screen.getByRole("heading", { level: 2 })
      expect(displayingText).toHaveTextContent(
        `Displaying 1-50 of ${results.results.totalResults} results for keyword "${query}"`
      )
      const cards = screen.getAllByRole("heading", { level: 3 })
      expect(cards).toHaveLength(50)
    })
    it("displays pagination and updates the router on page button clicks", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(<SearchResults results={results} />)
      screen.getByLabelText("Pagination")

      const pageButton = screen.getByLabelText("Page 2")
      await userEvent.click(pageButton)
      expect(mockRouter.asPath).toBe("/?q=spaghetti&page=2")
    })
    it("renders the sort select field and updates the query string in the url on changes", async () => {
      await mockRouter.push(`/search?q=${query}`)
      render(<SearchResults results={results} />)
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
      render(<SearchResults results={results} />)
      const sortSelect = screen.getByLabelText("Sort by")
      await userEvent.selectOptions(sortSelect, "Title (Z - A)")

      expect(mockRouter.asPath).toBe(
        "/?q=spaghetti&sort=title&sort_direction=desc"
      )
    })
  })
  describe("No bibs", () => {
    it("displays No results message", () => {
      render(<SearchResults results={noBibs} />)

      const noResultsMessage = screen.getByRole("heading", { level: 3 })
      expect(noResultsMessage).toHaveTextContent(
        "No results. Try a different search."
      )
      const cards = screen.queryAllByRole("heading", { level: 4 })
      expect(cards).toHaveLength(0)
    })
  })
})
