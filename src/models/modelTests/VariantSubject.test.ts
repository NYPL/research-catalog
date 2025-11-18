import VariantSubject from "../VariantSubject"
import type {
  DiscoveryVariantSubjectResult,
  SubjectLink,
} from "../../types/browseTypes"

describe("VariantSubject model", () => {
  const mockResult: DiscoveryVariantSubjectResult = {
    "@type": "variant",
    termLabel: "CS",
    preferredTerms: [
      { termLabel: "Computer Science", count: 120 },
      { termLabel: "Computing", count: 45 },
    ],
  }

  it("should create a VariantSubject with correct properties", () => {
    const variant = new VariantSubject(mockResult)

    expect(variant.termLabel).toBe("CS")

    const expectedPreferredTerms: SubjectLink[] = [
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
    const emptyResult: DiscoveryVariantSubjectResult = {
      "@type": "variant",
      termLabel: "Math",
      preferredTerms: [],
    }

    const variant = new VariantSubject(emptyResult)

    expect(variant.termLabel).toBe("Math")
    expect(variant.preferredTerms).toEqual([])
  })
})
