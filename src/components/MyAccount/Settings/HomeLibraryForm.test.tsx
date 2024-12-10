import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { filteredPickupLocations } from "../../../../__test__/fixtures/processedMyAccountData"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import { processedPatron } from "../../../../__test__/fixtures/processedMyAccountData"
import { pickupLocations } from "../../../../__test__/fixtures/rawSierraAccountData"
import HomeLibraryNotificationForm from "./SettingsSelectForm"

describe("home library form", () => {
  const mockSettingsState = {
    setStatus: jest.fn(),
    editingField: "",
    setEditingField: jest.fn(),
  }

  const component = (
    <PatronDataProvider
      value={{
        patron: processedPatron,
        pickupLocations: filteredPickupLocations,
      }}
    >
      <HomeLibraryNotificationForm
        patronData={processedPatron}
        settingsState={mockSettingsState}
        pickupLocations={pickupLocations}
        type="library"
      />
    </PatronDataProvider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => {
        console.log("Updated")
      },
      status: 200,
    } as Response)
  })

  it("renders correctly with initial location", () => {
    render(component)

    expect(
      screen.getByText(processedPatron.homeLibrary.name)
    ).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
  })

  it("manages focus", async () => {
    render(component)
    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    await waitFor(() => expect(screen.getByRole("combobox")).toHaveFocus())

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }))

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /edit/i })).toHaveFocus()
    )
  })

  it("allows editing when edit button is clicked", () => {
    render(component)
    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    expect(screen.getByLabelText("Update home library")).toBeInTheDocument()
    expect(
      screen.getByDisplayValue(processedPatron.homeLibrary.name)
    ).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument()
    expect(screen.queryByText(/edit/)).not.toBeInTheDocument()
  })

  it("calls submit with valid data", async () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getByLabelText("Update home library")
    fireEvent.change(input, {
      target: { value: "Belmont" },
    })

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }))

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

    expect(fetch).toHaveBeenCalledWith(
      "/research/research-catalog/api/account/settings/6742743",
      {
        body: '{"homeLibraryCode":"be   "}',
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      }
    )
  })

  it("cancels editing and reverts state", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getByLabelText("Update home library")
    fireEvent.change(input, {
      target: { value: "Belmont" },
    })

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }))

    expect(
      screen.getByText("SNFL (formerly Mid-Manhattan)")
    ).toBeInTheDocument()
    expect(screen.queryByDisplayValue("Belmont")).not.toBeInTheDocument()
  })
})
