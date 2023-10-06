import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Custom404 from "../../pages/404"
import Redirect404 from "../../pages/404/redirect"

describe("404", () => {
  it("should display 404 text", () => {
    render(<Custom404 />)

    const FourOhFourText = "404 Not Found"
    const heading = screen.getByRole("heading")
    expect(heading).toHaveTextContent(FourOhFourText)
  })
  it("should have links to circ and legacy catalogs", () => {
    render(<Custom404 />)

    const links = screen.getAllByRole("link")
    expect(links[0])
  })
})

describe("Redirect", () => {
  it("should have we're sorry text", () => {
    render(<Redirect404 />)
    const wereSorry = "We're sorry..."
    const heading = screen.getByRole("heading")
    expect(heading).toHaveTextContent(wereSorry)
  })
})
