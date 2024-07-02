import {
  locationLabelToKey,
  buildItemTableDisplayingString,
  parseLocations,
} from "../itemUtils"

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
  describe("buildItemTableDisplayingString", () => {
    it("returns the correct item table heading when there is one item", () => {
      expect(buildItemTableDisplayingString(1, 1)).toBe("Displaying 1 item")
    })
    it("returns the correct item table heading when the total number is greater than 1 but less than the pagination limit", () => {
      expect(buildItemTableDisplayingString(1, 2)).toBe(
        "Displaying all 2 items"
      )
    })
    it("returns the correct item table heading for first page when there are many items", () => {
      expect(buildItemTableDisplayingString(1, 300)).toBe(
        "Displaying 1-20 of 300 items"
      )
    })
    it("returns the correct item table heading for pages greater than 1 when there are many items", () => {
      expect(buildItemTableDisplayingString(5, 300)).toBe(
        "Displaying 81-100 of 300 items"
      )
    })
    it("returns the correct item table heading for when view all items is enabled", () => {
      expect(buildItemTableDisplayingString(1, 300, true)).toBe(
        "Displaying all 300 items"
      )
    })
  })
})
