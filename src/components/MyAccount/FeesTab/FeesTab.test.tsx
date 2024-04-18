import React from "react"
import { render, screen } from "../../../utils/testUtils"
import {
  mockCheckouts,
  mockFines,
  mockHolds,
  mockPatron,
} from "../../../../__test__/fixtures/processedMyAccountData"
import FeesTab from "./FeesTab"
import MyAccount from "../../../../pages/account/[[...index]]"

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

  it("renders notification banner if user has fines", () => {
    render(
      <MyAccount
        isAuthenticated={true}
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={mockFines}
      />
    )
    expect(
      screen.getByText("You have outstanding fees.", { exact: false })
    ).toBeInTheDocument()
  })

  it("does not render notification banner if user does not have fines", () => {
    render(
      <MyAccount
        isAuthenticated={true}
        patron={mockPatron}
        checkouts={mockCheckouts}
        holds={mockHolds}
        fines={{ total: 0, entries: [] }}
      />
    )
    const notification = screen.queryByText("You have outstanding fees.")
    expect(notification).not.toBeInTheDocument()
  })
})
