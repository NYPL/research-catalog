import {
  isRecapLocation,
  combineRecapLocations,
  parseItemFilterQueryParams,
  buildItemFilterQueryParams,
} from "../itemFilterUtils"

describe("Item Filter Utils", () => {
  describe("isRecapLocation", () => {
    it("returns true for a recap location", () => {
      expect(isRecapLocation("loc:rc2ma")).toBe(true)
    })
    it("returns false for a recap location", () => {
      expect(isRecapLocation("loc:xc")).toBe(false)
    })
  })
  describe("combineRecapLocations", () => {
    it("replaces all offsite location codes with single Offsite string", () => {
      const locations = ["loc:mab", "loc:rc2ma", "loc:rcma2", "loc:rcrc"]
      expect(combineRecapLocations(locations)).toEqual(["loc:mab", "Offsite"])
    })
  })
})
