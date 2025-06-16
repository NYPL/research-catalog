import React from "react"
import { render, screen, within } from "../../../src/utils/testUtils"
import CustomError from "../../../pages/404/index"
import { appConfig } from "../../../src/config/config"

describe("404", () => {
  it("should display 404 text", () => {
    render(<CustomError activePage="account" statusCode={404} />)
    const container = screen.getByRole("main")
    const heading = within(container).getByRole("heading")
    expect(heading).toHaveTextContent("404 Not Found")
  })
  it("should have links to homepage and legacy catalogs", () => {
    render(<CustomError activePage="hold" statusCode={404} />)
    const container = screen.getByRole("main")

    const homeLink = within(container).getByText("Research Catalog")
    expect(homeLink).toHaveAttribute("href", "/research/research-catalog")
    const legacyLink = within(container).getByText("Legacy Catalog")
    expect(legacyLink).toHaveAttribute("href", appConfig.urls.legacyCatalog)
  })
})
