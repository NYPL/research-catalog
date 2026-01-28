import React from "react"
import { render, screen } from "../../../src/utils/testUtils"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

import BibPage from "../../../pages/bib/[id]"
import {
  bibWithSupplementaryContent as bibNoItems,
  bibWithItems,
  bibWithManyItems,
  parallelsBib as bibNoElectronicResources,
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
    expect(screen.getAllByTestId("publication-date")[0]).toHaveTextContent(
      "Vol. 1, issue 1-"
    )
    expect(screen.getByTestId("description")).toHaveTextContent(
      "v. : ill. ; 22 cm."
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
    expect(screen.getByTestId("current-frequency")).toHaveTextContent(
      "Semiannual"
    )
    expect(screen.getByTestId("lccn")).toHaveTextContent("sn 98001765")
    expect(screen.getByTestId("issn")).toHaveTextContent("1521-1371")

    // Research call number duplicates call number
    expect(screen.queryByTestId("research-call-number")).not.toBeInTheDocument()
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

  it("renders the electronic resources component when there are electronic resources", () => {
    expect(screen.queryByTestId("electronic-resources")).toBeInTheDocument()
  })
})

describe("Bib Page no electronic resources", () => {
  beforeEach(() => {
    render(
      <BibPage
        discoveryBibResult={bibNoElectronicResources.resource}
        annotatedMarc={bibNoElectronicResources.annotatedMarc}
        isAuthenticated={false}
      />
    )
  })

  it("does not render the electronic resources component when there are no electronic resources", () => {
    expect(screen.queryByTestId("electronic-resources")).not.toBeInTheDocument()
  })
})

describe("Bib Page Item Table general", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ success: true }),
      })
    )

    render(
      <BibPage
        discoveryBibResult={bibWithItems.resource}
        annotatedMarc={bibWithItems.annotatedMarc}
        isAuthenticated={false}
      />
    )
  })

  it("renders the filters container and populates the checkboxes", async () => {
    expect(screen.getByTestId("item-filters-container")).toBeInTheDocument()
    const checkboxGroups = screen.getAllByTestId("checkbox-group")
    expect(checkboxGroups).toHaveLength(2)

    expect(checkboxGroups[0].querySelectorAll("input")).toHaveLength(2)
    expect(checkboxGroups[1].querySelectorAll("input")).toHaveLength(1)
  })

  it("updates the router when filter checkboxes are clicked", async () => {
    const checkboxGroups = screen.getAllByTestId("checkbox-group")

    await userEvent.click(checkboxGroups[0].querySelector("input"))
    expect(mockRouter.asPath).toBe("/bib/b15080796?item_location=loc%3Amak32")

    await userEvent.click(
      screen.getByLabelText("remove 1 item selected from Location")
    )
    expect(mockRouter.asPath).toBe("/bib/b15080796")
  })

  it("updates the router when year filter is submitted", async () => {
    const yearFilter = screen.queryByTestId("year-filter")
    const yearField = screen.queryByPlaceholderText("YYYY")
    await userEvent.type(yearField, "2005")

    await userEvent.click(yearFilter.querySelector("button[type='submit']"))

    expect(mockRouter.asPath).toBe("/bib/b15080796?item_date=2005")
  })

  it("clears the year filter when the year tag is clicked", async () => {
    const yearTag = screen.queryByText("Year > 2005").closest("button")
    await userEvent.click(yearTag)

    expect(mockRouter.asPath).toBe("/bib/b15080796")
  })

  it("shows an error and doesn't update router when an invalid year is submitted", async () => {
    const yearFilter = screen.queryByTestId("year-filter")
    const yearField = screen.queryByPlaceholderText("YYYY")

    // blank year
    await userEvent.click(yearFilter.querySelector("button[type='submit']"))
    expect(mockRouter.asPath).toBe("/bib/b15080796")
    expect(
      screen.queryByText("There was a problem. Please enter a valid year.")
    ).toBeInTheDocument()

    // non-numeric
    await userEvent.type(yearField, "ABCD")
    await userEvent.click(yearFilter.querySelector("button[type='submit']"))
    expect(mockRouter.asPath).toBe("/bib/b15080796")
    expect(
      screen.queryByText("There was a problem. Please enter a valid year.")
    ).toBeInTheDocument()

    // not of length 4
    await userEvent.type(yearField, "1")
    await userEvent.click(yearFilter.querySelector("button[type='submit']"))
    expect(mockRouter.asPath).toBe("/bib/b15080796")
    expect(
      screen.queryByText("There was a problem. Please enter a valid year.")
    ).toBeInTheDocument()
  })

  it("clears a filter group when the MultiSelect clear button is clicked", async () => {
    const checkboxGroups = screen.getAllByTestId("checkbox-group")

    await userEvent.click(checkboxGroups[1].querySelector("input"))

    expect(mockRouter.asPath).toBe("/bib/b15080796?item_status=status%3Aa")

    await userEvent.click(
      screen.getByLabelText("remove 1 item selected from Status")
    )

    expect(mockRouter.asPath).toBe("/bib/b15080796")
  })

  it("renders TagSet for applied filters and clears filters via tag click", async () => {
    await userEvent.click(
      screen.getAllByTestId("checkbox-group")[1].querySelector("input")
    )

    const tagButton = screen.queryByTestId("ds-tagSetFilter-tags")
    expect(tagButton).toHaveTextContent("Status > Available")
    expect(mockRouter.asPath).toBe("/bib/b15080796?item_status=status%3Aa")

    await userEvent.click(tagButton)
    expect(screen.queryByTestId("ds-tagSetFilter-tags")).not.toBeInTheDocument()
    expect(mockRouter.asPath).toBe("/bib/b15080796")
  })

  it("TagSet should display a clear all button that clears all filters on click", async () => {
    await userEvent.click(
      screen.getAllByTestId("checkbox-group")[0].querySelector("input")
    )
    await userEvent.type(screen.queryByPlaceholderText("YYYY"), "2005")

    await userEvent.click(
      screen.queryByTestId("year-filter").querySelector("button[type='submit']")
    )

    expect(mockRouter.asPath).toBe(
      "/bib/b15080796?item_location=loc%3Amak32&item_date=2005"
    )
    await userEvent.click(screen.getByText("Clear filters"))

    expect(mockRouter.asPath).toBe("/bib/b15080796")
    expect(screen.queryByTestId("ds-tagSetFilter-tags")).not.toBeInTheDocument()
    expect(screen.queryByPlaceholderText("YYYY")).toHaveValue("")
  })
})

