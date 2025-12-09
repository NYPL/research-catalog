import React from "react"
import { render, screen, within } from "../../../src/utils/testUtils"
import Custom404 from "../../../pages/404/index"
import Redirect404 from "../../../pages/404/redirect"
import { appConfig } from "../../../src/config/config"

describe("404", () => {
  it("should display 404 text", () => {
    render(<Custom404 activePage="account" />)
    const container = screen.getByRole("main")
    const heading = within(container).getByRole("heading")
    expect(heading).toHaveTextContent("We couldn't find that page")
  })
  it("should have link to RC search", () => {
    render(<Custom404 activePage="hold" />)
    const container = screen.getByRole("main")

    const homeLink = within(container).getByText("new search")
    expect(homeLink).toHaveAttribute("href", "/")
  })
})

describe("redirect 404", () => {
  it("should display 404 text", () => {
    render(<Redirect404 />)
    const container = screen.getByRole("main")
    const heading = within(container).getByRole("heading")
    expect(heading).toHaveTextContent("We couldn't find that page")
  })
  it("should have links to circulating and legacy catalogs", () => {
    render(<Redirect404 />)
    const container = screen.getByRole("main")

    const circulatingLink = within(container).getByText("Branch Catalog")
    expect(circulatingLink).toHaveAttribute(
      "href",
      `${appConfig.urls.circulatingCatalog}`
    )

    const legacyLink = within(container).getByText("Legacy Catalog")
    expect(legacyLink).toHaveAttribute(
      "href",
      `${appConfig.urls.legacyCatalog}`
    )
  })
})
