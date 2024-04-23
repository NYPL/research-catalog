import MyAccount from "../../../pages/account/[[...index]]"
import { render, screen } from "../../../src/utils/testUtils"
import { useRouter } from "next/router"
import {
  mockPatron,
  mockCheckouts,
  mockHolds,
  mockFines,
} from "../../fixtures/myAccountFixtures"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

describe("My Account page", () => {
  const routerMock = useRouter as jest.Mock
  routerMock.mockReturnValue({
    push: jest.fn(),
  })
  it("displays an error message when patron is empty", () => {
    render(<MyAccount isAuthenticated={true} />)
    expect(screen.getByText("We are unable to display", { exact: false }))
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
    const notification = screen.queryByText("You have outstanding fees", {
      exact: false,
    })
    expect(notification).toBeInTheDocument()
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
    const notification = screen.queryByText("You have outstanding fees", {
      exact: false,
    })
    expect(notification).not.toBeInTheDocument()
  })

  it.todo("redirects /overdues to /account if user has no fees")
  it.todo(
    "redirects anything besides checkouts, overdues, requests, settings to /account if user has no fees"
  )
})
