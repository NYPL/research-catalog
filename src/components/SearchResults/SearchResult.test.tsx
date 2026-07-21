import React from "react"
import { render, screen } from "../../utils/testUtils"
import SearchResult from "./SearchResult"
import SearchResultsBib from "../../models/SearchResultsBib"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"
import { searchResultManyPhysicalItems } from "../../../__test__/fixtures/searchResultManyPhysicalItems"
import { searchResultElectronicResources } from "../../../__test__/fixtures/searchResultElectronicResources"
import type { DiscoveryBibResult } from "../../types/bibTypes"
import { searchResultPartnerSource } from "../../../__test__/fixtures/searchResultPartnerSource"

describe("SearchResult with Physical Items", () => {
  beforeEach(() => {
    const bib = new SearchResultsBib(searchResultPhysicalItems)
    render(<SearchResult isAuthenticated={false} bib={bib} />)
  })

  it("renders a title link with the correct bib href", async () => {
    const resultTitleLink = screen.getByRole("link", {
      name: "A history of spaghetti eating and cooking for: spaghetti dinner.",
    })
    expect(resultTitleLink).toHaveAttribute("href", "/bib/b12810991")
  })

  it("renders the primary bib fields", async () => {
    const format = screen.getByText("Material")
    expect(format).toBeVisible()
    const pubStmt = screen.getByText("New York, Abelard-Schuman [1955]")
    expect(pubStmt).toBeVisible()
    const numItems = screen.getByText("2 items")
    expect(numItems).toBeVisible()
  })
})

describe("SearchResult with Many Physical Items", () => {
  beforeEach(() => {
    const bib = new SearchResultsBib(
      searchResultManyPhysicalItems as DiscoveryBibResult
    )
    render(<SearchResult isAuthenticated={false} bib={bib} />)
  })

  it("renders a link to the bib page with the correct text when there are more than the set limit of items per search result", async () => {
    const resultTitleLink = screen.getByRole("link", {
      name: "View all 4 items",
    })
    expect(resultTitleLink).toHaveAttribute("href", "/bib/b14753192#item-table")
  })
  it("displays the volume when it's there", async () => {
    const volumeText = screen.getByText("*OSH p.v. 1-2")
    expect(volumeText).toBeVisible()
  })
  it("displays the division row for NYPL items", async () => {
    const divisionRow = screen
      .getAllByRole("row")
      .find((r) => r.textContent?.includes("Division"))
    expect(divisionRow).toBeDefined()
  })
  it("provides the correct division links", async () => {
    const divisionLink1 = screen.getAllByText("General Research Division")[0]
    expect(divisionLink1).toHaveAttribute(
      "href",
      "https://nypl.org/locations/schwarzman/general-research-division"
    )
    const divisionLink2 = screen.getByText("Arents Collection")
    expect(divisionLink2).toHaveAttribute(
      "href",
      "https://nypl.org/locations/schwarzman/rare-books-division/arents-collection"
    )
  })
})

describe("SearchResult with Electronic Resources", () => {
  it("renders the correct item message for bib with electronic resources", async () => {
    const bib = new SearchResultsBib(searchResultElectronicResources)
    render(<SearchResult isAuthenticated={false} bib={bib} />)
    const message = screen.getByText("1 resource")
    expect(message).toBeVisible()
  })
})

describe("SearchResult from partner source", () => {
  const bib = new SearchResultsBib(searchResultPartnerSource)
  render(<SearchResult isAuthenticated={false} bib={bib} />)
  const divisionRow = screen
    .getAllByRole("row")
    .find((r) => r.textContent?.includes("Division"))
  expect(divisionRow).toBeUndefined()
})
