import React from "react"
import { render, fireEvent, screen } from "../../utils/testUtils"
import MyAccountTabs from "./MyAccountTabs"
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
      <MyAccountTabs activePath={path} />
    </PatronDataProvider>
  )
}
describe("MyAccountTabs", () => {
  it("renders", () => {
    renderWithPatronDataProvider(accountData, "")
  })

  it("renders correct number of tabs", () => {
    const { getAllByRole } = renderWithPatronDataProvider(accountData, "")

    const tabs = getAllByRole("tab")
    expect(tabs.length).toBe(5)
  })

  it("calls updatePath when tab is clicked", () => {
    const { getByText } = renderWithPatronDataProvider(accountData, "items")
    fireEvent.click(getByText("Requests", { exact: false }))
    expect(mockRouter.asPath).toBe("/account/requests")
  })
  it("displays error message when checkouts or holds are null", () => {
    renderWithPatronDataProvider(
      { ...accountData, checkouts: null, holds: null },
      "items"
    )
    const errorMessage = screen.getByText(
      "There was an error accessing your checkouts."
    )
    expect(errorMessage).toBeInTheDocument()
  })
})
