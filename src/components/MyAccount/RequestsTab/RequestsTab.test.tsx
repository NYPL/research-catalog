import React from "react"
import { render, screen, within } from "../../../utils/testUtils"
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
    const component = render(
      <RequestsTab
        patron={mockPatron}
        holds={mockHolds}
        removeHold={mockRemoveHold}
      />
    )
    const bodyRows = component.getAllByRole("rowgroup")[1]
    expect(within(bodyRows).getAllByRole("row").length).toBe(5)
  })

  it("calls hold cancel endpoint when Cancel button is clicked", async () => {
    const component = render(
      <RequestsTab
        patron={mockPatron}
        holds={mockHolds}
        removeHold={mockRemoveHold}
      />
    )

    await userEvent.click(component.getAllByText("Cancel request")[0])
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
    let bodyRows = component.getAllByRole("rowgroup")[1]
    expect(within(bodyRows).getAllByRole("row").length).toBe(5)

    await userEvent.click(component.getAllByText("Cancel request")[0])
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
    bodyRows = component.getAllByRole("rowgroup")[1]
    expect(within(bodyRows).getAllByRole("row").length).toBe(4)
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

    let bodyRows = component.getAllByRole("rowgroup")[1]
    expect(within(bodyRows).getAllByRole("row").length).toBe(5)
    await userEvent.click(component.getAllByText("Cancel request")[0])
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

    bodyRows = component.getAllByRole("rowgroup")[1]
    expect(within(bodyRows).getAllByRole("row").length).toBe(5)
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
    const freezeButton = component.getByText("Freeze")
    await userEvent.click(freezeButton)
    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/holds/update/${mockHolds[1].id}`,
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
      `/research/research-catalog/api/account/holds/update/${mockHolds[1].id}`,
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

  it("shows failure modal when freeze doesn't work and does not change frozen state", async () => {
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
    expect(
      component.queryByText("Freezing this hold failed", { exact: false })
    ).not.toBeInTheDocument()
    let freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(1)
    const freezeButton = component.getByText("Freeze")
    await userEvent.click(freezeButton)
    expect(
      component.getByText("Freezing this hold failed", { exact: false })
    ).toBeInTheDocument()
    await userEvent.click(screen.getAllByText("OK", { exact: false })[0])
    freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(1)
  })

  it("shows pick up by date and status when circ request is ready", () => {
    const component = render(
      <RequestsTab
        patron={mockPatron}
        holds={mockHolds}
        removeHold={mockRemoveHold}
      />
    )
    const readyCircRequestRow = component.getAllByRole("row")[4]
    expect(readyCircRequestRow).toHaveTextContent("May 17, 2024")
    expect(readyCircRequestRow).toHaveTextContent("READY FOR PICKUP")
  })
  it("does not show freeze button on freezable request when it is anything other than pending", () => {
    const component = render(
      <RequestsTab
        patron={mockPatron}
        holds={mockHolds}
        removeHold={mockRemoveHold}
      />
    )
    const readyCircRequestRow = component.getAllByRole("row")[4]
    expect(readyCircRequestRow).toHaveTextContent("READY FOR PICKUP")
    expect(readyCircRequestRow).not.toHaveTextContent("Freeze")

    const confirmedCircRequestRow = component.getAllByRole("row")[3]
    expect(confirmedCircRequestRow).toHaveTextContent("REQUEST CONFIRMED")
    expect(confirmedCircRequestRow).not.toHaveTextContent("Freeze")
  })
})
