import React from "react"
import { render, screen, waitFor, within } from "../../../utils/testUtils"
import {
  processedHolds,
  processedPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import { userEvent } from "@testing-library/user-event"
import RequestsTab from "./RequestsTab"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import { pickupLocations } from "../../../../__test__/fixtures/rawSierraAccountData"
import logger from "../../../../logger.js"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

const patronFetchSpy = jest.fn()
const renderWithPatronDataContext = (holds = processedHolds) => {
  return render(
    <PatronDataProvider
      testSpy={patronFetchSpy}
      value={{
        holds: holds,
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
        body: JSON.stringify({
          patronId: processedPatron.id,
          patronBarcode: processedPatron.barcode,
          itemId: processedHolds[0].itemId,
        }),
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
        body: JSON.stringify({
          patronId: processedPatron.id,
          patronBarcode: processedPatron.barcode,
          itemId: processedHolds[0].itemId,
        }),
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
        body: JSON.stringify({
          patronId: processedPatron.id,
          patronBarcode: processedPatron.barcode,
          itemId: processedHolds[0].itemId,
        }),
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
          itemId: "23167148",
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
          itemId: "23167148",
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
    const theoreticallyFreezableHold = processedHolds[2]
    const component = renderWithPatronDataContext([theoreticallyFreezableHold])
    expect(
      component.queryByText("Hold freeze failed", { exact: false })
    ).not.toBeInTheDocument()
    const freezeButtons = component.getAllByText("Freeze")
    expect(freezeButtons.length).toBe(1)
    const freezeButton = component.getByText("Freeze")
    await userEvent.click(freezeButton)
    expect(
      component.getByText("Hold freeze failed", { exact: false })
    ).toBeInTheDocument()
    const ok = screen.getByRole("button", { name: "OK" })
    await userEvent.click(ok)
    const postFreezeButtons = component.getAllByText("Freeze")
    expect(postFreezeButtons.length).toBe(1)
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

  it("should focus on the holds table after successfully canceling a request", async () => {
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

    await userEvent.click(component.getAllByText("OK")[0])
    expect(component.getByTestId("items-tab")).toHaveFocus()
  })

  describe("update location", () => {
    const openModal = async () => {
      const modalTrigger = screen.getAllByText("Change location")[0]
      await userEvent.click(modalTrigger)
    }
    it("updated the location within the modal after updating", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: async () =>
          JSON.stringify({
            patron: { id: 123 },
            holds: [
              {
                ...processedHolds[2],
                pickupLocation: { code: "ft", name: "53rd Street" },
              },
            ],
            pickupLocations,
          }),
        status: 200,
      } as Response)
      renderWithPatronDataContext([processedHolds[2]])
      // change location
      await openModal()
      const select = screen.getByLabelText("Pickup location")
      await userEvent.selectOptions(select, "ft   ")
      const submitButton = screen.getByText("Confirm location")
      await userEvent.click(submitButton)
      await userEvent.click(screen.getByText("OK"))
      // reopen modal to ensure component rerendered
      await openModal()
      expect(select).toHaveValue("ft   ")
    })
    it("focuses on update location button after updating and closing", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: async () =>
          JSON.stringify({
            patron: { id: 123 },
            holds: processedHolds,
            pickupLocations,
          }),
        status: 200,
      } as Response)
      renderWithPatronDataContext()
      await openModal()

      const select = screen.getByLabelText("Pickup location")
      await userEvent.selectOptions(select, "mp   ")
      const submitButton = screen.getByText("Confirm location")
      await userEvent.click(submitButton)
      await userEvent.click(screen.getByText("OK"))
      const updateLocation = screen.getByTestId("change-location-button")
      expect(updateLocation).toHaveFocus()
    })
    it("focuses on update location button after closing modal without updating", async () => {
      renderWithPatronDataContext()
      await openModal()

      await userEvent.click(screen.getByLabelText("Close"))
      const updateLocation = screen.getByTestId("change-location-button")
      expect(updateLocation).toHaveFocus()
    })
    it("focuses on update location button after failed update and closing modal", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: async () => JSON.stringify({ id: "spaghetti" }),
        status: 500,
      } as Response)
      renderWithPatronDataContext()
      await openModal()

      const select = screen.getByLabelText("Pickup location")
      await userEvent.selectOptions(select, "mp   ")
      const submitButton = screen.getByText("Confirm location")
      await userEvent.click(submitButton)
      await userEvent.click(screen.getByText("OK"))
      const updateLocation = screen.getByTestId("change-location-button")
      expect(updateLocation).toHaveFocus()
    })
    it("resets to selectPickupLocationProps after not updating to same location", async () => {
      renderWithPatronDataContext()

      global.fetch = jest.fn().mockResolvedValueOnce({
        json: async () => "updated",
        status: 200,
      } as Response)
      await openModal()
      const submitButton = screen.getByText("Confirm location")
      await userEvent.click(submitButton)
      await userEvent.click(screen.getByText("OK"))
      const modalTrigger = await screen.findByText("Change location")
      await userEvent.click(modalTrigger)
      expect(
        screen.getByText("Where would you like to pick up this item?")
      ).toBeInTheDocument()
    })
  })
})
