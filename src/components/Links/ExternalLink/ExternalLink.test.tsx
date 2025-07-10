import React from "react"
import { render, screen, act } from "@testing-library/react"
import ExternalLink from "./ExternalLink"
import userEvent from "@testing-library/user-event"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

describe("ExternalLink", () => {
  it("can take an href", async () => {
    render(<ExternalLink href="/spaghetti">Spaghetti</ExternalLink>, {
      wrapper: MemoryRouterProvider,
    })
    const link = screen.getByText("Spaghetti")
    await act(async () => {
      await userEvent.click(link)
      expect(link).toHaveAttribute("href", "/spaghetti")
    })
  })
  it("opens in a new tab by default", async () => {
    render(<ExternalLink href="/spaghetti">Spaghetti</ExternalLink>)
    const link = screen.getByText("Spaghetti")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).not.toHaveAttribute("aria-disabled")
  })

  it("should add appropriate accessibility attributes when link is disabled", async () => {
    render(
      <ExternalLink href="/spaghetti" disabled>
        Spaghetti
      </ExternalLink>
    )
    const link = screen.getByText("Spaghetti")
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("tabindex", "-1")
  })
})
