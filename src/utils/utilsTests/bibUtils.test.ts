import { standardizeBibId, isNyplBibID, getBibQuery } from "../bibUtils"

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
  describe("getBibQuery", () => {
    it("returns the correct query string with a bib ID and no bib params", () => {
      expect(getBibQuery("b12082323")).toBe(
        "b12082323?merge_checkin_card_items=true"
      )
    })
    it("returns the correct query string with a bib ID and various combinations of bib params", () => {
      expect(getBibQuery("b12082323", { itemsFrom: 5 })).toBe(
        "b12082323?items_size=20&items_from=5&merge_checkin_card_items=true"
      )
      expect(
        getBibQuery("b12082323", { itemFilterQuery: "test_query=true" })
      ).toBe("b12082323?test_query=true&merge_checkin_card_items=true")
      expect(
        getBibQuery("b12082323", {
          itemsFrom: 5,
          itemFilterQuery: "test_query=true",
        })
      ).toBe(
        "b12082323?items_size=20&items_from=5&test_query=true&merge_checkin_card_items=true"
      )
    })
    it("returns the correct query string with various combinations of bib params and annotated marc setting enabled", () => {
      expect(getBibQuery("b12082323", { itemsFrom: 5 }, true)).toBe(
        "b12082323.annotated-marc?items_size=20&items_from=5"
      )
      expect(
        getBibQuery("b12082323", { itemFilterQuery: "test_query=true" }, true)
      ).toBe("b12082323.annotated-marc")
      expect(
        getBibQuery(
          "b12082323",
          {
            itemsFrom: 5,
            itemFilterQuery: "test_query=true",
          },
          true
        )
      ).toBe("b12082323.annotated-marc?items_size=20&items_from=5")
    })
  })
})
