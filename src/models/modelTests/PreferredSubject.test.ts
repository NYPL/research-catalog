import PreferredSubject from "../PreferredSubject"
import type { DiscoverySubjectPreferredResult } from "../../types/browseTypes"

describe("PreferredSubject model", () => {
  const mockResult: DiscoverySubjectPreferredResult = {
    uri: "123456",
    preferredTerm: "Science -- 19th century",
    count: 42,
    seeAlso: ["Biology", "Physics"],
    narrowerTerms: ["Natural Science -- Chimpanzees"],
    broaderTerms: ["Knowledge"],
  }

  it("should create a PreferredSubject instance with expected properties", () => {
    const subject = new PreferredSubject(mockResult)

    expect(subject.termLabel).toBe("Science -- 19th century")
    expect(subject.countDisplay).toBe("42")
    expect(subject.url).toBe("/browse/subjects/Science%20--%2019th%20century")

    expect(subject.seeAlso.terms).toEqual([
      { term: "Biology", url: "/browse/subjects/Biology" },
      { term: "Physics", url: "/browse/subjects/Physics" },
    ])

    expect(subject.narrowerTerms.terms).toEqual([
      {
        term: "Natural Science -- Chimpanzees",
        url: "/browse/subjects/Natural%20Science%20--%20Chimpanzees",
      },
    ])

    expect(subject.broaderTerms.terms).toEqual([
      { term: "Knowledge", url: "/browse/subjects/Knowledge" },
    ])
  })

  it("should handle empty seeAlso/narrower/broader results", () => {
    const emptyResult: DiscoverySubjectPreferredResult = {
      uri: "67890",
      preferredTerm: "History",
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
