import React from "react"
import userEvent from "@testing-library/user-event"
import mockRouter from "next-router-mock"
import { render, screen } from "../../utils/testUtils"

import MyAccountMenu from "./MyAccountMenu"
import type { RCPage } from "../../types/pageTypes"
import { useLogoutRedirect } from "../../hooks/useAuthRedirect"

jest.mock("../../hooks/useAuthRedirect")

const renderMenu = (activePage: RCPage = "search") =>
  render(<MyAccountMenu activePage={activePage} />)

const openMenu = async () => {
  await userEvent.click(screen.getByRole("button", { name: /my account/i }))
}

describe("MyAccountMenu", () => {
  beforeEach(async () => {
    mockRouter.setCurrentUrl("/search")
    renderMenu()
    await openMenu()
  })

  it("menu list shows all tabs/options", async () => {
    const labels = [
      "Profile",
      "Checkouts",
      "Requests",
      "Lists",
      "Fees",
      "Log out",
    ]
    labels.forEach((label) => {
      expect(screen.getByRole("menuitem", { name: label })).toBeInTheDocument()
    })
  })

  it("navigates to the corresponding account tab when a tab is clicked", async () => {
    await userEvent.click(screen.getByRole("menuitem", { name: "Checkouts" }))

    expect(mockRouter.asPath).toContain("/account/items") // contain because focus param is added to URL
  })

  it("navigates to /account when 'Profile' is clicked", async () => {
    await userEvent.click(screen.getByRole("menuitem", { name: "Profile" }))

    expect(mockRouter.asPath).toContain("/account")
  })

  it("navigates to the logout link when 'Log out' is clicked", async () => {
    await userEvent.click(screen.getByRole("menuitem", { name: "Log out" }))

    expect(useLogoutRedirect).toHaveBeenCalled()
  })
})
