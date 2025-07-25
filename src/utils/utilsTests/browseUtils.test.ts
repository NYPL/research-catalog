import { getSubjectURL } from "../browseUtils"

describe("browseUtils", () => {
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
})
