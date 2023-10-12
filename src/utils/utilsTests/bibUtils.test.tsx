import { standardizeBibId } from "../../utils/bibUtils"

describe("bibUtils", () => {
  describe("standardizeBibId", () => {
    describe("standardizeBib", () => {
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
        expect(standardizeBibId("PB1234567812345678")).toBe(
          "pb1234567812345678"
        )
      })
      it("returns value provided if input does not match bib id regexes", () => {
        expect(standardizeBibId("b1234567899")).toBe("b1234567899")
        expect(standardizeBibId("i am not a bib id hb123")).toBe(
          "i am not a bib id hb123"
        )
      })
    })
  })
})
