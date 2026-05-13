import React from "react"
import { render, screen, within } from "../../../utils/testUtils"
import { processedPatron } from "../../../../__test__/fixtures/processedMyAccountData"
import userEvent from "@testing-library/user-event"
import ListsTab from "./ListsTab"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import { BASE_URL } from "../../../config/constants"
import { pickupLocations } from "../../../../__test__/fixtures/rawSierraAccountData"
import { listsResponse } from "../../../../__test__/fixtures/listFixtures"
import type { ListResult } from "../../../types/listTypes"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

const renderWithPatronDataContext = (
  lists: ListResult[] = listsResponse as ListResult[]
) => {
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

    expect(within(rows[1]).getByText("First list")).toBeInTheDocument()
    expect(within(rows[1]).getByText("No description")).toBeInTheDocument()
    expect(within(rows[1]).getByText("0")).toBeInTheDocument()

    expect(within(rows[2]).getByText("Spaghetti westerns")).toBeInTheDocument()
    expect(within(rows[2]).getByText("all about spaghetti")).toBeInTheDocument()
    expect(within(rows[2]).getByText("1")).toBeInTheDocument()
  })

  it("renders a placeholder when a list has no description", () => {
    const listsWithoutDescription: ListResult[] = [
      {
        ...listsResponse[1],
        description: null,
      } as unknown as ListResult,
    ]
    renderWithPatronDataContext(listsWithoutDescription)
    expect(screen.getByText("No description")).toBeInTheDocument()
  })

  it("calls sort endpoint when a sort option is selected and updates lists", async () => {
    const sortedListsResponse = [
      listsResponse[1],
      listsResponse[0],
    ] as unknown as ListResult[]

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ lists: sortedListsResponse }),
    } as Response)

    renderWithPatronDataContext()

    const sortMenu = screen.getByLabelText("Sort by:", { exact: false })
    userEvent.click(sortMenu)
    await userEvent.click(screen.getByText("List name (A-Z)"))

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/api/account/lists?patronId=${processedPatron.id}&sort=list_name_asc`
    )

    // Confirm rows flipped order
    const table = await screen.findByTestId("list-table")
    const rows = within(table).getAllByRole("row")

    // Now Spaghetti westerns should be in the first row
    expect(within(rows[1]).getByText("Spaghetti westerns")).toBeInTheDocument()
    expect(within(rows[2]).getByText("First list")).toBeInTheDocument()
  })
})
