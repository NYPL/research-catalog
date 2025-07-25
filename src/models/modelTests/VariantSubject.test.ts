import VariantSubject from "../VariantSubject"
import type {
  DiscoveryPreferredTermResult,
  DiscoverySubjectVariantResult,
  PreferredTerm,
} from "../../types/browseTypes"
import { getSubjectURL } from "../../utils/browseUtils"

describe("VariantSubject model", () => {
  const mockResult: DiscoverySubjectVariantResult = {
    variantTerm: "CS",
    preferredTerms: [{ "Computer Science": 120 }, { Computing: 45 }],
  }

  it("should create a VariantSubject with correct properties", () => {
    const variant = new VariantSubject(mockResult)

    expect(variant.variantTerm).toBe("CS")

    const expectedPreferredTerms: PreferredTerm[] = [
      {
        term: "Computer Science",
        url: getSubjectURL("Computer Science"),
        count: "120",
      },
      {
        term: "Computing",
        url: getSubjectURL("Computing"),
        count: "45",
      },
    ]

    expect(variant.preferredTerms).toEqual(expectedPreferredTerms)
  })

  it("should handle an empty preferredTerms list", () => {
    const emptyResult: DiscoverySubjectVariantResult = {
      variantTerm: "Math",
      preferredTerms: [],
    }

    const variant = new VariantSubject(emptyResult)

    expect(variant.variantTerm).toBe("Math")
    expect(variant.preferredTerms).toEqual([])
  })
})

describe("buildPreferredTermList()", () => {
  it("should convert DiscoveryPreferredTermResult into PreferredTerm", () => {
    const terms: DiscoveryPreferredTermResult[] = [
      { "Gautama Buddha": 300 },
      { Buddhism: 400 },
    ]

    const variant = new VariantSubject({
      variantTerm: "Buddha",
      preferredTerms: terms,
    })

    expect(variant.preferredTerms).toEqual([
      {
        term: "Gautama Buddha",
        url: getSubjectURL("Gautama Buddha"),
        count: "300",
      },
      {
        term: "Buddhism",
        url: getSubjectURL("Buddhism"),
        count: "400",
      },
    ])
  })
})
