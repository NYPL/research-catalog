import { standardizeBibId, isValidBibId } from "../bibServerUtils"

const mockSplitId = jest.fn()

jest.mock("@nypl/node-utils", () => {
  return {
    NyplSourceMapper: {
      instance: async () => ({
        splitIdentifier: mockSplitId,
      }),
    },
  }
})

describe("bibServerUtils", () => {
  describe("isValidBibId", () => {
    it("returns true when identifier splits properly", async () => {
      mockSplitId.mockReturnValueOnce({
        type: true,
        id: true,
        nyplSource: true,
      })
      const result = await isValidBibId("b1234")
      expect(result).toBe(true)
    })
    it("returns false when identifier does not split", async () => {
      mockSplitId.mockReturnValueOnce({
        type: null,
        id: true,
        nyplSource: null,
      })
      const result = await isValidBibId("b1234")
      expect(result).toBe(false)
    })
    it("returns false when error is thrown", async () => {
      mockSplitId.mockImplementationOnce(() => new Error("spaghetti"))
      const result = await isValidBibId("b1234")
      expect(result).toBe(false)
    })
  })
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
})
