import React from "react"
import { render, screen, waitFor } from "../../utils/testUtils"
import userEvent from "@testing-library/user-event"
import { ManageBibInList } from "./ManageBibInList"
import { PatronDataContext } from "../../context/PatronDataContext"
import { BASE_URL } from "../../config/constants"

// Mocking window behavior
const mockAssign = jest.fn()
const mockReplaceState = jest.fn()

Object.defineProperty(window, "location", {
  value: {
    href: "http://localhost/search",
    pathname: "/search",
    search: "",
    hash: "",
    assign: mockAssign,
  },
  writable: true,
})

Object.defineProperty(window, "history", {
  value: {
    replaceState: mockReplaceState,
  },
  writable: true,
})

const mockBib = { id: "b12345678" } as any

describe("ManageBibInList", () => {
  let mockSetStatus: jest.Mock
  let mockSetStatusMessage: jest.Mock
  let mockSetUpdatedAccountData: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockSetStatus = jest.fn()
    mockSetStatusMessage = jest.fn()
    mockSetUpdatedAccountData = jest.fn()
    window.location.search = ""
  })

  const renderWithContext = (lists: any[] = [], isAuthenticated = true) => {
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
        <ManageBibInList
          recordId={mockBib.id}
          isAuthenticated={isAuthenticated}
          setStatus={mockSetStatus}
          setStatusMessage={mockSetStatusMessage}
        />
      </PatronDataContext.Provider>
    )
  }

  it("renders 'Save' when the user is not authenticated", () => {
    renderWithContext([], false)
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument()
  })

  it("renders 'Save' when the user is authenticated but the record is not in any list", () => {
    renderWithContext([{ id: "list-1", isDefaultList: true, records: [] }])
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument()
  })

  it("renders 'Remove' when the user is authenticated, has only the default list, and the record is saved", () => {
    renderWithContext([
      { id: "list-1", isDefaultList: true, records: [{ uri: "b12345678" }] },
    ])
    expect(screen.getByRole("button", { name: /Remove/i })).toBeInTheDocument()
  })

  it("renders 'Manage' when the user is authenticated, has multiple lists, and the record is saved", () => {
    renderWithContext([
      { id: "list-1", isDefaultList: true, records: [{ uri: "b12345678" }] },
      { id: "list-2", isDefaultList: false, records: [] },
    ])
    expect(screen.getByRole("button", { name: /Manage/i })).toBeInTheDocument()
  })

  it("redirects to login when unauthenticated user clicks the button", async () => {
    renderWithContext([], false)
    await userEvent.click(screen.getByRole("button", { name: /Save/i }))
    expect(mockAssign).toHaveBeenCalledWith(
      expect.stringContaining("redirect_uri")
    )
  })

  it("adds the record to the default list and sets success status on click", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        list: { id: "list-1", recordCount: 1, records: [{ uri: "b12345678" }] },
      }),
    } as Response)

    renderWithContext([{ id: "list-1", isDefaultList: true, records: [] }])

    await userEvent.click(screen.getByRole("button", { name: /Save/i }))

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/api/account/lists/records?uris=b12345678`,
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ patronId: "12345", listId: "list-1" }),
      })
    )

    await waitFor(() => {
      expect(mockSetStatus).toHaveBeenCalledWith("success")
    })
    expect(mockSetStatusMessage).toHaveBeenCalled()
    expect(mockSetUpdatedAccountData).toHaveBeenCalled()
  })

  it("removes the record from the default list and sets success status on click", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        list: { id: "list-1", recordCount: 0, records: [] },
      }),
    } as Response)

    renderWithContext([
      { id: "list-1", isDefaultList: true, records: [{ uri: "b12345678" }] },
    ])

    await userEvent.click(screen.getByRole("button", { name: /Remove/i }))

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/api/account/lists/records?uris=b12345678`,
      expect.objectContaining({
        method: "DELETE",
        body: JSON.stringify({ patronId: "12345", listId: "list-1" }),
      })
    )

    await waitFor(() => {
      expect(mockSetStatus).toHaveBeenCalledWith("success")
    })
    expect(mockSetStatusMessage).toHaveBeenCalled()
    expect(mockSetUpdatedAccountData).toHaveBeenCalled()
  })

  it("opens the menu when Manage is clicked", async () => {
    renderWithContext([
      {
        id: "list-1",
        listName: "List 1",
        isDefaultList: true,
        records: [{ uri: "b12345678" }],
      },
      { id: "list-2", listName: "List 2", isDefaultList: false, records: [] },
    ])

    expect(screen.queryByText("Select lists")).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: /Manage/i }))
    expect(screen.getByText("Select lists")).toBeInTheDocument()
  })

  it("handles delete failure (no records to delete)", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    } as Response)

    renderWithContext([{ id: "list-1", isDefaultList: true, records: [] }])

    await userEvent.click(screen.getByRole("button", { name: /Save/i }))

    await waitFor(() => {
      expect(mockSetStatus).toHaveBeenCalledWith("failure")
    })
    expect(mockSetStatusMessage).toHaveBeenCalledWith(
      "This record could not be saved."
    )
  })

  it("focuses the expected button from the URL search params", () => {
    window.location.search = "?focus=manage-bib-b12345678"

    const focusSpy = jest.spyOn(HTMLButtonElement.prototype, "focus")

    renderWithContext([{ id: "list-1", isDefaultList: true, records: [] }])
    expect(focusSpy).toHaveBeenCalled()
    expect(mockReplaceState).toHaveBeenCalled()

    focusSpy.mockRestore()
  })
})
