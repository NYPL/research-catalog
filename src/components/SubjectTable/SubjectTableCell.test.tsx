import { render, screen } from "../../utils/testUtils"
import type {
  PreferredSubject,
  SubjectLink,
  VariantSubject,
} from "../../types/browseTypes"
import PreferredSubjectTableCell from "./PreferredSubjectTableCell"
import VariantSubjectTableCell from "./VariantSubjectTableCell"

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

const createSubjectLink = (
  overrides: Partial<SubjectLink> = {}
): SubjectLink => ({
  termLabel: "Beagle",
  url: "/browse?q=Beagle&search_scope=starts_with",
  count: "42",
  ...overrides,
})

const createVariantSubject = (
  overrides: Partial<VariantSubject> = {}
): VariantSubject => ({
  termLabel: "Dogs",
  preferredTerms: [],
  ...overrides,
})

describe("VariantSubjectTableCell", () => {
  it("renders the variant term as plain text", () => {
    const subject = createVariantSubject()
    render(<VariantSubjectTableCell subject={subject} />)

    expect(screen.getByText("Dogs")).toBeInTheDocument()
  })

  it("renders a single preferred term link with label", () => {
    const subject = createVariantSubject({
      preferredTerms: [createSubjectLink()],
    })

    render(<VariantSubjectTableCell subject={subject} />)

    const link = screen.getByRole("link", { name: "Beagle" })
    expect(link).toHaveAttribute(
      "href",
      "/browse?q=Beagle&search_scope=starts_with"
    )
    expect(screen.getByText(/See:/)).toBeInTheDocument()
  })

  it("renders multiple preferred term links", () => {
    const terms = [
      createSubjectLink({
        termLabel: "Beagle",
        url: "/browse/subject/beagle",
        count: "42",
      }),
      createSubjectLink({
        termLabel: "Poodle",
        url: "/browse/subject/poodle",
        count: "33",
      }),
    ]

    const subject = createVariantSubject({ preferredTerms: terms })

    render(<VariantSubjectTableCell subject={subject} />)

    expect(screen.getAllByText(/See:/)[0]).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Beagle" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Poodle" })).toBeInTheDocument()
  })

  it("limits preferred terms to a maximum of 5", () => {
    const dogTerms = [
      "Beagle",
      "Poodle",
      "Bulldog",
      "Labrador",
      "Chihuahua",
      "Boxer",
      "Dachshund",
    ]
    const terms = dogTerms.map((breed, i) =>
      createSubjectLink({
        termLabel: breed,
        url: `/subject/${breed.toLowerCase()}`,
        count: (i + 10).toString(),
      })
    )

    const subject = createVariantSubject({ preferredTerms: terms })

    render(<VariantSubjectTableCell subject={subject} />)

    // Only first 5 terms should appear
    dogTerms.slice(0, 5).forEach((breed) => {
      expect(screen.getByRole("link", { name: breed })).toBeInTheDocument()
    })

    dogTerms.slice(5).forEach((breed) => {
      expect(
        screen.queryByRole("link", { name: breed })
      ).not.toBeInTheDocument()
    })
  })
})
