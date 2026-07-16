import {
  parseItemFilterQueryParams,
  buildItemFilterQuery,
  buildAppliedFiltersTagSetData,
} from "../itemFilterUtils"
import { normalAggs } from "../../../__test__/fixtures/testAggregations"
import { ItemFilterData } from "../../models/ItemFilterData"

describe("Item Filter Utils", () => {
  describe("parseItemFilterQueryParams", () => {
    it("parses locations including recap locations", () => {
      const query = {
        item_location: "rc,ma",
        item_status: "status:a,status:na",
      }
      expect(parseItemFilterQueryParams(query)).toEqual({
        location: ["rc", "ma"],
        status: ["status:a", "status:na"],
        year: [],
      })
    })
    it("parses locations including multiple recap locations", () => {
      const query = {
        item_location: "rc,rc,abc",
        item_status: "status:a,status:na",
      }
      expect(parseItemFilterQueryParams(query)).toEqual({
        location: ["abc", "Offsite"],
        status: ["status:a", "status:na"],
        year: [],
      })
    })
  })

  describe("buildAppliedFiltersTagSetData", () => {
    const query = parseItemFilterQueryParams({
      item_location: "rc,rc",
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
          label: "Item location > Offsite",
        },
        {
          id: "status:a",
          label: "Availability > Available",
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
          label: "Availability > Available",
        },
        {
          id: "status:na",
          label: "Availability > Not available",
        },
      ])
    })
  })
})
