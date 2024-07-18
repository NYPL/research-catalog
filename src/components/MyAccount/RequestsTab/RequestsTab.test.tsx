import React from "react"
import { render, screen, within } from "../../../utils/testUtils"
import {
  processedHolds,
  processedPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import { userEvent } from "@testing-library/user-event"
import RequestsTab from "./RequestsTab"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import { pickupLocations } from "../../../../__test__/fixtures/rawSierraAccountData"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
const patronFetchSpy = jest.fn()
const renderWithPatronDataContext = () => {
  return render(
    <PatronDataProvider
      testSpy={patronFetchSpy}
      value={{
        holds: processedHolds,
        patron: processedPatron,
        pickupLocations: pickupLocations,
      }}
    >
      <RequestsTab />
    </PatronDataProvider>
  )
}
describe("RequestsTab", () => {
  beforeEach(() => {
    window.localStorage.clear()
    patronFetchSpy.mockReset()
  })

  it("renders", () => {
    const component = renderWithPatronDataContext()
    expect(component.getByText("I want to be spaghetti! / ", { exact: false }))
  })

  it("renders each hold request as a row", () => {
    const component = renderWithPatronDataContext()
    const bodyRows = component.getAllByRole("rowgroup")[1]
    expect(within(bodyRows).getAllByRole("row").length).toBe(5)
  })

  it("calls hold cancel endpoint when Cancel button is clicked", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => "Canceled",
      status: 200,
    } as Response)
    const component = renderWithPatronDataContext()

    await userEvent.click(component.getAllByText("Cancel request")[0])
    await userEvent.click(component.getAllByText("Yes, cancel request")[0])

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/holds/cancel/${processedHolds[0].id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patronId: processedPatron.id }),
      }
    )
  })

  it("fetches account data when cancel is successful", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: async () => "Canceled",
        status: 200,
      } as Response)
      .mockResolvedValueOnce({
        json: async () =>
          JSON.stringify({
            patron: { id: 123 },
            holds: processedHolds,
            pickupLocations,
          }),
        status: 200,
      } as Response)
    const component = renderWithPatronDataContext()

    await userEvent.click(component.getAllByText("Cancel request")[0])
    await userEvent.click(component.getAllByText("Yes, cancel request")[0])

    expect(global.fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/holds/cancel/${processedHolds[0].id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patronId: processedPatron.id }),
      }
    )
    await userEvent.click(component.getAllByText("OK")[0])
    // TODO: figure out how to verify
    expect(patronFetchSpy).toHaveBeenCalled()
  })

  it("does not fetch account data when cancel fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => "Nooo",
      status: 400,
    } as Response)
    const component = renderWithPatronDataContext()

    const bodyRows = component.getAllByRole("rowgroup")[1]
    expect(within(bodyRows).getAllByRole("row").length).toBe(5)
    await userEvent.click(component.getAllByText("Cancel request")[0])
    await userEvent.click(component.getAllByText("Yes, cancel request")[0])

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/holds/cancel/${processedHolds[0].id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patronId: processedPatron.id }),
      }
    )

    await userEvent.click(screen.getAllByText("OK", { exact: false })[0])

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(patronFetchSpy).not.toHaveBeenCalled()
  })
  describe("updateHoldLocation", () => {
    it("only displays update pickup location button for request pending circ items", () => {
      renderWithPatronDataContext()
      const numberOfPendingHolds = processedHolds.filter(
        (hold) => hold.status === "REQUEST PENDING" && !hold.isResearch
      ).length
      const changeLocationButtons = screen.getAllByText("Change location")
      // there is one circ hold with status Request Pending in the provided holds array
      expect(changeLocationButtons).toHaveLength(numberOfPendingHolds)
    })
  })

  it("displays freeze buttons only for holds that can be frozen", async () => {
    const component = renderWithPatronDataContext()
    const numberOfFreezableHolds = processedHolds.filter(
      (hold) => hold.status === "REQUEST PENDING" && !hold.isResearch
    ).length
    const freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(numberOfFreezableHolds)
  })

  it("freezes and unfreezes, with button reflecting current state", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => "Updated",
      status: 200,
    } as Response)
    const component = renderWithPatronDataContext()
    const pendingRequest = processedHolds[2]
    const row = component.getByText(pendingRequest.title).closest("tr")
    const freezeButton = within(row).getByText("Freeze")
    await userEvent.click(freezeButton)
    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/holds/update/${pendingRequest.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          patronId: processedPatron.id,
          freeze: true,
          pickupLocation: "sn",
        }),
      }
    )

    await userEvent.click(screen.getAllByText("OK", { exact: false })[0])
    expect(component.queryByText("Freeze")).not.toBeInTheDocument()
    const unfreezeButton = within(row).getByText("Unfreeze")
    await userEvent.click(unfreezeButton)

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/holds/update/${pendingRequest.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          patronId: processedPatron.id,
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
    const component = renderWithPatronDataContext()
    expect(
      component.queryByText("Hold freeze failed", { exact: false })
    ).not.toBeInTheDocument()
    let freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(1)
    const freezeButton = component.getByText("Freeze")
    await userEvent.click(freezeButton)
    expect(
      component.getByText("Hold freeze failed", { exact: false })
    ).toBeInTheDocument()
    await userEvent.click(screen.getAllByText("OK", { exact: false })[0])
    freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(1)
  })

  it("shows pick up by date and status when circ request is ready", () => {
    const component = renderWithPatronDataContext()
    const readyRequest = processedHolds[0]
    const row = component.getByText(readyRequest.title).closest("tr")

    expect(row).toHaveTextContent("May 17, 2024")
    expect(row).toHaveTextContent("READY FOR PICKUP")
  })
  it("does not show freeze button on freezable request when it is anything other than pending", () => {
    const component = renderWithPatronDataContext()

    const readyRequest = processedHolds[0]
    const readyCircRequestRow = component
      .getByText(readyRequest.title)
      .closest("tr")

    expect(readyCircRequestRow).toHaveTextContent("READY FOR PICKUP")
    expect(readyCircRequestRow).not.toHaveTextContent("Freeze")

    const confirmedRequest = processedHolds[3]
    const confirmedRequestRow = component
      .getByText(confirmedRequest.title)
      .closest("tr")

    expect(confirmedRequestRow).toHaveTextContent("REQUEST CONFIRMED")
    expect(confirmedRequestRow).not.toHaveTextContent("Freeze")
  })
})
