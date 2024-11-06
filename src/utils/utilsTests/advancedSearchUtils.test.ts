import { buildGoBackHref } from "../advancedSearchUtils"

describe("Advanced search utils", () => {
  describe("buildGoBackHref", () => {
    it("returns null with no referer", () => {
      expect(buildGoBackHref(undefined)).toBe(null)
    })
    it("returns null when referer is not an RC URL", () => {
      expect(buildGoBackHref("spaghetti.com")).toBe(null)
    })
    it("returns / when endpoint is home", () => {
      expect(buildGoBackHref("nypl.org/research/research-catalog")).toBe("/")
    })
    it("returns endpoint when there is one", () => {
      expect(
        buildGoBackHref(
          "http://local.nypl.org:8080/research/research-catalog/search?q=spaghetti&search_scope=title"
        )
      ).toBe("/search?q=spaghetti&search_scope=title")
    })
  })
})
