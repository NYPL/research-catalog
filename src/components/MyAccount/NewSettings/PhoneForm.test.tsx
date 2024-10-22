import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { filteredPickupLocations } from "../../../../__test__/fixtures/processedMyAccountData"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import { processedPatron } from "../../../../__test__/fixtures/processedMyAccountData"
import PhoneEmailForm from "./PhoneEmailForm"

describe("phone form", () => {
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
      <PhoneEmailForm
        patronData={processedPatron}
        setIsSuccess={mockSetIsSuccess}
        setIsFailure={mockSetIsFailure}
        inputType="phones"
      />
    </PatronDataProvider>
  )

  it("renders correctly with initial phone", () => {
    render(component)

    expect(
      screen.getByText(processedPatron.phones[0].number)
    ).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
  })

  it("allows editing when edit button is clicked", () => {
    render(component)
    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    expect(screen.getAllByLabelText("Update phones")[0]).toBeInTheDocument()
    expect(
      screen.getByDisplayValue(processedPatron.phones[0].number)
    ).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument()
    expect(screen.queryByText(/edit/)).not.toBeInTheDocument()
  })

  it("validates phone input correctly", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getAllByLabelText("Update phones")[0]
    fireEvent.change(input, { target: { value: "invalid-phone" } })

    expect(
      screen.getByText("Please enter a valid and unique phone number.")
    ).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /save changes/i })).toBeDisabled()
  })

  it("allows adding a new phone field", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    fireEvent.click(
      screen.getByRole("button", { name: /\+ add a phone number/i })
    )

    expect(screen.getAllByLabelText("Update phones").length).toBe(
      processedPatron.phones.length + 1
    )
  })

  it("removes a phone when delete icon is clicked", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    fireEvent.click(screen.getByLabelText("Remove phone"))

    expect(
      screen.queryByDisplayValue(processedPatron.phones[0].number)
    ).not.toBeInTheDocument()
  })

  it.skip("calls submit with valid data", async () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getAllByLabelText("Update phones")[0]
    fireEvent.change(input, { target: { value: "1234" } })

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }))

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

    expect(fetch).toHaveBeenCalledWith(
      "/research/research-catalog/api/account/settings/6742743",
      expect.objectContaining({
        body: '{"phones":[{number:"1234", type: "t"}]}',
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      })
    )
  })

  it("cancels editing and reverts state", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getAllByLabelText("Update phones")[0]
    fireEvent.change(input, { target: { value: "4534" } })

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }))

    expect(screen.getByText("123-456-7890")).toBeInTheDocument()
    expect(screen.queryByDisplayValue("4534")).not.toBeInTheDocument()
  })

  it("shows add phone number when there's no more phone numbers", async () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    fireEvent.click(screen.getByLabelText("Remove phone"))

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }))

    await expect(
      screen.queryByText(processedPatron.phones[0].number)
    ).not.toBeInTheDocument()

    await waitFor(() =>
      expect(screen.getByText("+ Add a phone number")).toBeInTheDocument()
    )
  })
})
