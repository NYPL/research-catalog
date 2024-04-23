import React from "react"
import { render, screen, act } from "@testing-library/react"
import RCLink from "./RCLink"
import userEvent from "@testing-library/user-event"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

describe("RCLink", () => {
  it("can take an href and includes the base url by default", async () => {
    render(<RCLink href="/spaghetti">Spaghetti</RCLink>)
    const link = screen.getByText("Spaghetti")
    expect(link).toHaveAttribute("href", "/research/research-catalog/spaghetti")
  })
  it("does not render the base url when includeBaseUrl is set to false", async () => {
    render(
      <RCLink href="/spaghetti" includeBaseUrl={false}>
        Spaghetti
      </RCLink>
    )
    const link = screen.getByText("Spaghetti")
    expect(link).toHaveAttribute("href", "/spaghetti")
  })
  it("should add appropriate accessibility attributes when link is disabled", async () => {
    render(
      <RCLink href="/spaghetti" disabled>
        Spaghetti
      </RCLink>
    )
    const link = screen.getByText("Spaghetti")
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("role", "link")
    expect(link).toHaveAttribute("tabindex", "-1")
  })
})
