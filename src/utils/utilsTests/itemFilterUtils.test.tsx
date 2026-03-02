import {
  isRecapLocation,
  combineRecapLocations,
  parseItemFilterQueryParams,
  buildItemFilterQuery,
  buildAppliedFiltersTagSetData,
} from "../itemFilterUtils"
import { normalAggs } from "../../../__test__/fixtures/testAggregations"
import { ItemFilterData } from "../../models/ItemFilterData"

describe("Item Filter Utils", () => {
  describe("isRecapLocation", () => {
    it("returns true for a recap location", () => {
      expect(isRecapLocation("loc:rc2ma")).toBe(true)
    })
    it("returns false for a non-recap location", () => {
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
    it("can handle no locations", () => {
      const locations = []
      expect(combineRecapLocations(locations)).toEqual([])
    })
  })
  describe("parseItemFilterQueryParams", () => {
    it("parses locations including recap locations", () => {
      const query = {
        item_location: "loc:rc2ma,loc:mal",
        item_status: "status:a,status:na",
      }
      expect(parseItemFilterQueryParams(query)).toEqual({
        location: ["loc:mal", "Offsite"],
        status: ["status:a", "status:na"],
        year: [],
      })
    })
    it("parses locations including multiple recap locations", () => {
      const query = {
        item_location: "loc:rc2ma,loc:rc3ma,loc:rc4ma,loc:abc",
        item_status: "status:a,status:na",
      }
      expect(parseItemFilterQueryParams(query)).toEqual({
        location: ["loc:abc", "Offsite"],
        status: ["status:a", "status:na"],
        year: [],
      })
    })
  })
  describe("buildItemFilterQuery", () => {
    it("maps offsite back to the recap locations", () => {
      const query = {
        location: ["loc:abc", "Offsite"],
        status: ["status:a", "status:na"],
        year: [],
      }
      const recapLocations = "loc:rc2ma,loc:rc3ma,loc:rc4ma"
      expect(buildItemFilterQuery(query, recapLocations)).toStrictEqual({
        item_location: "loc:abc,loc:rc2ma,loc:rc3ma,loc:rc4ma",
        item_status: "status:a,status:na",
      })
    })
    it("can handle only one param", () => {
      const query = {
        location: ["loc:abc", "Offsite"],
        status: [],
        year: [],
      }
      const recapLocations = "loc:rc2ma,loc:rc3ma,loc:rc4ma"
      expect(buildItemFilterQuery(query, recapLocations)).toStrictEqual({
        item_location: "loc:abc,loc:rc2ma,loc:rc3ma,loc:rc4ma",
      })
    })
  })

  describe("buildAppliedFiltersTagSetData", () => {
    const query = parseItemFilterQueryParams({
      item_location: "loc:rc2ma,loc:rcma2",
      item_status: "status:a",
      item_date: "2005",
    })
    const emptyQuery = parseItemFilterQueryParams({})
    const aggregations = normalAggs.map(
      (aggregation) => new ItemFilterData(aggregation)
    )
    it("no filters", () => {
      expect(
        buildAppliedFiltersTagSetData(emptyQuery, aggregations)
      ).toStrictEqual([])
    })
    it("with all filters", () => {
      expect(buildAppliedFiltersTagSetData(query, aggregations)).toStrictEqual([
        {
          id: "Offsite",
          label: "Location > Offsite",
        },
        {
          id: "status:a",
          label: "Status > Available",
        },
        { id: "2005", label: "Year > 2005" },
      ])
    })
    it("one filter", () => {
      expect(
        buildAppliedFiltersTagSetData(
          parseItemFilterQueryParams({ item_status: "status:a,status:na" }),
          aggregations
        )
      ).toStrictEqual([
        {
          id: "status:a",
          label: "Status > Available",
        },
        {
          id: "status:na",
          label: "Status > Not available",
        },
      ])
    })
  })
})
