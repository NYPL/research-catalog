import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { filteredPickupLocations } from "../../../../__test__/fixtures/processedMyAccountData"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import { processedPatron } from "../../../../__test__/fixtures/processedMyAccountData"
import { pickupLocations } from "../../../../__test__/fixtures/rawSierraAccountData"
import SettingsSelectForm from "./SettingsSelectForm"
import type { Patron } from "../../../types/myAccountTypes"

describe("notification preference form", () => {
  const mockSettingsState = {
    setStatus: jest.fn(),
    editingField: "",
    setEditingField: jest.fn(),
  }
  const accountFetchSpy = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => {
        console.log("Updated")
      },
      status: 200,
    } as Response)
  })

  const notificationPreferenceMap = [
    { code: "z", name: "Email" },
    { code: "p", name: "Phone" },
    { code: "-", name: "None" },
  ]

  const processedPatronPref = notificationPreferenceMap.find(
    (pref) => pref.code === processedPatron.notificationPreference
  )?.name

  const component = (
    <PatronDataProvider
      testSpy={accountFetchSpy}
      value={{
        patron: processedPatron,
        pickupLocations: filteredPickupLocations,
      }}
    >
      <SettingsSelectForm
        patronData={processedPatron}
        settingsState={mockSettingsState}
        pickupLocations={pickupLocations}
        type="notification"
      />
    </PatronDataProvider>
  )

  it("renders correctly with initial preference", () => {
    render(component)

    expect(screen.getByText(processedPatronPref)).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument()
  })

  it("allows editing when edit button is clicked", () => {
    render(component)
    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    expect(
      screen.getByLabelText("Update notification preference")
    ).toBeInTheDocument()
    expect(screen.getByDisplayValue(processedPatronPref)).toBeInTheDocument()

    expect(screen.queryByDisplayValue("None")).not.toBeInTheDocument()

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument()
    expect(screen.queryByText(/edit/)).not.toBeInTheDocument()
  })

  it("calls submit with valid data", async () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getByLabelText("Update notification preference")
    fireEvent.change(input, {
      target: { value: "Phone" },
    })

    fireEvent.click(screen.getByRole("button", { name: /save changes/i }))

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

    expect(fetch).toHaveBeenCalledWith(
      "/research/research-catalog/api/account/settings/6742743",
      {
        body: '{"fixedFields":{"268":{"label":"Notice Preference","value":"p"}}}',
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      }
    )
    expect(accountFetchSpy).toHaveBeenCalled()
  })

  it("displays none as an option if that's already user's selection", async () => {
    const processedPatronWithNone = {
      notificationPreference: "-",
      username: "pastadisciple",
      name: "Strega Nonna",
      barcode: "23333121538324",
      formattedBarcode: "2 3333 12153 8324",
      expirationDate: "March 28, 2025",
      emails: ["streganonna@gmail.com", "spaghettigrandma@gmail.com"],
      phones: [
        {
          number: "123-456-7890",
          type: "t",
        },
      ],
      homeLibrary: { code: "sn   ", name: "SNFL (formerly Mid-Manhattan)" },
      id: 6742743,
    } as Patron
    const component = (
      <PatronDataProvider
        testSpy={accountFetchSpy}
        value={{
          patron: processedPatronWithNone,
          pickupLocations: filteredPickupLocations,
        }}
      >
        <SettingsSelectForm
          patronData={processedPatronWithNone}
          settingsState={mockSettingsState}
          pickupLocations={pickupLocations}
          type="notification"
        />
      </PatronDataProvider>
    )
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    expect(screen.getByText("None")).toBeInTheDocument()
  })

  it("cancels editing and reverts state", () => {
    render(component)

    fireEvent.click(screen.getByRole("button", { name: /edit/i }))

    const input = screen.getByLabelText("Update notification preference")
    fireEvent.change(input, {
      target: { value: "Phone" },
    })

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }))

    expect(screen.getByText(processedPatronPref)).toBeInTheDocument()
    expect(screen.queryByDisplayValue("Phone")).not.toBeInTheDocument()
  })
})
