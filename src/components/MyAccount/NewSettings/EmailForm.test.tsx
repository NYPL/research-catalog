import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import EmailForm from "./EmailForm"
import { filteredPickupLocations } from "../../../../__test__/fixtures/processedMyAccountData"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import { processedPatron } from "../../../../__test__/fixtures/processedMyAccountData"

describe("email form", () => {
  const mockSetIsSuccess = jest.fn()
  const mockSetIsFailure = jest.fn()

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
      <EmailForm
        patronData={processedPatron}
        setIsSuccess={mockSetIsSuccess}
        setIsFailure={mockSetIsFailure}
      />
    </PatronDataProvider>
  )

  it("renders correctly with initial email", () => {
    render(component)

    expect(screen.getByText("streganonna@gmail.com")).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
  })

  it("allows editing when edit button is clicked", () => {
    render(component)
    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    expect(screen.getAllByLabelText("Update email")[0]).toBeInTheDocument()
    expect(
      screen.getByDisplayValue("streganonna@gmail.com")
    ).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument()
    expect(screen.queryByText(/edit/)).not.toBeInTheDocument()
  })

  it("validates email input correctly", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getAllByLabelText("Update email")[0]
    fireEvent.change(input, { target: { value: "invalid-email" } })

    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /save changes/i })).toBeDisabled()
  })

  it("allows adding a new email field", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    fireEvent.click(
      screen.getByRole("button", { name: /\+ add an email address/i })
    )

    expect(screen.getAllByLabelText("Update email").length).toBe(
      processedPatron.emails.length + 1
    )
  })

  it("removes an email when delete icon is clicked", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    fireEvent.click(screen.getByLabelText("Remove email"))

    expect(
      screen.queryByDisplayValue("spaghettigrandma@gmail.com")
    ).not.toBeInTheDocument()
  })

  it("calls submitEmails with valid data", async () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getAllByLabelText("Update email")[0]
    fireEvent.change(input, { target: { value: "newemail@example.com" } })

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }))

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

    expect(fetch).toHaveBeenCalledWith(
      "/research/research-catalog/api/account/settings/6742743",
      expect.objectContaining({
        body: '{"emails":["newemail@example.com","spaghettigrandma@gmail.com"]}',
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      })
    )
  })

  it("cancels editing and reverts state", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getAllByLabelText("Update email")[0]
    fireEvent.change(input, { target: { value: "modified@example.com" } })

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }))

    expect(screen.getByText("streganonna@gmail.com")).toBeInTheDocument()
    expect(
      screen.queryByDisplayValue("modified@example.com")
    ).not.toBeInTheDocument()
  })
})
