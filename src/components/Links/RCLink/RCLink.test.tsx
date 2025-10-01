import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import RCLink from "./RCLink"

// Mocking DS Link to render as plain <a>
jest.mock("@nypl/design-system-react-components", () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

describe("RCLink", () => {
  it("renders an internal link with NextLink", () => {
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
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
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

  it("applies bold fontWeight when active", () => {
    render(
      <RCLink href="/about" active>
        About
      </RCLink>
    )
    const link = screen.getByRole("link", { name: /about/i })
    expect(link).toHaveAttribute("fontWeight", "bold")
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

  it("applies white focus ring CSS when hasWhiteFocusRing is true", () => {
    render(
      <RCLink href="/about" hasWhiteFocusRing>
        About
      </RCLink>
    )
    const link = screen.getByRole("link", { name: /about/i })
    expect(link).toHaveAttribute(
      "__css",
      expect.objectContaining({
        _focus: { outlineColor: "ui.white" },
      }) as any
    )
  })
})
