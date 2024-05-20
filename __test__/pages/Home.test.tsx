import React from "react"
import { render, screen } from "../../src/utils/testUtils"

import Home from "../../pages/index"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Home", () => {
  it("should render the search form", () => {
    render(<Home isAuthenticated={true} />)
    const searchButton = screen.getByRole("button", { name: "Search" })
    expect(searchButton).toBeInTheDocument()
  })
  it("should render an H2", () => {
    render(<Home isAuthenticated={true} />)

    const header = screen.getByRole("heading", { level: 2 })
    const headerText = "Explore the Library's Vast Research Collections & More"
    expect(header).toHaveTextContent(headerText)
  })
  it("should render H4's", () => {
    render(<Home isAuthenticated={true} />)

    const headersLevel4 = screen.getAllByRole("heading", { level: 4 })
    expect(headersLevel4).toHaveLength(5)
  })
})
