import React from "react"
import { render, fireEvent } from "../../../src/utils/testUtils"
import {
  mockCheckouts,
  mockPatron,
} from "../../../__test__/fixtures/accountFixtures"
import CheckoutsTab from "./CheckoutsTab"

global.fetch = jest.fn()

describe("CheckoutsTab", () => {
  it("renders", () => {
    render(<CheckoutsTab patron={mockPatron} checkouts={mockCheckouts} />)
  })

  it("renders each checkout as a row", () => {
    const { getAllByRole } = render(
      <CheckoutsTab patron={mockPatron} checkouts={mockCheckouts} />
    )
    const rows = getAllByRole("row")
    expect(rows.length).toBe(3)
  })
  it.todo("calls renew checkout endpoint when Renew button is clicked")
  it.todo("disables button on successful renewal")
  it.todo("does not disable button on renewal failure")

  //     const component = render(
  //       <CheckoutsTab patron={mockPatron} checkouts={mockCheckouts} />
  //     )

  // fireEvent.click(component.getAllByText("Renew")[0])

  // jest.spyOn(global, "fetch").mockResolvedValueOnce({
  //   json: async () => ({ message: "Renewed", status: 200, body: {} }),
  // } as Response)

  // expect(fetch).toHaveBeenCalledWith(
  //   `http://local.nypl.org:8080/api/account/checkouts/renew/${mockCheckouts[0].id}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ patronId: mockPatron.id }),
  //   }
  // )
})
