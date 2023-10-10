import React from "react"
import { render, screen } from "@testing-library/react"

import Home from "./index"

describe("Home", () => {
  it("should render an H2", () => {
    render(<Home />)

    const header = screen.getByRole("heading", { level: 2 })
    const headerText = "Explore the Library's Vast Research Collections & More"
    expect(header).toHaveTextContent(headerText)
  })
  it("should render H4's", () => {
    render(<Home />)

    const headersLevel4 = screen.getAllByRole("heading", { level: 4 })
    expect(headersLevel4).toHaveLength(5)
  })
})
