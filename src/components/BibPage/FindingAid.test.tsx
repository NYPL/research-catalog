import { render, screen } from "@testing-library/react"
import FindingAid from "./FindingAid"

describe("FindingAid component", () => {
  beforeEach(() => {
    render(
      <FindingAid findingAidURL={"mockUrl"} hasElectronicResources={false} />
    )
  })

  it("renders the correct heading", () => {
    expect(screen.queryByText("Collection information")).toBeInTheDocument()
  })

  it("renders the given Archives link", () => {
    const findingAidContainer = screen.queryByTestId("collection-information")
    expect(findingAidContainer).toBeInTheDocument()

    const archivesLink = screen.getByRole("link", {
      name: "Finding aid",
    })
    expect(archivesLink).toHaveAttribute("href", "mockUrl")
  })

  it("renders the appointments link", () => {
    const appointmentsLink = screen.getByRole("link", {
      name: "require an appointment",
    })
    expect(appointmentsLink).toHaveAttribute(
      "href",
      "https://www.nypl.org/research/appointments"
    )
  })
})
