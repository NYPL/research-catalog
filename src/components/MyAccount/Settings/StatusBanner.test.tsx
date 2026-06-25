import { render, screen } from "@testing-library/react"
import { StatusBanner } from "./StatusBanner"

describe("Status banner", () => {
  it("displays failure message", () => {
    render(
      <StatusBanner type="failure" message="Your changes were not saved" />
    )
    expect(screen.getByText(/Your changes were not saved/)).toBeInTheDocument()
    expect(screen.getByRole("complementary")).toHaveAttribute(
      "data-variant",
      "negative"
    )
  })

  it("displays success message", () => {
    render(<StatusBanner type="success" message="Your changes were saved" />)
    expect(screen.getByText(/Your changes were saved/)).toBeInTheDocument()
    expect(screen.getByRole("complementary")).toHaveAttribute(
      "data-variant",
      "positive"
    )
  })
})
