import React from "react"
import { render, fireEvent, screen } from "../../utils/testUtils"
import ProfileTabs from "./ProfileTabs"
import {
  filteredPickupLocations,
  processedCheckouts,
  processedFines,
  processedHolds,
  processedPatron,
} from "../../../__test__/fixtures/processedMyAccountData"
import mockRouter from "next-router-mock"
import { PatronDataProvider } from "../../context/PatronDataContext"
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

const accountData = {
  patron: processedPatron,
  fines: processedFines,
  checkouts: processedCheckouts,
  holds: processedHolds,
  pickupLocations: filteredPickupLocations,
}
const renderWithPatronDataProvider = (data, path) => {
  return render(
    <PatronDataProvider value={{ ...data }}>
      <ProfileTabs activePath={path} />
    </PatronDataProvider>
  )
}
describe("ProfileTabs", () => {
  it("renders", () => {
    renderWithPatronDataProvider(accountData, "checkouts")
  })

  it("renders correct number of tabs when fines are greater than $0", () => {
    const { getAllByRole } = renderWithPatronDataProvider(
      accountData,
      "checkouts"
    )

    const tabs = getAllByRole("tab")
    expect(tabs.length).toBe(4)
  })

  it("renders correct number of tabs when fines are $0", () => {
    const { getAllByRole } = renderWithPatronDataProvider(
      { ...accountData, fines: { total: 0, entries: [] } },
      "checkouts"
    )
    const tabs = getAllByRole("tab")
    expect(tabs.length).toBe(3)
  })

  it("calls updatePath when tab is clicked", () => {
    const { getByText } = renderWithPatronDataProvider(accountData, "checkouts")
    fireEvent.click(getByText("Requests", { exact: false }))
    expect(mockRouter.asPath).toBe("/account/requests")
  })
  it("displays error message when checkouts or holds are null", () => {
    renderWithPatronDataProvider(
      { ...accountData, checkouts: null, holds: null },
      "checkouts"
    )
    const errorMessage = screen.getByText(
      "There was an error accessing your checkouts."
    )
    expect(errorMessage).toBeInTheDocument()
  })
})
