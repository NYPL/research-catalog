import { render, screen } from "@testing-library/react"
import { StatusBanner } from "./StatusBanner"

describe("Status banner", () => {
  it("displays specific failure message", () => {
    render(<StatusBanner status="failure" statusMessage="Specific failure" />)
    expect(
      screen.getByText(/Specific failure Please try again/)
    ).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://www.nypl.org/get-help/contact-us"
    )
    expect(screen.getByRole("complementary")).toHaveAttribute(
      "data-variant",
      "negative"
    )
  })

  it("displays general failure message", () => {
    render(<StatusBanner status="failure" statusMessage="" />)
    expect(screen.getByText(/Your changes were not saved/)).toBeInTheDocument()
    expect(screen.getByRole("complementary")).toHaveAttribute(
      "data-variant",
      "negative"
    )
  })

  it("displays success message", () => {
    render(<StatusBanner status="success" statusMessage="" />)
    expect(screen.getByText(/Your changes were saved/)).toBeInTheDocument()
    expect(screen.getByRole("complementary")).toHaveAttribute(
      "data-variant",
      "positive"
    )
  })
})
