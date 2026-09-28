import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import mockRouter from "next-router-mock"
import { useLogoutRedirect } from "../../server/auth"

import MyAccountMenu from "./MyAccountMenu"
import type { RCPage } from "../../types/pageTypes"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
jest.mock("../../server/auth")

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

    expect(mockRouter.asPath).toBe("/account/items")
  })

  it("navigates to /account when 'Profile' is clicked", async () => {
    await userEvent.click(screen.getByRole("menuitem", { name: "Profile" }))

    expect(mockRouter.asPath).toBe("/account")
  })

  it("navigates to the logout link when 'Log out' is clicked", async () => {
    await userEvent.click(screen.getByRole("menuitem", { name: "Log out" }))

    expect(useLogoutRedirect).toHaveBeenCalled()
  })
})
