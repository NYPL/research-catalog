import { render, screen } from "@testing-library/react"
import FindingAid from "./FindingAid"

const renderFindingAid = ({ isNyplBib }) => {
  render(
    <FindingAid
      findingAidURL={"mockUrl"}
      isNyplBib={isNyplBib}
      hasElectronicResources={false}
    />
  )
}

describe("FindingAid component", () => {
  it("renders the correct heading", () => {
    renderFindingAid({ isNyplBib: true })
    expect(screen.queryByText("Collection information")).toBeInTheDocument()
  })

  it("renders the given Archives link", () => {
    renderFindingAid({ isNyplBib: true })
    const findingAidContainer = screen.queryByTestId("collection-information")
    expect(findingAidContainer).toBeInTheDocument()

    const archivesLink = screen.getByRole("link", {
      name: "Finding aid",
    })
    expect(archivesLink).toHaveAttribute("href", "mockUrl")
  })

  it("renders the appointments link if isNyplBib is true", () => {
    renderFindingAid({ isNyplBib: true })
    const appointmentsLink = screen.getByRole("link", {
      name: "may require an appointment",
    })
    expect(appointmentsLink).toHaveAttribute(
      "href",
      "https://libguides.nypl.org/NYPLSpecialCollectionsAccount"
    )
  })

  it("does not render the appointments link if isNyplBib is false", () => {
    renderFindingAid({ isNyplBib: false })
    const appointmentsLink = screen.queryByRole("link", {
      name: "may require an appointment",
    })
    expect(appointmentsLink).not.toBeInTheDocument()
  })
})
