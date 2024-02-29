import MyAccount from "../../../pages/account/[[...index]]"
import { render, screen } from "@testing-library/react"

describe("My Account page", () => {
  it("displays an error message when patron is empty", () => {
    render(<MyAccount isAuthenticated={true} />)
    expect(screen.getByText("We are unable to display", { exact: false }))
  })
})
