import PreferredSubject, { getSubjectURL } from "../PreferredSubject"
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

    expect(subject.preferredTerm).toBe("Science -- 19th century")
    expect(subject.count).toBe("42")
    expect(subject.url).toBe("/browse/subjects/Science%20--%2019th%20century")

    expect(subject.seeAlso).toEqual([
      { term: "Biology", url: "/browse/subjects/Biology" },
      { term: "Physics", url: "/browse/subjects/Physics" },
    ])

    expect(subject.narrowerTerms).toEqual([
      {
        term: "Natural Science -- Chimpanzees",
        url: "/browse/subjects/Natural%20Science%20--%20Chimpanzees",
      },
    ])

    expect(subject.broaderTerms).toEqual([
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

describe("getSubjectURL()", () => {
  it("should encode the subject term into a valid URL", () => {
    expect(getSubjectURL("Science")).toBe("/browse/subjects/Science")
    expect(getSubjectURL("Social Science")).toBe(
      "/browse/subjects/Social%20Science"
    )
    expect(
      getSubjectURL("X, Malcolm, 1925-1965 -- Political and social views.")
    ).toBe(
      "/browse/subjects/X%2C%20Malcolm%2C%201925-1965%20--%20Political%20and%20social%20views."
    )
  })
})
