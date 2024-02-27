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
})
