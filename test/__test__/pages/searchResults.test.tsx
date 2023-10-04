import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import mockRouter from "next-router-mock"

import { results } from "../../data/searchResultsManyBibs"
import { noBibs } from "../../data/searchResultsNoBibs"
import SearchResults from "../../../pages/search/index"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Search Results page", () => {
  describe("More than 50 bibs", () => {
    it("displays many bibs", () => {
      const query = "spaghetti"
      mockRouter.push(`/search?q=${query}`)
      render(<SearchResults results={results} />)

      const displayingText = screen.getByRole("heading", { level: 3 })
      expect(displayingText).toHaveTextContent(
        `Displaying 1-50 of ${results.results.totalResults} results for keyword "${query}"`
      )
      const cards = screen.getAllByRole("heading", { level: 4 })
      expect(cards).toHaveLength(50)
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
