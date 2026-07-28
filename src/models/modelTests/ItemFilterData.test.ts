import { ItemFilterData, LocationFilterData } from "../ItemFilterData"
import { bibWithItems } from "../../../__test__/fixtures/bibFixtures"

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
          label: "Stephen A. Schwarzman Building",
          value: "ma",
        },
        {
          count: 2,
          label: "Offsite",
          value: "rc",
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
            id: "ma",
            name: "Stephen A. Schwarzman Building",
          },
          {
            id: "rc",
            name: "Offsite",
          },
        ],
        name: "Item location",
      })
    })
  })
})
