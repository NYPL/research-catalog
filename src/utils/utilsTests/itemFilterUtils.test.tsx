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
    it("does nothing if there are no recap locations", () => {
      const locations = ["loc:mab", "loc:mac", "loc:spaghetti"]
      expect(combineRecapLocations(locations)).toEqual([
        "loc:mab",
        "loc:mac",
        "loc:spaghetti",
      ])
    })
    it("replaces offsite locations with no other locations", () => {
      const locations = ["loc:rc2ma", "loc:rcma2", "loc:rcrc"]
      expect(combineRecapLocations(locations)).toEqual(["Offsite"])
    })
    it("can handle an empty array", () => {
      const locations = []
      expect(combineRecapLocations(locations)).toEqual([])
    })
  })
})
