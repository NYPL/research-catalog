import userEvent from "@testing-library/user-event"
import {
  bibWithSupplementaryContent,
  noParallels,
  parallelsBib,
} from "../../../__test__/fixtures/bibFixtures"
import BibDetailsModel from "../../models/BibDetails"
import BibDetails from "./BibDetail"

import { render, screen } from "@testing-library/react"
import mockRouter from "next-router-mock"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("BibDetail component", () => {
  const suppBib = new BibDetailsModel(bibWithSupplementaryContent)
  const noParallelsBibModel = new BibDetailsModel(noParallels)
  const parallelsBibModel = new BibDetailsModel(parallelsBib)
  describe("text only details", () => {
    it("single value", () => {
      render(<BibDetails details={noParallelsBibModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const titleLabel = screen.getByText("Title")
      const title = screen.getByText("Spaghetti! / Gérard de Cortanze.")
      expect(titleLabel).toBeInTheDocument()
      expect(title).toBeInTheDocument()
    })
    it("renders multiple values, primaries and orphaned parallels", () => {
      render(<BibDetails details={parallelsBibModel.topDetails} />)
      const publisherDetails = screen.getByTestId("Published By")
      expect(publisherDetails.children).toHaveLength(3)
    })
  })
  describe("linked details", () => {
    it("internal link", async () => {
      mockRouter.push("/bib/b12345678")
      render(<BibDetails details={noParallelsBibModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const creatorLiteralLink = screen.getByText("Cortanze, Gérard de.")
      await userEvent.click(creatorLiteralLink)

      expect(mockRouter.asPath).toBe(
        "/search?filters%5BcreatorLiteral%5D%5B0%5D=Cortanze%2C+G%C3%A9rard+de."
      )
    })
    it("external link", async () => {
      render(<BibDetails details={suppBib.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const supplementaryContent = screen.getByText("Image")
      expect(supplementaryContent).toHaveAttribute(
        "href",
        expect.stringContaining("images.contentreserve.com")
      )
    })
  })
  describe("subject heading links", () => {
    let subjectHeadings
    beforeEach(() => {
      render(<BibDetails details={noParallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      subjectHeadings = screen.getAllByTestId("subjectLinksPer")
    })
    it("renders subject link groups per subject literal", () => {
      expect(subjectHeadings).toHaveLength(
        noParallelsBibModel.bib.subjectLiteral.length
      )
    })
    it("splits individual subject headings with divider", () => {
      const greaterThanSigns = screen.getAllByTestId("divider")
      const numberOfDividersInSubjectLiteral = 3
      expect(greaterThanSigns).toHaveLength(numberOfDividersInSubjectLiteral)
    })
    it("links to stacked subject headings", () => {
      const authorsSubject = screen.getByText("Authors, French")
      const authors20Subject = screen.getByText("20th century")
      const authors20BioSubject = screen.getByText("Biography")
      expect(authorsSubject).toHaveAttribute(
        "href",
        expect.stringContaining(encodeURI("Authors, French"))
      )
      expect(authors20Subject).toHaveAttribute(
        "href",
        expect.stringContaining(encodeURI("Authors, French -- 20th century"))
      )
      expect(authors20BioSubject).toHaveAttribute(
        "href",
        expect.stringContaining(
          encodeURI("Authors, French -- 20th century -- Biography")
        )
      )
    })
  })
})
