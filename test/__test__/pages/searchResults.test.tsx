import React from "react"
import { useRouter } from "next/router"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { results } from "../../data/searchResultsBibs"
import SearchResults from "../../../pages/search/index"

jest.mock("next/router", () => {
  return {
    ...jest.requireActual("next/router"),
    useRouter: jest.fn(() => ({ query: "initial" })),
  }
})

describe("Search Results page", () => {
  beforeEach(() => {
    // useRouter.mockClear()
  })
  it("spaghetti", () => {
    render(<SearchResults results={results} />)

    const displayingText = screen.getByRole("heading", { level: 3 })
    expect(displayingText).toBe(
      `Displaying 1-50 of ${results.results.totalResults} results for keyword spaghetti`
    )
  })
})
