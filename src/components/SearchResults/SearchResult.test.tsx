import React from "react"
import { render, screen } from "../../utils/testUtils"
import SearchResult from "./SearchResult"
import SearchResultsBib from "../../models/SearchResultsBib"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"
import { searchResultManyPhysicalItems } from "../../../__test__/fixtures/searchResultManyPhysicalItems"
import { searchResultElectronicResources } from "../../../__test__/fixtures/searchResultElectronicResources"
import {
  bibWithElectronicResourcesAndFindingAid,
  bibWithItems,
} from "../../../__test__/fixtures/bibFixtures"
import type { DiscoveryBibResult } from "../../types/bibTypes"

describe("SearchResult with Physical Items", () => {
  beforeEach(() => {
    const bib = new SearchResultsBib(searchResultPhysicalItems)
    render(<SearchResult bib={bib} />)
  })

  it("renders a title link with the correct bib href", async () => {
    const resultTitleLink = screen.getByRole("link", {
      name: "A history of spaghetti eating and cooking for: spaghetti dinner.",
    })
    expect(resultTitleLink).toHaveAttribute(
      "href",
      "/research/research-catalog/bib/b12810991"
    )
  })

  it("renders the primary bib fields", async () => {
    screen.getByText("Material")
    screen.getByText("New York, Abelard-Schuman [1955]")
    screen.getByText("1955")
    screen.getByText("2 items")
  })
})

describe("SearchResult with Many Physical Items", () => {
  beforeEach(() => {
    const bib = new SearchResultsBib(
      searchResultManyPhysicalItems as DiscoveryBibResult
    )
    render(<SearchResult bib={bib} />)
  })

  it("renders a link to the bib page with the correct text when there are more than the set limit of items per search result", async () => {
    const resultTitleLink = screen.getByRole("link", {
      name: "View all 4 items",
    })
    expect(resultTitleLink).toHaveAttribute(
      "href",
      "/research/research-catalog/bib/b14753192#item-table"
    )
  })
})

describe("SearchResult with Electronic Resources", () => {
  it("renders the correct item message for bib with electronic resources", () => {
    const bib = new SearchResultsBib(searchResultElectronicResources)
    render(<SearchResult bib={bib} />)
    screen.getByText("1 resource")
  })
  it("renders a finding aid message and electronic resource information", () => {
    const bib = new SearchResultsBib(bibWithElectronicResourcesAndFindingAid)
    render(<SearchResult bib={bib} />)
    expect(screen.getByText("Collection information")).toBeInTheDocument()
    expect(screen.getByText("Available online")).toBeInTheDocument()
  })
  it("renders only a finding aid message and no electronic resource information", () => {
    const bib = new SearchResultsBib({
      ...bibWithElectronicResourcesAndFindingAid,
      electronicResources: [],
    })
    render(<SearchResult bib={bib} />)
    expect(screen.getByText("Collection information")).toBeInTheDocument()
    expect(screen.queryByText("Available online")).not.toBeInTheDocument()
  })
  it("renders no finding aid message and only electronic resource information", () => {
    const bib = new SearchResultsBib({
      ...bibWithElectronicResourcesAndFindingAid,
      supplementaryContent: [],
    })
    render(<SearchResult bib={bib} />)
    expect(screen.getByText("Available online")).toBeInTheDocument()
    expect(screen.queryByText("Collection information")).not.toBeInTheDocument()
  })
  it("renders finding aid status badge", () => {
    const bib = new SearchResultsBib(bibWithElectronicResourcesAndFindingAid)
    render(<SearchResult bib={bib} />)
    expect(screen.getByText("FINDING AID AVAILABLE")).toBeInTheDocument()
  })
})
