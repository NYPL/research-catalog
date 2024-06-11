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
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("ProfileTabs", () => {
  it("renders", () => {
    render(
      <ProfileTabs
        pickupLocations={filteredPickupLocations}
        patron={processedPatron}
        checkouts={processedCheckouts}
        holds={processedHolds}
        fines={processedFines}
        activePath="checkouts"
      />
    )
  })

  it("renders correct number of tabs when fines are greater than $0", () => {
    const { getAllByRole } = render(
      <ProfileTabs
        pickupLocations={filteredPickupLocations}
        patron={processedPatron}
        checkouts={processedCheckouts}
        holds={processedHolds}
        fines={processedFines}
        activePath="checkouts"
      />
    )
    const tabs = getAllByRole("tab")
    expect(tabs.length).toBe(4)
  })

  it("renders correct number of tabs when fines are $0", () => {
    const { getAllByRole } = render(
      <ProfileTabs
        pickupLocations={filteredPickupLocations}
        patron={processedPatron}
        checkouts={processedCheckouts}
        holds={processedHolds}
        fines={{ total: 0, entries: [] }}
        activePath="checkouts"
      />
    )
    const tabs = getAllByRole("tab")
    expect(tabs.length).toBe(3)
  })

  it("calls updatePath when tab is clicked", () => {
    const { getByText } = render(
      <ProfileTabs
        pickupLocations={filteredPickupLocations}
        patron={processedPatron}
        checkouts={processedCheckouts}
        holds={processedHolds}
        fines={processedFines}
        activePath="checkouts"
      />
    )
    fireEvent.click(getByText("Requests", { exact: false }))
    expect(mockRouter.asPath).toBe("/account/requests")
  })
  it("displays error message when checkouts or holds are null", () => {
    render(
      <ProfileTabs
        pickupLocations={filteredPickupLocations}
        patron={processedPatron}
        checkouts={null}
        holds={null}
        fines={processedFines}
        activePath="checkouts"
      />
    )
    const errorMessage = screen.getByText(
      "There was an error accessing your checkouts."
    )
    expect(errorMessage).toBeInTheDocument()
  })
})
