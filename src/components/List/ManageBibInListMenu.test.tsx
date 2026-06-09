import React from "react"
import { render, screen, waitFor } from "../../utils/testUtils"
import userEvent from "@testing-library/user-event"
import { ManageBibInListMenu } from "./ManageBibInListMenu"
import { PatronDataContext } from "../../context/PatronDataContext"
import { BASE_URL } from "../../config/constants"
import { Popover } from "@chakra-ui/react"
import { STATIC_STATUS_MESSAGES } from "../../utils/statusUtils"

describe("ManageBibInListMenu", () => {
  let mockOnClose: jest.Mock
  let mockSetStatus: jest.Mock
  let mockSetUpdatedAccountData: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockOnClose = jest.fn()
    mockSetStatus = jest.fn()
    mockSetUpdatedAccountData = jest.fn()
    global.fetch = jest.fn()
  })

  const renderWithContext = (lists: any[] = []) => {
    const updatedAccountData = {
      patron: { id: "12345" },
      lists,
    }

    return render(
      <PatronDataContext.Provider
        value={
          {
            updatedAccountData,
            setUpdatedAccountData: mockSetUpdatedAccountData,
          } as any
        }
      >
        <Popover isOpen={true} onClose={mockOnClose}>
          <ManageBibInListMenu
            isOpen={true}
            onClose={mockOnClose}
            setStatus={mockSetStatus}
            recordId="b12345678"
          />
        </Popover>
      </PatronDataContext.Provider>
    )
  }

  it("renders the menu with lists and checkboxes", () => {
    renderWithContext([
      { id: "list-1", listName: "My List 1", records: [] },
      { id: "list-2", listName: "My List 2", records: [{ uri: "b12345678" }] },
    ])

    expect(screen.getByText("Select lists")).toBeInTheDocument()
    expect(
      screen.getByRole("checkbox", { name: /My List 1/i })
    ).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: /My List 2/i })).toBeChecked()
  })

  it("filters lists correctly when searching", async () => {
    renderWithContext([
      { id: "list-1", listName: "My first list", records: [] },
      { id: "list-2", listName: "Another list", records: [] },
    ])

    const searchInput = screen.getByPlaceholderText("Search for a list")
    await userEvent.type(searchInput, "Another")

    expect(
      screen.queryByRole("checkbox", { name: /My first list/i })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole("checkbox", { name: /Another list/i })
    ).toBeInTheDocument()
  })

  it("allows creating a new list", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        list: { id: "list-3", listName: "New list", records: [] },
      }),
    })

    renderWithContext([])

    await userEvent.click(
      screen.getByRole("button", { name: /Create new list/i })
    )

    const input = screen.getByLabelText(/List name/i)
    await userEvent.type(input, "New list")

    await userEvent.click(screen.getByRole("button", { name: "Create list" }))

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/api/account/lists/list`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          patronId: "12345",
          listName: "New list",
          description: "",
          records: [],
        }),
      })
    )

    await waitFor(() => {
      expect(screen.getByText(/List created/)).toBeInTheDocument()
    })
    expect(mockSetUpdatedAccountData).toHaveBeenCalled()
  })

  it("successfully updates which lists the bib is saved to/removed from", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ list: { id: "list-1" } }),
    })

    renderWithContext([
      { id: "list-1", listName: "My List 1", records: [] },
      { id: "list-2", listName: "My List 2", records: [{ uri: "b12345678" }] },
    ])

    // Check My List 1
    await userEvent.click(screen.getByText("My List 1"))

    // Uncheck My List 2
    await userEvent.click(screen.getByText("My List 2"))

    await userEvent.click(screen.getByRole("button", { name: "Save changes" }))

    expect(global.fetch).toHaveBeenCalledTimes(2)

    await waitFor(() => {
      expect(mockSetStatus).toHaveBeenCalledWith(
        STATIC_STATUS_MESSAGES["list-changes-success"]
      )
    })
    expect(mockOnClose).toHaveBeenCalled()
  })
})
