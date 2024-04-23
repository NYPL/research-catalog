import React from "react"
import { render, screen, act } from "@testing-library/react"
import RCLink from "./RCLink"
import userEvent from "@testing-library/user-event"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

describe("RCLink", () => {
  it("can take an href", async () => {
    render(<RCLink href="/spaghetti">Spaghetti</RCLink>, {
      wrapper: MemoryRouterProvider,
    })
    const link = screen.getByText("Spaghetti")
    await act(async () => {
      await userEvent.click(link)
      expect(link).toHaveAttribute("href", "/spaghetti")
    })
  })
  it("should add appropriate accessibility attributes when link is disabled", async () => {
    render(
      <RCLink href="/spaghetti" disabled>
        Spaghetti
      </RCLink>,
      {
        wrapper: MemoryRouterProvider,
      }
    )
    const link = screen.getByText("Spaghetti")
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("role", "link")
    expect(link).toHaveAttribute("tabindex", "-1")
  })
})
