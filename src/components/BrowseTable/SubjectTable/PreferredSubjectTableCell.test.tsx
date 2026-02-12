import { render, screen } from "../../../utils/testUtils"
import type { PreferredSubject } from "../../../types/browseTypes"
import PreferredSubjectTableCell from "./PreferredSubjectTableCell"

const createPreferredSubject = (
  overrides: Partial<PreferredSubject> = {}
): PreferredSubject => ({
  termLabel: "Art -- Artists",
  url: "/browse/subject/art%20--%20artists",
  count: "123",
  seeAlso: { label: "See also", terms: [] },
  broaderTerms: { label: "Broader term", terms: [] },
  narrowerTerms: { label: "Narrower term", terms: [] },
  ...overrides,
})

describe("PreferredSubjectTableCell", () => {
  it("renders preferred term as a link", () => {
    const subject = createPreferredSubject()
    render(<PreferredSubjectTableCell subject={subject} />)

    const link = screen.getByRole("link", { name: "Art -- Artists" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
      "href",
      // Full page reload link, not Next Link with CSR
      "/research/research-catalog/browse/subject/art%20--%20artists"
    )
  })

  it("renders 'See also' section if seeAlso terms exist", () => {
    const subject = createPreferredSubject({
      seeAlso: {
        label: "See also",
        terms: [
          {
            termLabel: "Painting",
            url: "/browse?q=Painting&search_scope=starts_with",
            count: "",
          },
          {
            termLabel: "Sculpture",
            url: "/browse?q=Sculpture&search_scope=starts_with",
            count: "",
          },
        ],
      },
    })

    render(<PreferredSubjectTableCell subject={subject} />)

    expect(screen.getByText("See also:")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Painting" })).toHaveAttribute(
      "href",
      "/browse?q=Painting&search_scope=starts_with"
    )
    expect(screen.getByRole("link", { name: "Sculpture" })).toHaveAttribute(
      "href",
      "/browse?q=Sculpture&search_scope=starts_with"
    )
  })

  it("renders 'Broader term' section if broaderTerms exist", () => {
    const subject = createPreferredSubject({
      broaderTerms: {
        label: "Broader term",
        terms: [
          {
            termLabel: "Visual Arts",
            url: "/browse?q=Visual Arts&search_scope=starts_with",
            count: "",
          },
        ],
      },
    })

    render(<PreferredSubjectTableCell subject={subject} />)

    expect(screen.getByText("Broader term:")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Visual Arts" })).toHaveAttribute(
      "href",
      "/browse?q=Visual Arts&search_scope=starts_with"
    )
  })

  it("renders 'Narrower term' section if narrowerTerms exist", () => {
    const subject = createPreferredSubject({
      narrowerTerms: {
        label: "Narrower term",
        terms: [
          {
            termLabel: "Modernism",
            url: "/browse?q=Modernism&search_scope=starts_with",
            count: "",
          },
        ],
      },
    })

    render(<PreferredSubjectTableCell subject={subject} />)

    expect(screen.getByText("Narrower term:")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Modernism" })).toHaveAttribute(
      "href",
      "/browse?q=Modernism&search_scope=starts_with"
    )
  })

  it("renders comma between multiple terms", () => {
    const subject = createPreferredSubject({
      seeAlso: {
        label: "See also",
        terms: [
          {
            termLabel: "Painting",
            url: "/browse?q=Painting&search_scope=starts_with",
            count: "",
          },
          {
            termLabel: "Sculpture",
            url: "/browse?q=Sculpture&search_scope=starts_with",
            count: "",
          },
        ],
      },
    })

    render(<PreferredSubjectTableCell subject={subject} />)

    expect(screen.getByText(/Painting/)).toBeInTheDocument()
    expect(screen.getByText(/Sculpture/)).toBeInTheDocument()
  })
})
