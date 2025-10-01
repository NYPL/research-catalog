import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import RCLink from "./RCLink"

describe("RCLink", () => {
  it("renders an internal link with Next Link", () => {
    render(<RCLink href="/about">About</RCLink>)

    const link = screen.getByRole("link", { name: /about/i })
    expect(link).toHaveAttribute("href", "/about")
  })

  it("renders an external link with target _blank by default", () => {
    render(
      <RCLink isExternal href="https://nypl.org">
        NYPL
      </RCLink>
    )
    const link = screen.getByRole("link", { name: /nypl/i })
    expect(link).toHaveAttribute("href", "https://nypl.org")
    expect(link).toHaveAttribute("target", "_blank")
  })

  it("respects custom target on external link", () => {
    render(
      <RCLink isExternal href="https://nypl.org" target="_self">
        NYPL
      </RCLink>
    )
    const link = screen.getByRole("link", { name: /nypl/i })
    expect(link).toHaveAttribute("target", "_self")
    expect(link).not.toHaveAttribute("rel") // no rel for _self
  })

  it("sets aria-disabled and tabIndex when disabled", () => {
    render(
      <RCLink href="/about" disabled>
        About
      </RCLink>
    )
    const link = screen.getByRole("link", { name: /about/i })
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("tabIndex", "-1")
  })
})
