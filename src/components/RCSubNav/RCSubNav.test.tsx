import React from "react"
import { render, screen } from "@testing-library/react"
// this import, as well as its use on line 15 is to avoid the following error:
// TypeError: Cannot use 'in' operator to search for 'beforePopState' in null
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

import RCSubNav from "./RCSubNav"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("RCSubNav", () => {
  it("sends you to Subject Heading Explorer", async () => {
    render(<RCSubNav activePage="search" inBrowse={false} />, {
      wrapper: MemoryRouterProvider,
    })
    const subNavLinks = screen.getAllByRole("link")
    expect(subNavLinks).toHaveLength(4)
  })

  it("labels the active link with aria-current", async () => {
    const { rerender } = render(
      <RCSubNav activePage="search" inBrowse={false} />,
      {
        wrapper: MemoryRouterProvider,
      }
    )
    // We expect the first link, "Search", to be active and
    // have the aria-current attribute set to "page"
    let subNavLinks = screen.getAllByRole("link")
    expect(subNavLinks[0]).toHaveAttribute("aria-current", "page")
    expect(subNavLinks[1]).not.toHaveAttribute("aria-current")
    expect(subNavLinks[2]).not.toHaveAttribute("aria-current")

    rerender(<RCSubNav activePage="account" inBrowse={false} />)
    // We expect the third link, "My account", to be active and
    // have the aria-current attribute set to "page"
    subNavLinks = screen.getAllByRole("link")
    expect(subNavLinks[0]).not.toHaveAttribute("aria-current")
    expect(subNavLinks[1]).not.toHaveAttribute("aria-current")
    expect(subNavLinks[3]).toHaveAttribute("aria-current", "page")
  })

  // it("renders empty My Account icon if user is not logged in", () => {
  //   render(
  //     <RCSubNav isAuthenticated={false} activePage="search" inBrowse={false} />
  //   )
  // })

  // it("renders filled-in My Account icon if user is logged in", () => {
  //   render(
  //     <RCSubNav isAuthenticated={true} activePage="search" inBrowse={false} />
  //   )
  // })
})
