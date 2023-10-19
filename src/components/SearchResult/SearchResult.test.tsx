import React from "react"
import { render, screen } from "@testing-library/react"
import SearchResult from "./SearchResult"
import SearchResultsBib from "../../models/SearchResultsBib"

describe("SearchResult with Physical Items", () => {
  beforeEach(() => {
    const bib = new SearchResultsBib({ numItemsTotal: 2 })
    bib.title = "Bib Title"
    bib.id = "b12345678"
    bib.materialType = "Text"
    bib.publicationStatement = "Publication Statement"
    bib.yearPublished = "1999"
    render(<SearchResult bib={bib} />)
  })

  it("renders a title link with the correct bib href", async () => {
    const resultTitleLink = screen.getByRole("link", { name: "Bib Title" })
    expect(resultTitleLink).toHaveAttribute("href", "/bib/b12345678")
  })

  it("renders the primary bib fields", async () => {
    screen.getByText("Text")
    screen.getByText("Publication Statement")
    screen.getByText("1999")
    screen.getByText("2 Items")
  })
})

describe("SearchResult with Electronic Resources", () => {
  it("renders the correct item message for bib with electronic resources", async () => {
    const bib = new SearchResultsBib({ electronicResources: [{}] })
    render(<SearchResult bib={bib} />)
    screen.getByText("1 Resource")
  })
})
