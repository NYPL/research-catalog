import { locationLabelToKey } from "../itemUtils"

describe("itemUtils", () => {
  describe("locationLabelToKey", () => {
    it("returns a location key for a given label", () => {
      expect(locationLabelToKey("Schwarzman")).toBe("schwarzman")
      expect(locationLabelToKey("Performing")).toBe("lpa")
      expect(locationLabelToKey("Schomburg")).toBe("schomburg")
    })
  })
  describe("formatShelfMarkForSort", () => {
    it("correctly formats Item shelfMark strings", () => {
      expect(locationLabelToKey("*T-Mss 1991-010   Box 27")).toBe(
        "*T-Mss 1991-010 box 000027"
      )
      expect(locationLabelToKey("*T-Mss 1991-010   Tube 70")).toBe(
        "*T-Mss 1991-010 tube 000070"
      )
      expect(locationLabelToKey("Map Div. 98­914    Box 25, Wi­Z')")).toBe(
        "Map Div. 98­914 box 000025, Wi­Z')"
      )
    })
  })
})
