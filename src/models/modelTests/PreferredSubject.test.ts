import PreferredSubject from "../PreferredSubject"
import type { DiscoveryPreferredSubjectResult } from "../../types/browseTypes"

describe("PreferredSubject model", () => {
  const mockResult: DiscoveryPreferredSubjectResult = {
    "@type": "preferredTerm",
    uri: "123456",
    termLabel: "Science -- 19th century",
    count: 42,
    seeAlso: [{ termLabel: "Biology" }, { termLabel: "Physics" }],
    narrowerTerms: [{ termLabel: "Natural Science -- Chimpanzees" }],
    broaderTerms: [{ termLabel: "Knowledge" }],
  }

  it("should create a PreferredSubject instance with expected properties", () => {
    const subject = new PreferredSubject(mockResult)

    expect(subject.termLabel).toBe("Science -- 19th century")
    expect(subject.count).toBe("42")
    expect(subject.url).toBe("/browse/subjects/Science%20--%2019th%20century")

    expect(subject.seeAlso.terms).toEqual([
      { termLabel: "Biology", url: "/browse/subjects/Biology", count: "" },
      { termLabel: "Physics", url: "/browse/subjects/Physics", count: "" },
    ])

    expect(subject.narrowerTerms.terms).toEqual([
      {
        termLabel: "Natural Science -- Chimpanzees",
        url: "/browse/subjects/Natural%20Science%20--%20Chimpanzees",
        count: "",
      },
    ])

    expect(subject.broaderTerms.terms).toEqual([
      {
        termLabel: "Knowledge",
        url: "/browse/subjects/Knowledge",
        count: "",
      },
    ])
  })

  it("should handle empty seeAlso/narrower/broader results", () => {
    const emptyResult: DiscoveryPreferredSubjectResult = {
      "@type": "preferredTerm",
      uri: "67890",
      termLabel: "History",
      count: 0,
      seeAlso: [],
      narrowerTerms: [],
      broaderTerms: [],
    }

    const subject = new PreferredSubject(emptyResult)

    expect(subject.seeAlso).toBeFalsy()
    expect(subject.narrowerTerms).toBeFalsy()
    expect(subject.broaderTerms).toBeFalsy()
  })
})
