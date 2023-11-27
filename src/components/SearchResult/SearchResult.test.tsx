import React from "react"
import { render, screen } from "@testing-library/react"
import SearchResult from "./SearchResult"
import SearchResultsBib from "../../models/SearchResultsBib"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"
import { searchResultElectronicResources } from "../../../__test__/fixtures/searchResultElectronicResources"

describe("SearchResult with Physical Items", () => {
  beforeEach(() => {
    const bib = new SearchResultsBib(searchResultPhysicalItems)
    render(<SearchResult bib={bib} />)
  })

  it("renders a title link with the correct bib href", async () => {
    const resultTitleLink = screen.getByRole("link", {
      name: "A history of spaghetti eating and cooking for: spaghetti dinner.",
    })
    expect(resultTitleLink).toHaveAttribute("href", "/bib/b12810991")
  })

  it("renders the primary bib fields", async () => {
    screen.getByText("Text")
    screen.getByText("New York, Abelard-Schuman [1955]")
    screen.getByText("1955")
    screen.getByText("2 Items")
  })
})

describe("SearchResult with Electronic Resources", () => {
  it("renders the correct item message for bib with electronic resources", async () => {
    const bib = new SearchResultsBib(searchResultElectronicResources)
    render(<SearchResult bib={bib} />)
    screen.getByText("1 Resource")
  })
})
