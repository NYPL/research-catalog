import React from "react"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"

import mockRouter from "next-router-mock"

import { results } from "../../fixtures/searchResultsManyBibs"
import { noBibs } from "../../fixtures/searchResultsNoBibs"
import SearchResults from "../../../pages/search/index"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Search Results page", () => {
  describe("More than 50 bibs", () => {
    let query: string

    beforeEach(() => {
      query = "spaghetti"
      mockRouter.push(`/search?q=${query}`)
      render(<SearchResults results={results} />)
    })
    it("displays many bibs", () => {
      const displayingText = screen.getByRole("heading", { level: 2 })
      expect(displayingText).toHaveTextContent(
        `Displaying 1-50 of ${results.results.totalResults} results for keyword "${query}"`
      )
      const cards = screen.getAllByRole("heading", { level: 3 })
      expect(cards).toHaveLength(50)
    })
    it("renders the sort select field and updates the query string in the url on changes", async () => {
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
