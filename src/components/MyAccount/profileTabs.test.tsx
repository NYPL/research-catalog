import React from "react"
import { render } from "@testing-library/react"
import ProfileTabs from "./ProfileTabs"
import {
  mockCheckouts,
  mockFines,
  mockHolds,
  mockPatron,
} from "../../../__test__/fixtures/accountFixtures"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("ProfileTabs", () => {
  it("renders", () => {
    render(
      <ProfileTabs
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

  it("updates the path when tab is clicked", async () => {
    const { getByText } = render(
      <ProfileTabs
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="checkouts"
      />
    )
    await userEvent.click(getByText("Requests"))
    expect(mockRouter.asPath).toBe("/account/requests")
  })
})
