import {
  bibWithSupplementaryContent,
  bibWithFindingAidAndTOC,
  noParallels,
  parallelsBib,
} from "../../../__test__/fixtures/bibFixtures"
import BibDetailsModel from "../../models/BibDetails"
import BibDetails from "./BibDetail"
import type { LinkingEntryDetail } from "../../types/bibDetailsTypes"

import { render, screen } from "@testing-library/react"
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

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
      const browseLink = screen.getAllByText("[Browse in subject index]")[0]
      expect(browseLink).toHaveAttribute(
        "href",
        expect.stringContaining("/browse?q=")
      )
    })
    it("renders Author field with roles and index link", () => {
      render(<BibDetails details={noParallelsBibModel.topDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const browseLink = screen.getAllByText("[Browse in author index]")[0]
      expect(browseLink).toHaveAttribute(
        "href",
        expect.stringContaining("/browse/authors?q=")
      )
      const searchLink = screen.getByText(/Cortanze, Gérard de./)
      expect(searchLink).toHaveAttribute(
        "href",
        expect.stringContaining(
          "/browse/author-title/Cortanze%2C%20G%C3%A9rard%20de%2E"
        )
      )
      const authorTextWithRoles = screen.getByText(
        /, arranger of music, composer, conductor/
      )
      expect(authorTextWithRoles).toBeInTheDocument()
    })
    it("renders Additional authors field with roles and index link", () => {
      render(<BibDetails details={noParallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const browseLink = screen.getAllByText("[Browse in author index]")[0]
      expect(browseLink).toHaveAttribute(
        "href",
        expect.stringContaining("/browse/authors?q=")
      )
      const searchLink = screen.getByText(/Smith, John/)
      expect(searchLink).toHaveAttribute(
        "href",
        expect.stringContaining("/browse/author-title/Smith")
      )
      const authorTextWithRoles = screen.getByText(/, ballet dancer./)
      expect(authorTextWithRoles).toBeInTheDocument()
    })
    it("renders series field with search filter series link", () => {
      render(<BibDetails details={noParallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const series = screen.getByText("Childhood")
      expect(series).toHaveAttribute(
        "href",
        expect.stringContaining("/search?filters[series][0]=Childhood")
      )
    })
  })

  describe("linking entry details", () => {
    it("renders the linking entry label and display text", () => {
      render(<BibDetails details={parallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      expect(screen.getByText("Continues")).toBeInTheDocument()
      expect(
        screen.getByText("Povelja oktobra 0350-1469 (OCoLC)220384499")
      ).toBeInTheDocument()
    })
    it("renders a '[Search as a query]' link pointing to the linking entry url", () => {
      render(<BibDetails details={parallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const searchLinks = screen.getAllByText("[Search as a query]")
      const continuesLink = searchLinks.find(
        (link) =>
          link.getAttribute("href") ===
          "/search/linking-entry/b15349955/780/0/10305113855"
      )
      expect(continuesLink).toBeDefined()
    })
    it("does not render '[Search as a query]' links for parallels", () => {
      render(<BibDetails details={parallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })

      const supplementDetail = screen.getByTestId("has-supplement")
      // Should have 2 list items for "Has supplement"
      const listItems = supplementDetail.querySelectorAll("li")
      expect(listItems).toHaveLength(2)
      // Each list item should have exactly 1 "[Search as a query]" link (only primary)
      listItems.forEach((item) => {
        const linkElements = Array.from(item.querySelectorAll("a")).filter(
          (a) => a.textContent === "[Search as a query]"
        )
        expect(linkElements).toHaveLength(1)
      })
    })
    it("renders the parallel display text", () => {
      render(<BibDetails details={parallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      expect(
        screen.getByText("Повеља октобра 0350-1469 (OCoLC)220384499")
      ).toBeInTheDocument()
    })
    it("groups consecutive linking entries with the same label under one detail", () => {
      render(<BibDetails details={parallelsBibModel.bottomDetails} />, {
        wrapper: MemoryRouterProvider,
      })
      const supplementDetail = screen.getByTestId("has-supplement")
      expect(supplementDetail.children).toHaveLength(2)
      expect(
        screen.getByText("Preporučeno 2005- 1452-3531")
      ).toBeInTheDocument()
      expect(screen.getByText("Vidi čuda 2006- 1452-7316")).toBeInTheDocument()
    })
    it("renders orphaned parallels (no display, only parallelDisplay) without search link", () => {
      const mockOrphanedParallelDetail: LinkingEntryDetail = {
        label: "Test Linking Entry",
        value: [
          {
            display: "the spaghetti",
            url: "/search/linking-entry/test/test/test/test",
            parallelDisplay: "le spaghetti",
          },
          {
            display: null,
            url: null,
            parallelDisplay: "hello",
          },
        ],
      }

      render(<BibDetails details={[mockOrphanedParallelDetail]} />, {
        wrapper: MemoryRouterProvider,
      })

      // Find all list items
      const listItems = screen.getAllByRole("listitem")
      expect(listItems).toHaveLength(2)

      // First item should have display and search link
      const firstItem = listItems[0]
      expect(firstItem.textContent).toContain("the spaghetti")
      const firstItemSearchLinks = Array.from(
        firstItem.querySelectorAll("a")
      ).filter((a) => a.textContent === "[Search as a query]")
      expect(firstItemSearchLinks).toHaveLength(1)

      // Second item should only have parallelDisplay text, no search link
      const orphanedItem = listItems[1]
      expect(orphanedItem.textContent).toContain("hello")
      const orphanSearchLinks = Array.from(
        orphanedItem.querySelectorAll("a")
      ).filter((a) => a.textContent === "[Search as a query]")
      expect(orphanSearchLinks).toHaveLength(0)
    })
  })
})
