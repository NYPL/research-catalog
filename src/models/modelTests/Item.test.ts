import Item from "../Item"
import SearchResultsBib from "../SearchResultsBib"
import { itemWithPhysicalResources } from "../../../__test__/fixtures/item"
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
  })
})
