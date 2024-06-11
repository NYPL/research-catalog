import React from "react"
import { render } from "../../../utils/testUtils"
import { processedFines } from "../../../../__test__/fixtures/processedMyAccountData"

import FeesTab from "./FeesTab"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

describe("FeesTab", () => {
  it("renders", () => {
    const component = render(<FeesTab fines={processedFines} />)
    expect(component.queryAllByText("Amount")[0]).toBeInTheDocument()
  })

  it("renders each fine as a row", () => {
    const { getAllByRole } = render(<FeesTab fines={processedFines} />)
    const rows = getAllByRole("row")
    // One fine, plus the total row, plus the header row.
    expect(rows.length).toBe(3)
  })

  it("renders the total in the final row", () => {
    const component = render(<FeesTab fines={processedFines} />)
    const expectedTotal = component.getAllByText("$14.99")
    expect(expectedTotal.length).toBe(2)
  })
})
