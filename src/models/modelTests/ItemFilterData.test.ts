import { ItemFilterData, LocationFilterData } from "../ItemFilterData"
import {
  bibWithItems,
  parallelsBib as bibWithMultipleOffsiteLocations,
} from "../../../__test__/fixtures/bibFixtures"

describe("ItemFilterData model", () => {
  let itemFilterData: ItemFilterData

  beforeEach(() => {
    itemFilterData = new ItemFilterData(
      bibWithItems.resource.itemAggregations[1]
    )
  })

  describe("constructor", () => {
    it("initializes the options attribute as the aggregation's options", () => {
      expect(itemFilterData.options).toStrictEqual([
        { count: 4, label: "Text", value: "Text" },
      ])
    })

    it("initializes the field attribute to the aggregation's field", () => {
      expect(itemFilterData.field).toBe("format")
    })
  })

  describe("formattedFilterData", () => {
    it("returns formatted filters data in the structure expected by the MultiSelect component", () => {
      expect(itemFilterData.formattedFilterData).toStrictEqual({
        id: "format",
        items: [{ id: "Text", name: "Text" }],
        name: "Format",
      })
    })
  })
})

describe("LocationFilterData model", () => {
  let itemFilterData: LocationFilterData

  beforeEach(() => {
    itemFilterData = new LocationFilterData(
      bibWithItems.resource.itemAggregations[0]
    )
  })

  describe("constructor", () => {
    it("initializes the options correctly per the parent class's constructor", () => {
      expect(itemFilterData.options).toStrictEqual([
        {
          count: 2,
          label: "SASB S3 - Periodicals Rm 108",
          value: "loc:mak32",
        },
        {
          count: 2,
          label: "Offsite",
          value: "loc:rc2ma",
        },
      ])
    })

    it("initializes the field attribute per the parent class's constructor", () => {
      expect(itemFilterData.field).toBe("location")
    })
  })

  describe("formattedFilterData", () => {
    it("returns formatted filters data using the class's overridden display logic", () => {
      expect(itemFilterData.formattedFilterData).toStrictEqual({
        id: "location",
        items: [
          {
            id: "loc:mak32",
            name: "SASB S3 - Periodicals Rm 108",
          },
          {
            id: "Offsite",
            name: "Offsite",
          },
        ],
        name: "Location",
      })
    })
    it("formats multiple offsite locations as single checkbox value", () => {
      const itemFilterDataMultipleOffsite = new LocationFilterData(
        bibWithMultipleOffsiteLocations.resource.itemAggregations[0]
      )
      expect(itemFilterDataMultipleOffsite.formattedFilterData).toStrictEqual({
        id: "location",
        items: [
          {
            id: "Offsite",
            name: "Offsite",
          },
        ],
        name: "Location",
      })
    })
  })

  describe("recapLocations", () => {
    it("returns recap locations", () => {
      expect(itemFilterData.recapLocations).toBe("loc:rc2ma")
    })
  })
})
