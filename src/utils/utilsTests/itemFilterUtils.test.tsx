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
  describe("parseItemFilterQueryParams", () => {
    it("parses locations including recap locations", () => {
      const query = {
        item_location: "loc:rc2ma,loc:mal",
        item_format: "Text",
        item_status: "status:a,status:na",
      }
      expect(parseItemFilterQueryParams(query)).toEqual({
        format: ["Text"],
        location: ["loc:mal", "Offsite"],
        status: ["status:a", "status:na"],
      })
    })
    it("parses locations including multiple recap locations", () => {
      const query = {
        item_location: "loc:rc2ma,loc:rc3ma,loc:rc4ma,loc:abc",
        item_format: "Text",
        item_status: "status:a,status:na",
      }
      expect(parseItemFilterQueryParams(query)).toEqual({
        format: ["Text"],
        location: ["loc:abc", "Offsite"],
        status: ["status:a", "status:na"],
      })
    })
  })
  describe("buildItemFilterQuery", () => {
    it("maps offsite back to the recap locations", () => {
      const query = {
        format: ["Text"],
        location: ["loc:abc", "Offsite"],
        status: ["status:a", "status:na"],
      }
      const recapLocations = "loc:rc2ma,loc:rc3ma,loc:rc4ma"
      expect(buildItemFilterQueryParams(query, recapLocations)).toBe(
        "?item_location=loc:abc,loc:rc2ma,loc:rc3ma,loc:rc4ma&item_format=Text&item_status=status:a,status:na"
      )
    })
    it("can handle only one param", () => {
      const query = {
        format: [],
        location: ["loc:abc", "Offsite"],
        status: [],
      }
      const recapLocations = "loc:rc2ma,loc:rc3ma,loc:rc4ma"
      expect(buildItemFilterQueryParams(query, recapLocations)).toBe(
        "?item_location=loc:abc,loc:rc2ma,loc:rc3ma,loc:rc4ma"
      )
    })
  })
})
