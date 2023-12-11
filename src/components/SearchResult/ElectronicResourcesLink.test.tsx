import React from "react"
import { render, screen } from "@testing-library/react"
import ElectronicResourcesLink from "./ElectronicResourcesLink"
import SearchResultsBib from "../../models/SearchResultsBib"
import {
  searchResultElectronicResources,
    searchResultElectronicResourcesNoLabel,
  searchResultMultipleElectronicResources,
} from "../../../__test__/fixtures/searchResultElectronicResources"

describe("Electronic Resources Link with a single resource", () => {
  beforeEach(() => {
    const bib = new SearchResultsBib(searchResultElectronicResources)
    render(
      <ElectronicResourcesLink
        bibUrl={bib.url}
        electronicResources={bib.electronicResources}
      />
    )
  })

  it("renders the correct heading", async () => {
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Available Online"
    )
  })
  it("renders the correct link with the label as the text when only one electronic resource is available", async () => {
    const link = screen.getByRole("link", {
      name: "Access eNYPL",
    })
    expect(link).toHaveAttribute(
      "href",
      "https://link.overdrive.com/?websiteId=37&titleId=5312492"
    )
  })
})

describe("Electronic Resources Link with a single resource and no label", () => {
  it("renders the correct link with the url as the text when prefLabel is not available", async () => {
    const bib = new SearchResultsBib(searchResultElectronicResourcesNoLabel)
    render(
      <ElectronicResourcesLink
        bibUrl={bib.url}
        electronicResources={bib.electronicResources}
      />
    )
    const link = screen.getByRole("link", {
      name: "https://link.overdrive.com/?websiteId=37&titleId=5312492",
    })
    expect(link).toHaveAttribute(
      "href",
      "https://link.overdrive.com/?websiteId=37&titleId=5312492"
    )
  })
})

describe("Electronic Resources Link with multiple resources", () => {
  it("renders a link to the bib page when multiple resources are available", async () => {
    const bib = new SearchResultsBib(searchResultMultipleElectronicResources)
    render(
      <ElectronicResourcesLink
        bibUrl={bib.url}
        electronicResources={bib.electronicResources}
      />
    )

    const link = screen.getByRole("link", {
      name: "See All Available Online Resources",
    })
    expect(link).toHaveAttribute("href", "/bib/b22133121#electronic-resources")
  })
})
