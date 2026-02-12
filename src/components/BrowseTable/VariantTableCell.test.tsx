import React from "react"
import type { TermLink, Variant } from "../../types/browseTypes"
import { render, screen } from "../../utils/testUtils"
import VariantTableCell from "./VariantTableCell"

const createContributorTermLink = (
  overrides: Partial<TermLink> = {}
): TermLink => ({
  termLabel: "John Smith",
  url: "/browse/authors?q=John Smith&search_scope=starts_with",
  count: "42",
  ...overrides,
})

const createVariantContributor = (
  overrides: Partial<Variant> = {}
): Variant => ({
  termLabel: "John Smithe",
  preferredTerms: [],
  ...overrides,
})

const createSubjectTermLink = (
  overrides: Partial<TermLink> = {}
): TermLink => ({
  termLabel: "Dogs",
  url: "/browse?q=Dogs&search_scope=starts_with",
  count: "42",
  ...overrides,
})

const createVariantSubject = (overrides: Partial<Variant> = {}): Variant => ({
  termLabel: "Doggies",
  preferredTerms: [],
  ...overrides,
})

describe("VariantTableCell: contributor", () => {
  it("renders the variant contributor term as plain text", () => {
    const contributor = createVariantContributor()

    render(<VariantTableCell record={contributor} />)

    expect(screen.getByText("John Smithe")).toBeInTheDocument()
  })

  it("renders preferred contributor term links with label", () => {
    const contributor = createVariantContributor({
      preferredTerms: [createContributorTermLink()],
    })

    render(<VariantTableCell record={contributor} />)

    expect(screen.getByText(/See:/)).toBeInTheDocument()

    const link = screen.getByRole("link", { name: "John Smith" })
    expect(link).toHaveAttribute(
      "href",
      "/browse/authors?q=John Smith&search_scope=starts_with"
    )
  })
})

describe("VariantTableCell: subject", () => {
  it("renders the variant subject term as plain text", () => {
    const subject = createVariantSubject()

    render(<VariantTableCell record={subject} />)

    expect(screen.getByText("Doggies")).toBeInTheDocument()
  })

  it("renders a single preferred term link with label", () => {
    const subject = createVariantSubject({
      preferredTerms: [
        createSubjectTermLink({
          termLabel: "Beagle",
          url: "/browse?q=Beagle&search_scope=starts_with",
        }),
      ],
    })

    render(<VariantTableCell record={subject} />)

    expect(screen.getByText(/See:/)).toBeInTheDocument()

    const link = screen.getByRole("link", { name: "Beagle" })
    expect(link).toHaveAttribute(
      "href",
      "/browse?q=Beagle&search_scope=starts_with"
    )
  })

  it("renders multiple preferred term links", () => {
    const terms = [
      createSubjectTermLink({
        termLabel: "Beagle",
        url: "/browse?q=Beagle&search_scope=starts_with",
      }),
      createSubjectTermLink({
        termLabel: "Poodle",
        url: "/browse?q=Poodle&search_scope=starts_with",
      }),
    ]

    const subject = createVariantSubject({ preferredTerms: terms })

    render(<VariantTableCell record={subject} />)

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
      createSubjectTermLink({
        termLabel: breed,
        url: `/browse?q=${breed}&search_scope=starts_with`,
        count: (i + 1).toString(),
      })
    )

    const subject = createVariantSubject({ preferredTerms: terms })

    render(<VariantTableCell record={subject} />)

    // Only first 5 should render
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
