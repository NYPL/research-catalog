import { ItemFilterData } from "../ItemFilterData"
import { bibWithItems } from "../../../__test__/fixtures/bibFixtures"

describe("Item model", () => {
  let itemFilterData: ItemFilterData

  beforeEach(() => {
    itemFilterData = new ItemFilterData(
      bibWithItems.resource.itemAggregations[0]
    )
  })

  describe("constructor", () => {
    it("initializes the options attribute as the aggregation's options", () => {
      expect(itemFilterData.options).toStrictEqual([
        { count: 2, label: "SASB S3 - Periodicals Rm 108", value: "loc:mak32" },
        { count: 2, label: "Offsite", value: "loc:rc2ma" },
      ])
    })

    it("initializes the field attribute to the aggregation's field", () => {
      expect(itemFilterData.field).toBe("location")
    })
  })

  describe("formattedFilterData", () => {
    it("returns formatted filters data in the structure expected by the MultiSelect component", () => {
      expect(itemFilterData.formattedFilterData).toStrictEqual({
        id: "location",
        items: [
          { id: "loc:mak32", name: "SASB S3 - Periodicals Rm 108" },
          { id: "loc:rc2ma", name: "Offsite" },
        ],
        name: "Location",
      })
    })
  })
})
