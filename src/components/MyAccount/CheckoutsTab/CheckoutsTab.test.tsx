import React from "react"
import { render } from "../../../utils/testUtils"
import {
  mockCheckouts,
  mockPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import CheckoutsTab from "./CheckoutsTab"
import { userEvent } from "@testing-library/user-event"

describe("CheckoutsTab", () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ message: "Renewed", status: 200, body: {} }),
  } as Response)

  beforeEach(() => {
    window.localStorage.clear()
  })

  it("renders", () => {
    render(<CheckoutsTab patron={mockPatron} checkouts={mockCheckouts} />)
  })

  it("renders each checkout as a row", () => {
    const { getAllByRole } = render(
      <CheckoutsTab patron={mockPatron} checkouts={mockCheckouts} />
    )
    const rows = getAllByRole("row")
    expect(rows.length).toBe(5)
  })
  it("calls renew checkout endpoint when Renew button is clicked", async () => {
    const component = render(
      <CheckoutsTab patron={mockPatron} checkouts={mockCheckouts} />
    )

    await userEvent.click(component.getAllByText("Renew")[0])

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/checkouts/renew/${mockCheckouts[0].id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patronId: mockPatron.id }),
      }
    )
  })

  it("disables button on successful renewal", async () => {
    const component = render(
      <CheckoutsTab patron={mockPatron} checkouts={mockCheckouts} />
    )
    const renewButton = component.getAllByText("Renew")[0]
    expect(renewButton).not.toBeDisabled()

    await userEvent.click(renewButton)

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/checkouts/renew/${mockCheckouts[0].id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patronId: mockPatron.id }),
      }
    )
    expect(renewButton).toBeDisabled()
  })

  it("does not disable button on failed renewal", async () => {
    // Resetting fetch to return a failed response
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ message: "Failed", status: 403, body: {} }),
    } as Response)
    const component = render(
      <CheckoutsTab patron={mockPatron} checkouts={mockCheckouts} />
    )
    const renewButton = component.getAllByText("Renew")[0]

    expect(renewButton).not.toBeDisabled()

    await userEvent.click(renewButton)

    expect(fetch).toHaveBeenCalledWith(
      `/research/research-catalog/api/account/checkouts/renew/${mockCheckouts[0].id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patronId: mockPatron.id }),
      }
    )

    expect(renewButton).not.toBeDisabled()
  })
  it("does not render partner items with a link to the record or renew buttons", () => {
    const component = render(
      <CheckoutsTab patron={mockPatron} checkouts={mockCheckouts} />
    )
    // Borrow.nypl.org and two NYPL titles
    const expectedLinks = component.getAllByRole("link")
    expect(expectedLinks.length).toBe(3)
  })

  it("does not render partner/research items with renew buttons", () => {
    const component = render(
      <CheckoutsTab patron={mockPatron} checkouts={mockCheckouts} />
    )
    // 1 circ checkout
    const expectedRenewButtons = component.getAllByText("Renew")
    expect(expectedRenewButtons.length).toBe(1)
  })
})
