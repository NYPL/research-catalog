import Item from "../Item"
import SearchResultsBib from "../SearchResultsBib"
import { itemWithPhysicalResources } from "../../../__test__/fixtures/itemWithPhysicalResources"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"

describe("Item model", () => {
  let parentBib: SearchResultsBib
  let item: Item

  beforeEach(() => {
    parentBib = new SearchResultsBib(searchResultPhysicalItems)
    item = new Item(itemWithPhysicalResources, parentBib)
  })

  describe("constructor", () => {
    it("initializes the Item ID with the prefix removed if present", () => {
      expect(item.id).toBe("i10572545")
    })

    it("initializes the parent bib's ID as an attribute", () => {
      expect(item.bibId).toBe("b12810991")
    })

    it("initializes the Item's status", () => {
      expect(item.status).toStrictEqual({
        "@id": "status:a",
        prefLabel: "Available",
      })
    })

    it("initializes the Item's source", () => {
      expect(item.source).toBe("SierraNypl")
    })

    it("initializes the Item's access message", () => {
      expect(item.accessMessage).toBe("Use in library")
    })

    it("initializes the Item's access message", () => {
      expect(item.callNumber).toBe("D-11 2906")
    })
  })
})
