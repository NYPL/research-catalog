import VariantSubject from "../VariantSubject"
import type {
  DiscoveryVariantSubjectResult,
  SubjectLink,
} from "../../types/browseTypes"
import { getSubjectURL } from "../../utils/browseUtils"

describe("VariantSubject model", () => {
  const mockResult: DiscoveryVariantSubjectResult = {
    termLabel: "CS",
    preferredTerms: [
      { label: "Computer Science", count: 120 },
      { label: "Computing", count: 45 },
    ],
  }

  it("should create a VariantSubject with correct properties", () => {
    const variant = new VariantSubject(mockResult)

    expect(variant.termLabel).toBe("CS")

    const expectedPreferredTerms: SubjectLink[] = [
      {
        termLabel: "Computer Science",
        url: getSubjectURL("Computer Science"),
        count: "120",
      },
      {
        termLabel: "Computing",
        url: getSubjectURL("Computing"),
        count: "45",
      },
    ]

    expect(variant.preferredTerms).toEqual(expectedPreferredTerms)
  })

  it("should handle an empty preferredTerms list", () => {
    const emptyResult: DiscoveryVariantSubjectResult = {
      termLabel: "Math",
      preferredTerms: [],
    }

    const variant = new VariantSubject(emptyResult)

    expect(variant.termLabel).toBe("Math")
    expect(variant.preferredTerms).toEqual([])
  })
})
