import { locationLabelToKey, parseLocations } from "../itemUtils"

describe("itemUtils", () => {
  describe("locationLabelToKey", () => {
    it("returns a location key for a given label", () => {
      expect(locationLabelToKey("Schwarzman")).toBe("schwarzman")
      expect(locationLabelToKey("Performing")).toBe("lpa")
      expect(locationLabelToKey("Schomburg")).toBe("schomburg")
    })
  })
  describe("parseLocations", () => {
    it("splits a semicolon separated list of locations into an array", () => {
      expect(parseLocations("schwarzman;lpa")).toBe(["schwarzman", "lpa"])
    })
    it("returns a single value array when no semicolon delineator is present", () => {
      expect(parseLocations("schomburg")).toBe(["schomburg"])
    })
    it("returns an empty array when locations is falsy", () => {
      expect(parseLocations("")).toBe([])
      expect(parseLocations(null)).toBe([])
      expect(parseLocations(undefined)).toBe([])
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
