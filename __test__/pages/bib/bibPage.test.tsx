import React from "react"
import { render, screen } from "../../../src/utils/testUtils"

import BibPage from "../../../pages/bib/[id]"
import {
  bibWithSupplementaryContent as bibNoItems,
  bibWithItems,
} from "../../fixtures/bibFixtures"

describe("Bib Page with items", () => {
  beforeEach(() => {
    render(
      <BibPage
        bibResult={bibWithItems.resource}
        annotatedMarc={bibWithItems.annotatedMarc}
        isAuthenticated={false}
      />
    )
  })

  it("renders the bib title as an H2", () => {
    const headerText = "Urban spaghetti."
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      headerText
    )
  })

  it("renders the top bib details", () => {
    expect(screen.getAllByTestId("Title")[0]).toHaveTextContent(
      "Urban spaghetti."
    )
    expect(screen.getByTestId("Published By")).toHaveTextContent(
      "Mansfield, Ohio : Urban Spaghetti, [1999?-"
    )
  })

  it("renders the bib page item table when there are physical items in the bib", () => {
    expect(screen.getByTestId("bib-details-item-table")).toBeInTheDocument()
  })

  it("renders the bottom bib details", () => {
    expect(screen.getByTestId("Publication Date")).toHaveTextContent(
      "Vol. 1, issue 1-"
    )
    expect(screen.getByTestId("Description")).toHaveTextContent(
      "v. : ill.; 22 cm."
    )
    expect(screen.getByTestId("Donor/Sponsor")).toHaveTextContent(
      "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest"
    )
    expect(screen.getByTestId("Alternative Title")).toHaveTextContent(
      "Urban spaghetti literary arts journal"
    )
    expect(screen.getByTestId("Subject")).toHaveTextContent("Arts, Modern")
    expect(screen.getByTestId("Call Number")).toHaveTextContent("JFK 01-374")
    expect(screen.getAllByTestId("Title")[1]).toHaveTextContent(
      "Urban spaghetti."
    )
    expect(screen.getByTestId("Imprint")).toHaveTextContent(
      "Mansfield, Ohio : Urban Spaghetti, [1999?-"
    )
    expect(screen.getByTestId("Current Frequency")).toHaveTextContent(
      "Semiannual"
    )
    expect(screen.getByTestId("Abbreviated Title")).toHaveTextContent(
      "Urban spaghetti"
    )
    expect(screen.getByTestId("Cover Title")).toHaveTextContent(
      "Urban spaghetti literary arts journal"
    )
    expect(screen.getByTestId("LCCN")).toHaveTextContent("sn 98001765")
    expect(screen.getByTestId("ISSN")).toHaveTextContent("1521-1371")
    expect(screen.getByTestId("Research Call Number")).toHaveTextContent(
      "JFK 01-374"
    )
  })
})

describe("Bib Page no items", () => {
  beforeEach(() => {
    render(
      <BibPage
        bibResult={bibNoItems.resource}
        annotatedMarc={bibNoItems.annotatedMarc}
        isAuthenticated={false}
      />
    )
  })

  it("does not render an item table when there are no physical items in the bib", () => {
    render(
      <BibPage
        bibResult={bibNoItems.resource}
        annotatedMarc={bibNoItems.annotatedMarc}
        isAuthenticated={false}
      />
    )
    expect(
      screen.queryByTestId("bib-details-item-table")
    ).not.toBeInTheDocument()
  })
})
