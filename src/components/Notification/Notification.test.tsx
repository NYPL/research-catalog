import { render, screen } from "@testing-library/react"
import Notification from "./Notification"

describe("Notification", () => {
  it("renders the default static heading text", () => {
    render(<Notification notification="Notification content" />)
    expect(screen.getByText("New Service Announcement")).toBeInTheDocument()
  })

  it("renders passed content", () => {
    const { rerender } = render(
      <Notification notification="Notification content" />
    )
    expect(screen.getByText("Notification content")).toBeInTheDocument()

    rerender(<Notification notification={"<p>some text</p>"} />)
    expect(screen.getByText("some text")).toBeInTheDocument()
  })

  it("renders the appropriate aria-label and 'announcement' type", () => {
    const { container } = render(
      <Notification notification="Notification content" />
    )

    expect(screen.getByRole("complementary")).toHaveAttribute(
      "aria-label",
      "Research Catalog Alert"
    )
    expect(container.querySelector("aside")).toHaveAttribute(
      "data-type",
      "announcement"
    )
  })
})
