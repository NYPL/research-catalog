import MyAccount from "../../../pages/account"
import { render, screen } from "@testing-library/react"
import type {
  Checkout,
  Fine,
  Hold,
  Patron,
} from "../../../src/types/accountTypes"

describe("My Account page", () => {
  it("displays an error message when patron is empty", () => {
    render(
      <MyAccount
        checkouts={[{} as Checkout]}
        holds={[{} as Hold]}
        fines={{} as Fine}
        patron={{} as Patron}
        isAuthenticated={true}
      />
    )
    expect(screen.getByText("We are unable to display", { exact: false }))
  })
})
