import { render, screen } from "@testing-library/react"
import BibDetails from "./BibDetail"
import BibDetailsModel from "../../models/BibDetails"
import {
  bibWithSupplementaryContent,
  noParallels,
  parallelsBib,
  bibWithSubjectHeadings,
} from "../../../__test__/fixtures/bibFixtures"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

describe("BibDetails component", () => {
  const supplementaryContentModel = new BibDetailsModel(
    bibWithSupplementaryContent.resource,
    bibWithSupplementaryContent.annotatedMarc
  )
  const noParallelsModel = new BibDetailsModel(
    noParallels.resources,
    noParallels.annotatedMarc
  )
  const parallelsModel = new BibDetailsModel(
    parallelsBib.resource,
    parallelsBib.annotatedMarc
  )
  const subjectHeadingsModel = new BibDetailsModel(
    bibWithSubjectHeadings.resource,
    bibWithSubjectHeadings.annotatedMarc
  )

  describe("plain text details", () => {
    it("renders single-value details", () => {
      render(<BibDetails details={noParallelsModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      expect(screen.getByText("Title")).toBeInTheDocument()
      expect(
        screen.getByText("Spaghetti! / Gérard de Cortanze.")
      ).toBeInTheDocument()
    })

    it("renders multiple-value details", () => {
      render(<BibDetails details={parallelsModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const publishedByList = screen.getByTestId("published-by")
      expect(publishedByList.children.length).toBeGreaterThan(1)
    })
  })

  describe("linked details", () => {
    it("renders internal links with correct href", () => {
      render(<BibDetails details={noParallelsModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const link = screen.getByText("Cortanze, Gérard de.")
      expect(link).toHaveAttribute(
        "href",
        expect.stringContaining("/search?filters[creatorLiteral][0]=")
      )
    })

    it("renders external links with correct href", () => {
      render(<BibDetails details={supplementaryContentModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const externalLink = screen.getByText("Image")
      expect(externalLink).toHaveAttribute(
        "href",
        expect.stringContaining("images.contentreserve.com")
      )
    })

    it("renders Subject field with index links", () => {
      render(<BibDetails details={subjectHeadingsModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const browseLink = screen.getAllByText("[Browse in index]")[0]
      expect(browseLink).toHaveAttribute(
        "href",
        expect.stringContaining("/browse?q=")
      )
    })
  })

  describe("heading prop", () => {
    it("renders heading when provided", () => {
      render(
        <BibDetails
          details={noParallelsModel.topDetails}
          heading="Bibliographic Details"
        />,
        { wrapper: MemoryRouterProvider }
      )
      expect(screen.getByText("Bibliographic Details")).toBeInTheDocument()
    })

    it("does not render heading when not provided", () => {
      render(<BibDetails details={noParallelsModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      expect(
        screen.queryByText("Bibliographic Details")
      ).not.toBeInTheDocument()
    })
  })

  describe("empty details", () => {
    it("renders nothing when details array is empty", () => {
      const { container } = render(<BibDetails details={[]} />)
      expect(container.firstChild).toBeNull()
    })

    it("renders nothing when details is undefined", () => {
      const { container } = render(<BibDetails details={undefined} />)
      expect(container.firstChild).toBeNull()
    })
  })
})
