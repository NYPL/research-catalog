import React from "react"
import { render, screen } from "@testing-library/react"
import RCLink from "./RCLink"

describe("RCLink", () => {
  it("should render with the base url as the href by default", async () => {
    render(<RCLink>Research Catalog</RCLink>)
    const link = screen.getByText("Research Catalog")
    expect(link).toHaveAttribute("href", "/research/research-catalog")
  })
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
    expect(link).not.toHaveAttribute("aria-disabled")
  })
  it("should add appropriate accessibility attributes when link is disabled", async () => {
    render(<RCLink disabled>Spaghetti</RCLink>)
    const link = screen.getByText("Spaghetti")
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("tabindex", "-1")
  })
})
