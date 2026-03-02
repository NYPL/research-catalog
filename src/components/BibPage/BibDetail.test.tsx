// import userEvent from "@testing-library/user-event"
import userEvent from "@testing-library/user-event"
import {
  bibWithSupplementaryContent,
  bibWithFindingAidAndTOC,
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
  const supplementaryContentModel = new BibDetailsModel(
    bibWithSupplementaryContent.resource,
    bibWithSupplementaryContent.annotatedMarc
  )
  const noParallelsBibModel = new BibDetailsModel(
    noParallels.resources,
    noParallels.annotatedMarc
  )
  const parallelsBibModel = new BibDetailsModel(
    parallelsBib.resource,
    parallelsBib.annotatedMarc
  )
  const findingAidBibModel = new BibDetailsModel(
    bibWithFindingAidAndTOC.resource,
    bibWithFindingAidAndTOC.annotatedMarc
  )
  describe("bottom details", () => {
    it("renders resource fields", () => {
      render(<BibDetails details={noParallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      expect(screen.getByText("Language")).toBeInTheDocument()
      expect(screen.getByText("French")).toBeInTheDocument()
      expect(screen.getByText("Series")).toBeInTheDocument()
      expect(screen.queryAllByText("Childhood")[0]).toBeInTheDocument()
      expect(screen.getByText("Series statement")).toBeInTheDocument()
      expect(screen.queryAllByText(/Haute enfance/)[0]).toBeInTheDocument()
    })
    it("merges annotated MARC and resource fields without label duplicates", () => {
      const combinedDetails = noParallelsBibModel.bottomDetails
      const labels = combinedDetails.map((d) => d.label)
      const labelCounts = labels.reduce((acc, label) => {
        acc[label] = (acc[label] || 0) + 1
        return acc
      }, {})

      Object.values(labelCounts).forEach((count) => {
        expect(count).toBeLessThanOrEqual(1)
      })
    })
    it("merges annotated MARC and resource fields without value duplicates", () => {
      const combinedDetails = noParallelsBibModel.bottomDetails
      // Stringify values for comparison
      const toKey = (v: unknown): string => {
        if (typeof v === "object" && v !== null) {
          return JSON.stringify(v, Object.keys(v).sort())
        }
        return String(v)
      }
      const allValues = combinedDetails.flatMap((d) => {
        // drop subjects, they don't need to be assessed for duplication
        if (d.label === "Subject") return []
        const values = Array.isArray(d.value) ? d.value : [d.value]
        return values.map(toKey)
      })

      const valueCounts = allValues.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      Object.values(valueCounts).forEach((count) => {
        expect(count).toBeLessThanOrEqual(1)
      })
    })
  })

  describe("text only details", () => {
    it("single value: title", () => {
      render(<BibDetails details={noParallelsBibModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const titleLabel = screen.getByText("Title")
      const title = screen.getByText("Spaghetti! / Gérard de Cortanze.")
      expect(titleLabel).toBeInTheDocument()
      expect(title).toBeInTheDocument()
    })
    it("single value: format", () => {
      render(<BibDetails details={noParallelsBibModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const formatLabel = screen.getByText("Format")
      const format = screen.getByText("Text")
      expect(formatLabel).toBeInTheDocument()
      expect(format).toBeInTheDocument()
    })
    it("renders multiple values, primaries and orphaned parallels", () => {
      render(<BibDetails details={parallelsBibModel.topDetails} />)
      const publisherDetails = screen.getByTestId("published-by")
      expect(publisherDetails.children).toHaveLength(3)
    })
  })
  describe("linked details", () => {
    it("renders internal links", async () => {
      mockRouter.push("/bib/b12345678")
      render(<BibDetails details={noParallelsBibModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      // creatorLiteral should link to contributorLiteral
      const creatorLiteralLink = screen.getByText("Cortanze, Gérard de.")
      expect(creatorLiteralLink).toHaveAttribute(
        "href",
        expect.stringContaining(
          "/search?filters[contributorLiteral][0]=Cortanze%2C%20G%C3%A9rard%20de%2E"
        )
      )
      await userEvent.click(creatorLiteralLink)
      expect(mockRouter.asPath).toBe(
        "/search?filters%5BcontributorLiteral%5D%5B0%5D=Cortanze%2C+G%C3%A9rard+de."
      )
    })
    it("renders external links", async () => {
      render(<BibDetails details={supplementaryContentModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const supplementaryContent = screen.getByText("Image")
      expect(supplementaryContent).toHaveAttribute(
        "href",
        expect.stringContaining("images.contentreserve.com")
      )
    })
    it("does not render finding aid in supplementary content", async () => {
      render(<BibDetails details={findingAidBibModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      expect(screen.queryByText("Finding aid")).not.toBeInTheDocument()
    })

    it("renders Subject field with index links", () => {
      render(<BibDetails details={noParallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const browseLink = screen.getAllByText("[Browse in index]")[0]
      expect(browseLink).toHaveAttribute(
        "href",
        expect.stringContaining("/browse?q=")
      )
    })
    it("renders series field with search filter series link", () => {
      render(<BibDetails details={noParallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const seriesStatement = screen.getByText("Childhood")
      expect(seriesStatement).toHaveAttribute(
        "href",
        expect.stringContaining("/search?filters[series][0]=Childhood")
      )
    })
  })
})
