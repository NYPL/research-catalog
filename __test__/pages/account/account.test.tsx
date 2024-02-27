import MyAccount from "../../../pages/account"
import { render, screen } from "../../../__test__/test-utils"

describe("My Account page", () => {
  it("displays an error message when patron is empty", () => {
    render(<MyAccount isAuthenticated={true} />)
    expect(screen.getByText("We are unable to display", { exact: false }))
  })
})
