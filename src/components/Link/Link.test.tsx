import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Link from "./Link"
import NextLink from "next/link"

jest.mock("next/link", () => {
  return jest.fn(({ children, ...props }) => <a {...props}>{children}</a>)
})

describe("Link", () => {
  it("renders using Next.js Link internally", () => {
    render(<Link href="/about">About</Link>)

    expect(NextLink).toHaveBeenCalledWith(
      expect.objectContaining({ href: "/about" }),
      {}
    )

    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "/about"
    )
  })
  it("renders an external link with target _blank by default", () => {
    render(
      <Link isExternal href="https://nypl.org">
        NYPL
      </Link>
    )
    const link = screen.getByRole("link", { name: /nypl/i })
    expect(link).toHaveAttribute("href", "https://nypl.org")
    expect(link).toHaveAttribute("target", "_blank")
  })

  it("respects custom target on external link", () => {
    render(
      <Link isExternal href="https://nypl.org" target="_self">
        NYPL
      </Link>
    )
    const link = screen.getByRole("link", { name: /nypl/i })
    expect(link).toHaveAttribute("target", "_self")
    expect(link).not.toHaveAttribute("rel") // no rel for _self
  })

  it("sets aria-disabled and tabIndex when disabled", () => {
    render(
      <Link href="/about" disabled>
        About
      </Link>
    )
    const link = screen.getByRole("link", { name: /about/i })
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("tabIndex", "-1")
  })
})
