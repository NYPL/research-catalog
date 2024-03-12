import React from "react"
import { render } from "../../../utils/testUtils"
import {
  mockCheckouts,
  mockFines,
  mockHolds,
  mockPatron,
} from "../../../../__test__/fixtures/accountFixtures"
import { userEvent } from "@testing-library/user-event"
import ProfileTabs from "../ProfileTabs"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("RequestsTab", () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => "Cancelled",
  } as Response)

  beforeEach(() => {
    window.localStorage.clear()
  })

  // Mocking from ProfileTabs level so that handleHoldsState can be tested
  it("renders", () => {
    render(
      <ProfileTabs
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="requests"
      />
    )
  })

  it("renders each hold request as a row", () => {
    const { getAllByRole } = render(
      <ProfileTabs
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="requests"
      />
    )
    const rows = getAllByRole("row")
    expect(rows.length).toBe(3)
  })

  it("calls hold cancel endpoint when Cancel button is clicked", async () => {
    const component = render(
      <ProfileTabs
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="requests"
      />
    )

    await userEvent.click(component.getAllByText("Cancel")[0])
    await userEvent.click(component.getAllByText("Yes, cancel")[0])

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/holds/cancel/${mockHolds[0].id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patronId: mockPatron.id }),
      }
    )
  })

  it("removes hold from list when cancel is successful", async () => {
    const component = render(
      <ProfileTabs
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="requests"
      />
    )

    await userEvent.click(component.getAllByText("Cancel")[0])
    await userEvent.click(component.getAllByText("Yes, cancel")[0])

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/holds/cancel/${mockHolds[0].id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patronId: mockPatron.id }),
      }
    )
    await userEvent.click(component.getAllByText("OK")[0])

    const rows = component.getAllByRole("row")
    expect(rows.length).toBe(2)
  })

  it("displays freeze buttons only for holds that can be frozen", async () => {
    const component = render(
      <ProfileTabs
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="requests"
      />
    )
    const freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(1)
  })

  it("freezes and unfreezes, with button reflecting current state", async () => {
    const component = render(
      <ProfileTabs
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="requests"
      />
    )
    const freezeButton = component.getAllByText("Freeze")[0]
    await userEvent.click(freezeButton)
    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/holds/update/${mockHolds[0].id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patronId: mockPatron.id,
          freeze: true,
          pickupLocation: "mal",
        }),
      }
    )

    const unfreezeButton = component.getAllByText("Unfreeze")[0]

    await userEvent.click(unfreezeButton)

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/holds/update/${mockHolds[0].id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patronId: mockPatron.id,
          freeze: false,
          pickupLocation: "mal",
        }),
      }
    )

    const freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(1)
  })
})
