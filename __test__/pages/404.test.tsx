import React from "react"
import { render, screen } from "@testing-library/react"

import Custom404 from "../../pages/404"
import Redirect404 from "../../pages/404/redirect"
import { LEGACY_CATALOG_URL } from "../../src/config/constants"

describe("404", () => {
  it("should display 404 text", () => {
    render(<Custom404 />)

    const FourOhFourText = "404 Not Found"
    const heading = screen.getByRole("heading")
    expect(heading).toHaveTextContent(FourOhFourText)
  })
  it("should have links to homepage and legacy catalogs", () => {
    render(<Custom404 />)

    const homeLink = screen.getByRole("link", { name: "Research Catalog" })
    expect(homeLink).toHaveAttribute("href", "/")
    const legacyLink = screen.getByRole("link", {
      name: "Legacy Catalog",
    })
    expect(legacyLink).toHaveAttribute("href", LEGACY_CATALOG_URL)
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
