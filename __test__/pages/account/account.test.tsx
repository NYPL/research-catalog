import { render, screen } from "../../../src/utils/testUtils"
import MyAccount from "../../../pages/account/[[...index]]"
import { useRouter } from "next/router"

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
})
