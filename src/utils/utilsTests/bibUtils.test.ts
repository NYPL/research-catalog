import { standardizeBibId, isNyplBibID, getBibQueryString } from "../bibUtils"

describe("bibUtils", () => {
  describe("standardizeBibId", () => {
    it("doesn't mess with kosher id", () => {
      expect(standardizeBibId("b12345678")).toBe("b12345678")
      expect(standardizeBibId("hb123456789123456789")).toBe(
        "hb123456789123456789"
      )
    })
    it("removes check digit", () => {
      expect(standardizeBibId("b12345678x")).toBe("b12345678")
      expect(standardizeBibId("b12345678X")).toBe("b12345678")
      expect(standardizeBibId("b123456781")).toBe("b12345678")
    })
    it("lower cases everything", () => {
      expect(standardizeBibId("B12345678")).toBe("b12345678")
      expect(standardizeBibId("CB1234567")).toBe("cb1234567")
      expect(standardizeBibId("Hb123456789123456789")).toBe(
        "hb123456789123456789"
      )
      expect(standardizeBibId("PB1234567")).toBe("pb1234567")
      expect(standardizeBibId("PB1234567812345678")).toBe("pb1234567812345678")
    })
    it("returns value provided if input does not match bib id regexes", () => {
      expect(standardizeBibId("b1234567899")).toBe("b1234567899")
      expect(standardizeBibId("i am not a bib id hb123")).toBe(
        "i am not a bib id hb123"
      )
    })
  })
  describe("isNyplBibID", () => {
    it("determines if a given bib ID is an NYPL bib id", () => {
      expect(isNyplBibID("b12082323")).toBe(true)
      expect(isNyplBibID("pb123456")).toBe(false)
      expect(isNyplBibID("hb10000202040400")).toBe(false)
    })
  })
  describe("getBibQueryString", () => {
    it("returns the correct query string with a bib ID and no bib params", () => {
      expect(getBibQueryString({ id: "b12082323" })).toBe(
        "?items_size=20&items_from=0&item_page=1&id=b12082323&merge_checkin_card_items=true"
      )
    })
    it("returns the correct query string with a bib ID and query params", () => {
      expect(getBibQueryString({ id: "b12082323", item_page: 5 })).toBe(
        "?items_size=20&items_from=80&item_page=5&id=b12082323&merge_checkin_card_items=true"
      )
    })
  })
})
