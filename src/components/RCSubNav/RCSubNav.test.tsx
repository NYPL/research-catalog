import React from "react"
import { render, screen } from "@testing-library/react"
// this import, as well as its use on line 15 is to avoid the following error:
// TypeError: Cannot use 'in' operator to search for 'beforePopState' in null
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

import RCSubNav from "./RCSubNav"
import { FocusProvider } from "../../context/FocusContext"
import { userEvent } from "@testing-library/user-event"
import { useLoginRedirect } from "../../hooks/useAuthRedirect"

jest.mock("../../hooks/useAuthRedirect")

describe("RCSubNav", () => {
  beforeEach(() => {
    ;(useLoginRedirect as jest.Mock).mockReturnValue("/login")
  })

  const renderWithProviders = (
    activePage,
    isAuthenticated = false,
    inBrowse = false
  ) => {
    return render(
      <MemoryRouterProvider>
        <FocusProvider>
          <RCSubNav
            activePage={activePage}
            isAuthenticated={isAuthenticated}
            inBrowse={inBrowse}
          />
        </FocusProvider>
      </MemoryRouterProvider>
    )
  }

  it("sends you to Subject Heading Explorer", async () => {
    renderWithProviders("search")
    const subNavLinks = screen.getAllByRole("link")
    expect(subNavLinks).toHaveLength(4)
  })

  it("labels the active link with aria-current", async () => {
    const { rerender } = renderWithProviders("search")
    // We expect the first link, "Search", to be active and
    // have the aria-current attribute set to "page"
    let subNavLinks = screen.getAllByRole("link")
    expect(subNavLinks[0]).toHaveAttribute("aria-current", "page")
    expect(subNavLinks[1]).not.toHaveAttribute("aria-current")
    expect(subNavLinks[2]).not.toHaveAttribute("aria-current")
    expect(subNavLinks[3]).not.toHaveAttribute("aria-current")

    rerender(
      <MemoryRouterProvider>
        <FocusProvider>
          <RCSubNav activePage="account" isAuthenticated inBrowse={false} />
        </FocusProvider>
      </MemoryRouterProvider>
    )

    subNavLinks = screen.getAllByRole("link")
    expect(subNavLinks[0]).not.toHaveAttribute("aria-current")
    expect(subNavLinks[1]).not.toHaveAttribute("aria-current")
    expect(subNavLinks[2]).not.toHaveAttribute("aria-current")

    // We expect the "My account" button to be active (if authenticated) and
    // have the aria-current attribute set to "page"
    const myAccountButton = screen.getByRole("button", { name: "My account" })
    expect(myAccountButton).toHaveAttribute("aria-current", "page")
  })

  it("renders the user guide link", async () => {
    renderWithProviders("search")
    const userGuideLink = screen.queryByRole("link", { name: /guide/i })
    expect(userGuideLink).toBeInTheDocument()
  })

  it("renders 'Log in' link when not authenticated, which calls useLoginRedirect", async () => {
    renderWithProviders("search")
    const loginLink = screen.queryByRole("link", { name: "Log in" })
    await userEvent.click(loginLink)
    expect(useLoginRedirect).toHaveBeenCalled()
  })
})
