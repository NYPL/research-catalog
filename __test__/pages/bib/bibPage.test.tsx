import React from "react"
import { render, screen } from "../../../src/utils/testUtils"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

import BibPage from "../../../pages/bib/[id]"
import {
  bibWithSupplementaryContent as bibNoItems,
  bibWithItems,
  bibWithManyItems,
} from "../../fixtures/bibFixtures"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Bib Page with items", () => {
  beforeEach(() => {
    render(
      <BibPage
        discoveryBibResult={bibWithItems.resource}
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
    expect(screen.getAllByTestId("title")[0]).toHaveTextContent(
      "Urban spaghetti."
    )
    expect(screen.getByTestId("published-by")).toHaveTextContent(
      "Mansfield, Ohio : Urban Spaghetti, [1999?-"
    )
  })

  it("renders the bib page item table when there are physical items in the bib", () => {
    expect(screen.getByTestId("bib-details-item-table")).toBeInTheDocument()
  })

  it("renders the bottom bib details", () => {
    expect(screen.getByTestId("publication-date")).toHaveTextContent(
      "Vol. 1, issue 1-"
    )
    expect(screen.getByTestId("description")).toHaveTextContent(
      "v. : ill.; 22 cm."
    )
    expect(screen.getByTestId("donor-sponsor")).toHaveTextContent(
      "Gift of the DeWitt Wallace Endowment Fund, named in honor of the founder of Reader's Digest"
    )
    expect(screen.getByTestId("alternative-title")).toHaveTextContent(
      "Urban spaghetti literary arts journal"
    )
    expect(screen.getByTestId("subject")).toHaveTextContent("Arts, Modern")
    expect(screen.getAllByTestId("call-number")[0]).toHaveTextContent(
      "JFK 01-374"
    )
    expect(screen.getAllByTestId("title")[1]).toHaveTextContent(
      "Urban spaghetti."
    )
    expect(screen.getByTestId("imprint")).toHaveTextContent(
      "Mansfield, Ohio : Urban Spaghetti, [1999?-"
    )
    expect(screen.getByTestId("current-frequency")).toHaveTextContent(
      "Semiannual"
    )
    expect(screen.getByTestId("abbreviated-title")).toHaveTextContent(
      "Urban spaghetti"
    )
    expect(screen.getByTestId("cover-title")).toHaveTextContent(
      "Urban spaghetti literary arts journal"
    )
    expect(screen.getByTestId("lccn")).toHaveTextContent("sn 98001765")
    expect(screen.getByTestId("issn")).toHaveTextContent("1521-1371")
    expect(screen.getByTestId("research-call-number")).toHaveTextContent(
      "JFK 01-374"
    )
  })
})

describe("Bib Page no items", () => {
  beforeEach(() => {
    render(
      <BibPage
        discoveryBibResult={bibNoItems.resource}
        annotatedMarc={bibNoItems.annotatedMarc}
        isAuthenticated={false}
      />
    )
  })

  it("does not render an item table when there are no physical items in the bib", () => {
    expect(
      screen.queryByTestId("bib-details-item-table")
    ).not.toBeInTheDocument()
  })
})

describe("Bib Page Item Table", () => {
  beforeEach(() => {
    render(
      <BibPage
        discoveryBibResult={bibWithManyItems.resource}
        annotatedMarc={bibWithManyItems.annotatedMarc}
        isAuthenticated={false}
      />
    )
  })

  it.todo("renders the item filters container")

  it("renders pagination when there are more than 20 items and updates the router on page button clicks", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ success: true }),
      })
    )
    expect(
      screen.queryByText("Displaying 1-20 of 26 items")
    ).toBeInTheDocument()

    expect(screen.getByLabelText("Pagination")).toBeInTheDocument()

    const pageButton = screen.getByLabelText("Page 2")
    await userEvent.click(pageButton)
    expect(mockRouter.asPath).toBe("/bib/pb5579193?item_page=2")
  })

  it("renders a view all button when there are more than 20 items and updates the url to /all when clicked", async () => {
    const viewAllLink = screen.getByText("View All 26 Items").closest("a")
    expect(viewAllLink).toHaveAttribute(
      "href",
      "/research/research-catalog/bib/pb5579193/all"
    )
    await userEvent.click(viewAllLink)
    expect(mockRouter.asPath).toBe("/bib/pb5579193/all")
  })

  it("shows all the items when the view all button is clicked", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            status: 200,
            discoveryBibResult: bibWithManyItems.resource,
            items: Array(26).fill({}),
          }),
      })
    )
    await userEvent.click(screen.getByText("View All 26 Items").closest("a"))
    expect(screen.getByText("View fewer items")).toBeInTheDocument()
    expect(screen.getByTestId("bib-details-item-table")).toBeInTheDocument()
  })

  it("shows the correct loading copy when the user is waiting after view all is clicked", async () => {
    global.fetch = jest.fn().mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 50)
        })
    )
    await userEvent.click(screen.getByText("View All 26 Items").closest("a"))
    expect(
      screen.getByText("Loading all 26 items. This may take a few moments...")
    ).toBeInTheDocument()
  })

  it("shows an error when the item fetch fails", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        ok: false,
      })
    )
    await userEvent.click(screen.getByText("View All 26 Items").closest("a"))
    expect(
      screen.getByText(
        "There was an error fetching items. Please try again with a different query."
      )
    ).toBeInTheDocument()
  })
})
