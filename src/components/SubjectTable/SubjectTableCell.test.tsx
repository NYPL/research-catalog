import { render, screen } from "../../utils/testUtils"
import type {
  PreferredSubject,
  PreferredTerm,
  VariantSubject,
} from "../../types/browseTypes"
import PreferredSubjectTableCell from "./PreferredSubjectTableCell"
import VariantSubjectTableCell from "./VariantSubjectTableCell"

const createPreferredSubject = (
  overrides: Partial<PreferredSubject> = {}
): PreferredSubject => ({
  preferredTerm: "Art -- Artists",
  url: "/browse/subject/art%20--%20artists",
  count: "123",
  seeAlso: [],
  broaderTerms: [],
  narrowerTerms: [],
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
      "/research/research-catalog/browse/subject/art%20--%20artists"
    )
  })

  it("renders 'See also' section if seeAlso terms exist", () => {
    const subject = createPreferredSubject({
      seeAlso: [
        { term: "Painting", url: "/browse/subject/painting" },
        { term: "Sculpture", url: "/browse/subject/sculpture" },
      ],
    })

    render(<PreferredSubjectTableCell subject={subject} />)

    expect(screen.getByText("See also:")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Painting" })).toHaveAttribute(
      "href",
      "/research/research-catalog/browse/subject/painting"
    )
    expect(screen.getByRole("link", { name: "Sculpture" })).toHaveAttribute(
      "href",
      "/research/research-catalog/browse/subject/sculpture"
    )
  })

  it("renders 'Broader term' section if broaderTerms exist", () => {
    const subject = createPreferredSubject({
      broaderTerms: [
        { term: "Visual Arts", url: "/browse/subject/visual-arts" },
      ],
    })

    render(<PreferredSubjectTableCell subject={subject} />)

    expect(screen.getByText("Broader term:")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Visual Arts" })).toHaveAttribute(
      "href",
      "/research/research-catalog/browse/subject/visual-arts"
    )
  })

  it("renders 'Narrower term' section if narrowerTerms exist", () => {
    const subject = createPreferredSubject({
      narrowerTerms: [{ term: "Modernism", url: "/browse/subject/modernism" }],
    })

    render(<PreferredSubjectTableCell subject={subject} />)

    expect(screen.getByText("Narrower term:")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Modernism" })).toHaveAttribute(
      "href",
      "/research/research-catalog/browse/subject/modernism"
    )
  })

  it("renders comma between multiple terms", () => {
    const subject = createPreferredSubject({
      seeAlso: [
        { term: "Painting", url: "/browse/subject/painting" },
        { term: "Sculpture", url: "/browse/subject/sculpture" },
      ],
    })

    render(<PreferredSubjectTableCell subject={subject} />)

    expect(screen.getByText(/Painting/)).toBeInTheDocument()
    expect(screen.getByText(/Sculpture/)).toBeInTheDocument()
  })
})

const createPreferredTerm = (
  overrides: Partial<PreferredTerm> = {}
): PreferredTerm => ({
  preferredTerm: "Beagle",
  url: "/browse/subject/beagle",
  count: "42",
  ...overrides,
})

const createVariantSubject = (
  overrides: Partial<VariantSubject> = {}
): VariantSubject => ({
  variantTerm: "Dogs",
  preferredTerms: [],
  ...overrides,
})

describe("VariantSubjectTableCell", () => {
  it("renders the variant term as plain text", () => {
    const subject = createVariantSubject()
    render(<VariantSubjectTableCell subject={subject} />)

    expect(screen.getByText("Dogs")).toBeInTheDocument()
  })

  it("renders a single preferred term link with label and count", () => {
    const subject = createVariantSubject({
      preferredTerms: [createPreferredTerm()],
    })

    render(<VariantSubjectTableCell subject={subject} />)

    const link = screen.getByRole("link", { name: "Beagle" })
    expect(link).toHaveAttribute(
      "href",
      "/research/research-catalog/browse/subject/beagle"
    )
    expect(screen.getByText(/See:/)).toBeInTheDocument()
    expect(screen.getByText(/(42)/)).toBeInTheDocument()
  })

  it("renders multiple preferred term links", () => {
    const terms = [
      createPreferredTerm({
        preferredTerm: "Beagle",
        url: "/browse/subject/beagle",
        count: "42",
      }),
      createPreferredTerm({
        preferredTerm: "Poodle",
        url: "/browse/subject/poodle",
        count: "33",
      }),
    ]

    const subject = createVariantSubject({ preferredTerms: terms })

    render(<VariantSubjectTableCell subject={subject} />)

    expect(screen.getAllByText(/See:/)[0]).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Beagle" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Poodle" })).toBeInTheDocument()
    expect(screen.getByText(/(33)/)).toBeInTheDocument()
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
      createPreferredTerm({
        preferredTerm: breed,
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