describe("Bib Page Item Table many items", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ success: true }),
      })
    )

    render(
      <BibPage
        discoveryBibResult={bibWithManyItems.resource}
        annotatedMarc={bibWithManyItems.annotatedMarc}
        isAuthenticated={false}
      />
    )
  })

  it("renders pagination when there are more than 20 items and updates the router on page button clicks", async () => {
    expect(
      screen.queryByText("Displaying 1-20 of 26 items")
    ).toBeInTheDocument()

    expect(screen.getByLabelText("Pagination")).toBeInTheDocument()

    const pageButton = screen.getByLabelText("Page 2")
    await userEvent.click(pageButton)
    expect(mockRouter.asPath).toBe("/bib/pb5579193?item_page=2")
  })

  it("renders a view all button when there are more than 20 items and updates the url to /all when clicked", async () => {
    const viewAllLink = screen.getByText(/View all 26 items/).closest("a")
    expect(viewAllLink).toHaveAttribute("href", "/bib/pb5579193/all")
    await userEvent.click(viewAllLink)
    expect(mockRouter.asPath).toBe("/bib/pb5579193/all")
  })

  it("shows 'view fewer items' button on /all route even when no filters are applied", async () => {
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
    await userEvent.click(screen.getByText(/View all 26 items/).closest("a"))
    expect(mockRouter.asPath).toBe("/bib/pb5579193/all")

    expect(screen.getByText("View fewer items")).toBeInTheDocument()
    expect(screen.queryByTestId("ds-tagSetFilter-tags")).not.toBeInTheDocument()

    await userEvent.click(screen.getByText("View fewer items"))
    expect(mockRouter.asPath).toBe("/bib/pb5579193")
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
    await userEvent.click(screen.getByText(/View all 26 items/).closest("a"))
    expect(screen.getByText(/View fewer items/)).toBeInTheDocument()
    expect(screen.getByTestId("bib-details-item-table")).toBeInTheDocument()
  })

  it("shows the correct loading copy when the user is waiting after view all is clicked", async () => {
    global.fetch = jest.fn().mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 50)
        })
    )
    await userEvent.click(screen.getByText(/View all 26 items/).closest("a"))
    expect(
      screen.queryByText("Loading all 26 items. This may take a few moments...")
    ).toBeInTheDocument()
  })

  it("shows an error when the item fetch fails", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        ok: false,
      })
    )
    await userEvent.click(screen.getByText(/View all 26 items/).closest("a"))
    expect(
      screen.getByText(
        "There was an error fetching items. Please try again with a different query."
      )
    ).toBeInTheDocument()
  })
})

describe("Bib not found", () => {
  render(
    <BibPage
      errorStatus={404}
      discoveryBibResult={undefined}
      annotatedMarc={undefined}
    />
  )
  expect(screen.getByText("We couldn't find that page")).toBeInTheDocument()
})

describe("Bib error", () => {
  render(
    <BibPage
      errorStatus={400}
      discoveryBibResult={undefined}
      annotatedMarc={undefined}
    />
  )
  expect(screen.getByText("There was an unexpected error")).toBeInTheDocument()
})
