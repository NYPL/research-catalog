import React from "react"
import { render, screen } from "../../../utils/testUtils"
import {
  mockCheckouts,
  mockFines,
  mockHolds,
  mockPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"

import FeesTab from "./FeesTab"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

describe("FeesTab", () => {
  it("renders", () => {
    const component = render(<FeesTab fines={mockFines} />)
    expect(component.getByText("Amount")).toBeInTheDocument()
  })

  it("renders each fine as a row", () => {
    const { getAllByRole } = render(<FeesTab fines={mockFines} />)
    const rows = getAllByRole("row")
    // One fine, plus the total row, plus the header row.
    expect(rows.length).toBe(3)
  })

  it("renders the total in the final row", () => {
    const component = render(<FeesTab fines={mockFines} />)
    const expectedTotal = component.getAllByText("$14.99")
    expect(expectedTotal.length).toBe(2)
  })
})
