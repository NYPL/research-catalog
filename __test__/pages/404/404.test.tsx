import React from "react"
import { render, screen, within } from "../../../src/utils/testUtils"
import Custom404 from "../../../pages/404/index"
import { appConfig } from "../../../src/config/config"

describe("404", () => {
  it("should display 404 text", () => {
    render(<Custom404 activePage="account" />)
    const container = screen.getByRole("main")

    const fourOhFourText = "404 Not Found"
    const heading = within(container).getByRole("heading")
    expect(heading).toHaveTextContent(fourOhFourText)
  })
  it("should have links to homepage and legacy catalogs", () => {
    render(<Custom404 activePage="hold" />)
    const container = screen.getByRole("main")

    const homeLink = within(container).getByText("Research Catalog")
    expect(homeLink).toHaveAttribute("href", "/research/research-catalog")
    const legacyLink = within(container).getByText("Legacy Catalog")
    expect(legacyLink).toHaveAttribute("href", appConfig.urls.legacyCatalog)
  })
})
