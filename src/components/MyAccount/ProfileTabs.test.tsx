import React from "react"
import { render, fireEvent, screen } from "../../utils/testUtils"
import ProfileTabs from "./ProfileTabs"
import {
  mockCheckouts,
  mockFines,
  mockHolds,
  mockPatron,
  filteredPickupLocations as pickupLocations,
} from "../../../__test__/fixtures/processedMyAccountData"
import mockRouter from "next-router-mock"
jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("ProfileTabs", () => {
  it("renders", () => {
    render(
      <ProfileTabs
        pickupLocations={pickupLocations}
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="checkouts"
      />
    )
  })

  it("renders correct number of tabs when fines are greater than $0", () => {
    const { getAllByRole } = render(
      <ProfileTabs
        pickupLocations={pickupLocations}
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="checkouts"
      />
    )
    const tabs = getAllByRole("tab")
    expect(tabs.length).toBe(4)
  })

  it("renders correct number of tabs when fines are $0", () => {
    const { getAllByRole } = render(
      <ProfileTabs
        pickupLocations={pickupLocations}
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
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
        pickupLocations={pickupLocations}
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="checkouts"
      />
    )
    fireEvent.click(getByText("Requests", { exact: false }))
    expect(mockRouter.asPath).toBe("/account/requests")
  })
  it("displays error message when checkouts or holds are null", () => {
    render(
      <ProfileTabs
        patron={mockPatron}
        checkouts={null}
        holds={null}
        fines={mockFines}
        activePath="checkouts"
      />
    )
    const errorMessage = screen.getByText(
      "There was an error accessing your checkouts."
    )
    expect(errorMessage).toBeInTheDocument()
  })
})
