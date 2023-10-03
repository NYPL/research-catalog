import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import mockRouter from "next-router-mock"

import { results } from "../../data/searchResultsBibs"
import SearchResults from "../../../pages/search/index"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Search Results page", () => {
  it("spaghetti", () => {
    const query = "spaghetti"
    mockRouter.push(`/search?q=${query}`)
    render(<SearchResults results={results} />)

    const displayingText = screen.getByRole("heading", { level: 3 })
    expect(displayingText).toHaveTextContent(
      `Displaying 1-50 of ${results.results.totalResults} results for keyword "${query}"`
    )
  })
})
