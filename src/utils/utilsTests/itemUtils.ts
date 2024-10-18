import { locationLabelToKey } from "../itemUtils"

describe("itemUtils", () => {
  describe("locationLabelToKey", () => {
    it("returns a location key for a given label", () => {
      expect(locationLabelToKey("Schwarzman")).toBe("schwarzman")
      expect(locationLabelToKey("Performing")).toBe("lpa")
      expect(locationLabelToKey("Schomburg")).toBe("schomburg")
    })
  })
})
