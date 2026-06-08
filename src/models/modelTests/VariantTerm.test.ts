import VariantTerm from "../browse/VariantTerm"
import type { DiscoveryVariantResult, TermLink } from "../../types/browseTypes"

describe("Variant subject model", () => {
  const mockSubjectResult: DiscoveryVariantResult = {
    "@type": "variant",
    termLabel: "CS",
    preferredTerms: [
      { termLabel: "Computer Science", count: 120 },
      { termLabel: "Computing", count: 45 },
    ],
  }

  it("should create a variant subject with correct properties", () => {
    const variant = new VariantTerm(mockSubjectResult, "subjects")

    expect(variant.termLabel).toBe("CS")

    const expectedPreferredTerms: TermLink[] = [
      {
        termLabel: "Computer Science",
        url: "/browse?q=Computer Science&search_scope=starts_with",
        count: "120",
      },
      {
        termLabel: "Computing",
        url: "/browse?q=Computing&search_scope=starts_with",
        count: "45",
      },
    ]

    expect(variant.preferredTerms).toEqual(expectedPreferredTerms)
  })

  it("should handle an empty preferredTerms list", () => {
    const emptyResult: DiscoveryVariantResult = {
      "@type": "variant",
      termLabel: "Math",
      preferredTerms: [],
    }

    const variant = new VariantTerm(emptyResult, "subjects")

    expect(variant.termLabel).toBe("Math")
    expect(variant.preferredTerms).toEqual([])
  })
})

describe("Variant contributor model", () => {
  const mockContributorResult: DiscoveryVariantResult = {
    "@type": "variant",
    termLabel: "Will Shakes",
    preferredTerms: [
      { termLabel: "William Shakespeare", count: 120 },
      { termLabel: "Francis Bacon", count: 45 },
    ],
  }

  it("should create a variant contributor term with correct properties", () => {
    const variant = new VariantTerm(mockContributorResult, "contributors")

    expect(variant.termLabel).toBe("Will Shakes")

    const expectedPreferredTerms: TermLink[] = [
      {
        termLabel: "William Shakespeare",
        url: "/browse/authors?q=William Shakespeare&search_scope=starts_with",
        count: "120",
      },
      {
        termLabel: "Francis Bacon",
        url: "/browse/authors?q=Francis Bacon&search_scope=starts_with",
        count: "45",
      },
    ]

    expect(variant.preferredTerms).toEqual(expectedPreferredTerms)
  })
})
