import React from "react"
import { render, fireEvent } from "@testing-library/react"
import ProfileTabs from "./ProfileTabs"
import {
  mockCheckouts,
  mockFines,
  mockHolds,
  mockPatron,
} from "../../../__test__/fixtures/accountFixtures"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

describe("ProfileTabs", () => {
  const routerMock = useRouter as jest.Mock
  routerMock.mockReturnValue({
    push: jest.fn(),
  })
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

  it("calls updatePath when tab is clicked", () => {
    const { getByText } = render(
      <ProfileTabs
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="checkouts"
      />
    )
    fireEvent(getByText("Requests"), new MouseEvent("click"))
    expect(useRouter().push).toHaveBeenCalledWith(
      "/account/requests",
      undefined,
      { shallow: true }
    )
  })
})
