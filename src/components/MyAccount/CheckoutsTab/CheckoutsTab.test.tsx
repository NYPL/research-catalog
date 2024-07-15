import React from "react"
import { render, within } from "../../../utils/testUtils"
import {
  processedCheckouts,
  processedPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import CheckoutsTab from "./CheckoutsTab"
import { userEvent } from "@testing-library/user-event"
import { PatronDataProvider } from "../../../context/PatronDataContext"
import { pickupLocations } from "../../../../__test__/fixtures/rawSierraAccountData"

const renderWithPatronDataContext = () => {
  return render(
    <PatronDataProvider
      value={{
        pickupLocations,
        patron: processedPatron,
        checkouts: processedCheckouts,
      }}
    >
      <CheckoutsTab />
    </PatronDataProvider>
  )
}

describe("CheckoutsTab", () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ message: "Renewed", status: 200, body: {} }),
  } as Response)

  beforeEach(() => {
    window.localStorage.clear()
  })

  it("renders", () => {
    renderWithPatronDataContext()
  })

  it("renders each checkout as a row", () => {
    const component = renderWithPatronDataContext()
    const bodyRows = component.getAllByRole("rowgroup")[1]
    expect(within(bodyRows).getAllByRole("row").length).toBe(4)
  })
  it("calls renew checkout endpoint when Renew button is clicked", async () => {
    const component = renderWithPatronDataContext()
    const renewableCheckout = processedCheckouts[0]
    const row = component.getByText(renewableCheckout.title).closest("tr")
    const renewButton = within(row).getByText("Renew")

    await userEvent.click(renewButton)

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/checkouts/renew/${renewableCheckout.id}`,
      {
        method: "POST",
        body: JSON.stringify({ patronId: processedPatron.id }),
      }
    )
  })

  it("disables button on successful renewal", async () => {
    const component = renderWithPatronDataContext()
    const renewableCheckout = processedCheckouts[0]
    const row = component.getByText(renewableCheckout.title).closest("tr")
    const renewButton = within(row).getByText("Renew")

    await userEvent.click(renewButton)

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/checkouts/renew/${renewableCheckout.id}`,
      {
        method: "POST",
        body: JSON.stringify({ patronId: processedPatron.id }),
      }
    )
    expect(renewButton).toBeDisabled()
  })

  it("does not disable button on failed renewal", async () => {
    // Resetting fetch to return a failed response
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ message: "Failed", status: 403, body: {} }),
    } as Response)
    const component = renderWithPatronDataContext()
    const renewableCheckout = processedCheckouts[0]
    const row = component.getByText(renewableCheckout.title).closest("tr")
    const renewButton = within(row).getByText("Renew")

    await userEvent.click(renewButton)

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/checkouts/renew/${renewableCheckout.id}`,
      {
        method: "POST",
        body: JSON.stringify({ patronId: processedPatron.id }),
      }
    )

    expect(renewButton).not.toBeDisabled()
  })
  it("does not render partner items with a link to the record", () => {
    const component = renderWithPatronDataContext()
    // Borrow.nypl.org and two NYPL titles
    const expectedLinks = component.getAllByRole("link")
    expect(expectedLinks.length).toBe(3)
  })

  it("does not render partner/research items with renew buttons", () => {
    const component = renderWithPatronDataContext()
    // 1 circ checkout
    const expectedRenewButtons = component.getAllByText("Renew")
    expect(expectedRenewButtons.length).toBe(1)
  })
})
