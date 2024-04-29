import React from "react"
import { render, screen } from "../../../utils/testUtils"
import {
  mockCheckouts,
  mockFines,
  mockHolds,
  mockPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import { userEvent } from "@testing-library/user-event"
import ProfileTabs from "../ProfileTabs"
import RequestsTab from "./RequestsTab"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
const mockRemoveHold = jest.fn()

describe("RequestsTab", () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => "Canceled",
    status: 200,
  } as Response)

  beforeEach(() => {
    window.localStorage.clear()
  })

  it("renders", () => {
    const component = render(
      <RequestsTab
        patron={mockPatron}
        holds={mockHolds}
        removeHold={mockRemoveHold}
      />
    )
    expect(
      component.getByText("Pickup location", { exact: false })
    ).toBeInTheDocument()
  })

  it("renders each hold request as a row", () => {
    const { getAllByRole } = render(
      <RequestsTab
        patron={mockPatron}
        holds={mockHolds}
        removeHold={mockRemoveHold}
      />
    )
    const rows = getAllByRole("row")
    expect(rows.length).toBe(3)
  })

  it("calls hold cancel endpoint when Cancel button is clicked", async () => {
    const component = render(
      <RequestsTab
        patron={mockPatron}
        holds={mockHolds}
        removeHold={mockRemoveHold}
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
    let rows = component.getAllByRole("row")
    expect(rows.length).toBe(3)

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
    rows = component.getAllByRole("row")
    expect(rows.length).toBe(2)
  })

  it("does not remove hold from list when cancel fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => "Nooo",
      status: 400,
    } as Response)
    const component = render(
      <ProfileTabs
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
        activePath="requests"
      />
    )

    let rows = component.getAllByRole("row")
    expect(rows.length).toBe(3)
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

    await userEvent.click(screen.getAllByText("OK", { exact: false })[0])

    rows = component.getAllByRole("row")
    expect(rows.length).toBe(3)
  })

  it("displays freeze buttons only for holds that can be frozen", async () => {
    const component = render(
      <RequestsTab
        patron={mockPatron}
        holds={mockHolds}
        removeHold={mockRemoveHold}
      />
    )
    const freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(1)
  })

  it("freezes and unfreezes, with button reflecting current state", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => "Updated",
      status: 200,
    } as Response)
    const component = render(
      <RequestsTab
        patron={mockPatron}
        holds={mockHolds}
        removeHold={mockRemoveHold}
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
          pickupLocation: "sn",
        }),
      }
    )

    await userEvent.click(screen.getAllByText("OK", { exact: false })[0])
    expect(component.queryByText("Freeze")).not.toBeInTheDocument()
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
          pickupLocation: "sn",
        }),
      }
    )

    expect(component.queryByText("Unfreeze")).not.toBeInTheDocument()
    const freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(1)
  })

  it("shows failure modal when freeze doesn't work", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => "Nooo",
      status: 400,
    } as Response)
    const component = render(
      <RequestsTab
        patron={mockPatron}
        holds={mockHolds}
        removeHold={mockRemoveHold}
      />
    )
    const freezeButton = component.getAllByText("Freeze")[0]
    await userEvent.click(freezeButton)
    expect(
      component.getByText("Freezing this hold failed", { exact: false })
    ).toBeInTheDocument()
    await userEvent.click(screen.getAllByText("OK", { exact: false })[0])
    const freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(1)
  })
})
