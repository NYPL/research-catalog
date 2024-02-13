import React from "react"
import { render, screen } from "@testing-library/react"

import Custom404 from "../../../pages/404/index"
import Redirect404 from "../../../pages/404/redirect"
import { appConfig } from "../../../src/config/config"

describe("404", () => {
  it("should display 404 text", () => {
    render(<Custom404 />)

    const FourOhFourText = "404 Not Found"
    const heading = screen.getByRole("heading")
    expect(heading).toHaveTextContent(FourOhFourText)
  })
  it("should have links to homepage and legacy catalogs", () => {
    render(<Custom404 />)

    const homeLink = screen.getByText("Research Catalog")
    expect(homeLink).toHaveAttribute("href", "/research/research-catalog")
    const legacyLink = screen.getByText("Legacy Catalog")
    expect(legacyLink).toHaveAttribute(
      "href",
      appConfig.externalUrls.legacyCatalog
    )
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
