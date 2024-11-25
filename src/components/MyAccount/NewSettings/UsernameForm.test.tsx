import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import {
  emptyPatron,
  filteredPickupLocations,
  processedPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import UsernameForm from "./UsernameForm"

describe("username form", () => {
  const mockUsernameState = {
    setUsernameStatus: jest.fn(),
    setUsernameStatusMessage: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => {
        console.log("Updated")
      },
      status: 200,
    } as Response)
  })

  const component = (
    <PatronDataProvider
      value={{
        patron: processedPatron,
        pickupLocations: filteredPickupLocations,
      }}
    >
      <UsernameForm
        patron={processedPatron}
        usernameState={mockUsernameState}
      />
    </PatronDataProvider>
  )

  const noUsernameComponent = (
    <PatronDataProvider
      value={{
        patron: emptyPatron,
        pickupLocations: filteredPickupLocations,
      }}
    >
      <UsernameForm patron={emptyPatron} usernameState={mockUsernameState} />
    </PatronDataProvider>
  )

  it("renders correctly with initial username", () => {
    render(component)

    expect(screen.getByText(processedPatron.username)).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
  })

  it("renders correctly with when user has no username", () => {
    render(noUsernameComponent)

    expect(screen.getByText("+ Add username")).toBeInTheDocument()

    expect(screen.queryByRole("button", { name: /edit/i })).toBeNull()
  })

  it("allows editing when edit button is clicked", () => {
    render(component)
    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    expect(
      screen.getByLabelText(
        "Must be 5-15 characters and use only letters (a-z) and numbers (0-9)"
      )
    ).toBeInTheDocument()
    expect(
      screen.getByDisplayValue(processedPatron.username)
    ).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument()
    expect(screen.queryByText(/edit/)).not.toBeInTheDocument()
  })

  it("validates username input correctly", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getByLabelText(
      "Must be 5-15 characters and use only letters (a-z) and numbers (0-9)"
    )
    fireEvent.change(input, { target: { value: "!!!!!" } })

    expect(screen.getByRole("button", { name: /save changes/i })).toBeDisabled()
  })

  it("validates empty username correctly", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getByLabelText(
      "Must be 5-15 characters and use only letters (a-z) and numbers (0-9)"
    )
    fireEvent.change(input, { target: { value: "" } })

    expect(screen.getByRole("button", { name: /save changes/i })).toBeDisabled()
  })

  it("removes username when delete icon is clicked", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    fireEvent.click(screen.getByLabelText("Remove username"))

    expect(
      screen.queryByDisplayValue(processedPatron.username)
    ).not.toBeInTheDocument()
  })

  it("calls submitInput with valid data", async () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getByLabelText(
      "Must be 5-15 characters and use only letters (a-z) and numbers (0-9)"
    )
    fireEvent.change(input, { target: { value: "newUsername" } })

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }))

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2))

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/username/${processedPatron.id}`,
      expect.objectContaining({
        body: '{"username":"newUsername"}',
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      })
    )
  })

  it("cancels editing and reverts state", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getByLabelText(
      "Must be 5-15 characters and use only letters (a-z) and numbers (0-9)"
    )
    fireEvent.change(input, { target: { value: "modification" } })

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }))

    expect(screen.getByText(processedPatron.username)).toBeInTheDocument()
    expect(screen.queryByDisplayValue("modification")).not.toBeInTheDocument()
  })
})
