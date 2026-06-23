import React from "react"
import { render, screen, within } from "../../../utils/testUtils"
import { processedPatron } from "../../../../__test__/fixtures/processedMyAccountData"
import userEvent from "@testing-library/user-event"
import ListsTab from "./ListsTab"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import { BASE_URL } from "../../../config/constants"
import { pickupLocations } from "../../../../__test__/fixtures/rawSierraAccountData"
import { processedLists } from "../../../../__test__/fixtures/listFixtures"
import type { List } from "../../../types/listTypes"
import mockRouter from "next-router-mock"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

const renderWithPatronDataContext = (lists: List[] = processedLists) => {
  return render(
    <PatronDataProvider
      value={{
        lists,
        patron: processedPatron,
        pickupLocations: pickupLocations as any,
      }}
    >
      <ListsTab />
    </PatronDataProvider>
  )
}

describe("ListsTab", () => {
  beforeEach(() => {
    window.localStorage.clear()
    jest.clearAllMocks()
    mockRouter.query = { index: ["lists"] }
  })

  it("renders the create button and sort menu", () => {
    renderWithPatronDataContext()
    expect(screen.getByText("Create new list")).toBeInTheDocument()
    expect(screen.getByText(/Sort by:/)).toBeInTheDocument()
  })

  it("renders each list as a row", () => {
    renderWithPatronDataContext()
    const table = screen.getByTestId("list-table")
    const rows = within(table).getAllByRole("row")

    // Header row and 2 lists
    expect(rows.length).toBe(3)

    expect(
      within(rows[1]).getByText("My workspace (default list)")
    ).toBeInTheDocument()
    expect(
      within(rows[1]).getByText("Default list - cannot delete")
    ).toBeInTheDocument()
    expect(within(rows[1]).getByText("0")).toBeInTheDocument()

    expect(within(rows[2]).getByText("Spaghetti westerns")).toBeInTheDocument()
    expect(within(rows[2]).getByText("all about spaghetti")).toBeInTheDocument()
    expect(within(rows[2]).getByText("1")).toBeInTheDocument()
  })

  it("renders a placeholder when a list has no description", () => {
    const listsWithoutDescription: List[] = [
      {
        ...processedLists[1],
        description: null,
      } as unknown as List,
    ]
    renderWithPatronDataContext(listsWithoutDescription)
    expect(screen.getByText("No description")).toBeInTheDocument()
  })

  it("calls sort endpoint when a sort option is selected and updates lists", async () => {
    const sortedListsResponse = [
      processedLists[1],
      processedLists[0],
    ] as unknown as List[]

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ lists: sortedListsResponse }),
    } as Response)

    renderWithPatronDataContext()

    const sortMenu = screen.getByLabelText("Sort by:", { exact: false })
    userEvent.click(sortMenu)
    await userEvent.click(screen.getByText("List name (A - Z)"))

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/api/account/lists?patronId=${processedPatron.id}&sort=list_name_asc`
    )

    // Confirm rows flipped order
    const table = await screen.findByTestId("list-table")
    const rows = within(table).getAllByRole("row")

    // Now Spaghetti westerns should be in the first row
    expect(within(rows[1]).getByText("Spaghetti westerns")).toBeInTheDocument()
    expect(
      within(rows[2]).getByText("My workspace (default list)")
    ).toBeInTheDocument()
  })

  it("renders a single list display when the URL matches", () => {
    mockRouter.query = { index: ["lists", "123", "my-special-list"] }
    const listsWithId123 = [
      {
        ...processedLists[0],
        id: "123",
        listName: "My special list",
        description: "A special description",
      } as unknown as List,
    ]
    renderWithPatronDataContext(listsWithId123)

    expect(screen.getByText("Back to all lists")).toBeInTheDocument()
    expect(screen.getByText("My special list")).toBeInTheDocument()
    expect(screen.getByText("A special description")).toBeInTheDocument()
    expect(screen.queryByText("Create new list")).not.toBeInTheDocument()
  })

  it("renders an empty list message when the list has no records", () => {
    mockRouter.query = { index: ["lists", "123", "empty-list"] }
    const emptyList = [
      {
        ...processedLists[0],
        id: "123",
        listName: "Empty list",
        recordCount: 0,
        records: [],
      } as unknown as List,
    ]
    renderWithPatronDataContext(emptyList)

    expect(screen.getByText("This list is currently empty")).toBeInTheDocument()
    expect(screen.getByText(/Search the Research Catalog/)).toBeInTheDocument()
  })

  it("fetches and displays records in a single list", async () => {
    mockRouter.query = { index: ["lists", "123", "my-list"] }
    const listWithRecords = [
      {
        ...processedLists[0],
        id: "123",
        listName: "My list",
        recordCount: 2,
        records: [
          {
            uri: "b123",
            title: "Record 1",
            addedFormattedDate: "01/01/2023",
          },
          {
            uri: "b456",
            addedFormattedDate: "01/02/2023",
            title: "Record 2",
          },
        ],
      } as unknown as List,
    ]

    const mockBibData = {
      bibData: [
        {
          result: {
            uri: "b123",
            titleDisplay: ["First Book"],
            shelfMark: ["Call Number 1"],
            location: "Location 1",
            numItemsTotal: 1,
          },
        },
        {
          result: {
            uri: "b456",
            titleDisplay: ["Second Book"],
            shelfMark: ["Call Number 2"],
            location: "Location 2",
            numItemsTotal: 2,
          },
        },
      ],
    }

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockBibData,
    } as Response)

    renderWithPatronDataContext(listWithRecords)

    expect(screen.getByText("My list")).toBeInTheDocument()
    expect(
      screen.getByText("Sort by: Date added (new to old)")
    ).toBeInTheDocument()

    const table = await screen.findByTestId("list-records-table")
    const rows = within(table).getAllByRole("row")

    expect(rows.length).toBe(3)

    expect(within(rows[1]).getByText("Second Book")).toBeInTheDocument()
    expect(within(rows[1]).getByText("(2 items)")).toBeInTheDocument()
    expect(within(rows[1]).getByText("Call Number 2")).toBeInTheDocument()
    //expect(within(rows[1]).getByText("Location 2")).toBeInTheDocument()
    expect(within(rows[1]).getByText("01/02/2023")).toBeInTheDocument()

    expect(within(rows[2]).getByText("First Book")).toBeInTheDocument()
    expect(within(rows[2]).getByText("Call Number 1")).toBeInTheDocument()
    //expect(within(rows[2]).getByText("Location 1")).toBeInTheDocument()
    expect(within(rows[2]).getByText("01/01/2023")).toBeInTheDocument()

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/api/account/lists/records?uris=b456,b123`
    )
  })

  it("renders pagination when the list has more than 20 records", async () => {
    mockRouter.query = { index: ["lists", "123", "long-list"] }
    const records = Array.from({ length: 25 }, (_, i) => ({
      uri: `b${i}`,
      addedFormattedDate: "01/01/2023",
      addedToListDate: "2023-01-01T12:00:00Z",
    }))

    const longList = [
      {
        ...processedLists[0],
        id: "123",
        listName: "Long list",
        recordCount: 25,
        records,
      } as unknown as List,
    ]

    const mockBibData = {
      bibData: Array.from({ length: 20 }, (_, i) => ({
        result: {
          uri: `b${i}`,
          titleDisplay: [`Book ${i}`],
        },
      })),
    }

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockBibData,
    } as Response)

    renderWithPatronDataContext(longList)

    const table = await screen.findByTestId("list-records-table")
    expect(table).toBeInTheDocument()

    expect(
      screen.getByText("Displaying 1-20 of 25 records")
    ).toBeInTheDocument()
  })

  it("navigates back to all lists", async () => {
    mockRouter.query = { index: ["lists", "123", "my-special-list"] }
    mockRouter.asPath = "/account/lists/123/my-special-list"
    const pushSpy = jest.spyOn(mockRouter, "push")
    const listsWithId123 = [
      {
        ...processedLists[0],
        id: "123",
        listName: "My special list",
      } as unknown as List,
    ]
    renderWithPatronDataContext(listsWithId123)

    const backLink = screen.getByText("Back to all lists")
    await userEvent.click(backLink)

    expect(pushSpy).toHaveBeenCalledWith(
      { pathname: "/account/[[...index]]", query: { index: ["lists"] } },
      "/account/lists",
      { shallow: true }
    )
  })

  it("does not render the Delete or Edit options for the default list in the all lists view", async () => {
    const defaultList = {
      ...processedLists[0],
      id: "999",
      listName: "My workspace (default list)",
      isDefaultList: true,
    } as unknown as List

    renderWithPatronDataContext([defaultList])

    const optionsMenuButton = screen.getByLabelText("Options")
    await userEvent.click(optionsMenuButton)

    expect(screen.getByText("Duplicate")).toBeInTheDocument()
    expect(screen.queryByText("Delete")).not.toBeInTheDocument()
    expect(screen.queryByText("Edit")).not.toBeInTheDocument()
  })

  it("does not render the Delete or Edit buttons for the default list in the single list view", () => {
    mockRouter.query = { index: ["lists", "999", "my-workspace-default-list"] }
    const defaultList = {
      ...processedLists[0],
      id: "999",
      listName: "My workspace (default list)",
      isDefaultList: true,
    } as unknown as List

    renderWithPatronDataContext([defaultList])

    expect(screen.getByText("My workspace (default list)")).toBeInTheDocument()
    expect(screen.getByText("Duplicate")).toBeInTheDocument()
    expect(screen.queryByText("Delete")).not.toBeInTheDocument()
    expect(screen.queryByText("Edit")).not.toBeInTheDocument()
  })
})
