import React from "react"
import { render, screen } from "@testing-library/react"
// this import, as well as its use on line 15 is to avoid the following error:
// TypeError: Cannot use 'in' operator to search for 'beforePopState' in null
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

import SubNav from "./SubNav"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("SubNav", () => {
  it("sends you to Subject Heading Explorer", async () => {
    render(<SubNav activePage="search" />, {
      wrapper: MemoryRouterProvider,
    })
    const subNavLinks = screen.getAllByRole("link")
    expect(subNavLinks).toHaveLength(3)
  })

  it("labels the active link with aria-current", async () => {
    const {rerender } = render(<SubNav activePage="search" />, {
      wrapper: MemoryRouterProvider,
    })
    // We expect the first link, "Search", to be active and
    // have the aria-current attribute set to "page"
    let subNavLinks = screen.getAllByRole("link")
    expect(subNavLinks[0]).toHaveAttribute("aria-current", "page")
    expect(subNavLinks[1]).not.toHaveAttribute("aria-current")
    expect(subNavLinks[2]).not.toHaveAttribute("aria-current")

    rerender(<SubNav activePage="account" />)
    // We expect the third link, "My Account", to be active and
    // have the aria-current attribute set to "page"
    subNavLinks = screen.getAllByRole("link")
    expect(subNavLinks[0]).not.toHaveAttribute("aria-current")
    expect(subNavLinks[1]).not.toHaveAttribute("aria-current")
    expect(subNavLinks[2]).toHaveAttribute("aria-current", "page")
  })
})
