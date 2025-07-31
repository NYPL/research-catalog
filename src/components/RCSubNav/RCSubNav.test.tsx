import React from "react"
import RCSubNav from "./RCSubNav"
import { render, screen } from "../../utils/testUtils"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("RCSubNav", () => {
  it("renders expected buttons", async () => {
    render(<RCSubNav activePage="search" />)
    const subNavButtons = screen.getAllByRole("button")
    expect(subNavButtons).toHaveLength(3)
  })

  it("labels the active link with aria-current", async () => {
    const { rerender } = render(<RCSubNav activePage="search" />)
    // Expect the first button, "Search", to be active and
    // have the aria-current attribute set to "page"
    let subNavButtons = screen.getAllByRole("button")
    expect(subNavButtons[0]).toHaveAttribute("aria-current", "page")
    expect(subNavButtons[1]).not.toHaveAttribute("aria-current")
    expect(subNavButtons[2]).not.toHaveAttribute("aria-current")

    rerender(<RCSubNav activePage="account" />)
    // Expect the third link, "My account", to be active and
    // have the aria-current attribute set to "page"
    subNavButtons = screen.getAllByRole("button")
    expect(subNavButtons[0]).not.toHaveAttribute("aria-current")
    expect(subNavButtons[1]).not.toHaveAttribute("aria-current")
    expect(subNavButtons[2]).toHaveAttribute("aria-current", "page")
  })

  it("does not render Log Out link if user is not logged in", () => {
    render(<RCSubNav isAuthenticated={false} activePage="search" />)
    const subNavButtons = screen.getAllByRole("button")
    expect(subNavButtons).toHaveLength(3)
    const logoutLink = screen.queryByText("Log Out")
    expect(logoutLink).toBeNull()
  })
  it("does render Log Out link if user is logged in", () => {
    render(<RCSubNav isAuthenticated={true} activePage="search" />)
    const subNavButtons = screen.getAllByRole("button")
    expect(subNavButtons).toHaveLength(3)
    const logoutLink = screen.getByText("Log out")
    expect(logoutLink).toBeInTheDocument()
  })
})
