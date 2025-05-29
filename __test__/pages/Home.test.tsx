import React from "react"
import { render, screen } from "../../src/utils/testUtils"

import Home from "../../pages/index"
import { FocusProvider } from "../../src/context/FocusContext"

// Mock next router
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Home", () => {
  const component = (
    <FocusProvider>
      <Home isAuthenticated={true} />
    </FocusProvider>
  )
  it("should render the search form", () => {
    render(component)
    const searchForm = screen.getByLabelText("Search Bar Label")
    expect(searchForm).toBeInTheDocument()
  })
  it("should render an H2", () => {
    render(component)

    const header = screen.getByRole("heading", { level: 2 })
    const headerText = "Explore the Library's Vast Research Collections & More"
    expect(header).toHaveTextContent(headerText)
  })
  it("should render H4's", () => {
    render(component)

    const headersLevel4 = screen.getAllByRole("heading", { level: 4 })
    expect(headersLevel4).toHaveLength(5)
  })
})
