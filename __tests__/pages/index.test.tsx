import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Home from "../../pages/index"

describe("Home", () => {
  it("should render an H2", () => {
    render(<Home />)

    const header = screen.getByRole("heading", { level: 2 })
    const headerText = "Explore the Library's Vast Research Collections & More"
    expect(header).toHaveTextContent(headerText)
  })
})
