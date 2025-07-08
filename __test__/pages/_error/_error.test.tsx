import React from "react"
import { render, screen, within } from "../../../src/utils/testUtils"
import Error from "../../../pages/_error"

describe("500 error page", () => {
  it("should display error text", () => {
    render(<Error activePage="account" />)
    const container = screen.getByRole("main")
    const heading = within(container).getByRole("heading")
    expect(heading).toHaveTextContent("Something went wrong on our end")
  })
})
