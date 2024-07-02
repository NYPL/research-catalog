import { bibWithItems } from "../../../__test__/fixtures/bibFixtures"
import SearchResultsBib from "../SearchResultsBib"
import ItemTableData from "../ItemTableData"

describe("SearchResultsBib model", () => {
  let searchResultsBib: SearchResultsBib

  beforeEach(() => {
    searchResultsBib = new SearchResultsBib(bibWithItems.resource)
  })

  describe("constructor", () => {
    it("inherits the parent class's constructor properties", () => {
      expect(searchResultsBib.id).toBe("b15080796")
      expect(searchResultsBib.title).toBe("Urban spaghetti.")
      expect(searchResultsBib.electronicResources).toStrictEqual([])
      expect(searchResultsBib.numPhysicalItems).toBe(4)
      expect(searchResultsBib.materialType).toBe("Text")
      expect(searchResultsBib.issuance).toStrictEqual([
        { "@id": "urn:biblevel:s", prefLabel: "serial" },
      ])
    })

    it("initializes the yearPublished based on dateStartYear and dateEndYear", () => {
      expect(searchResultsBib.yearPublished).toBe("1999-present")
    })

    it("initializes the publicationStatement based on bib result's publicationStatement if present", () => {
      expect(searchResultsBib.publicationStatement).toBe(
        "Mansfield, Ohio : Urban Spaghetti, [1999?-"
      )
    })
  })

  describe("showViewAllItemsLink", () => {
    it("returns true if the number of physical items is greater than ITEMS_PER_SEARCH_RESULT", () => {
      expect(searchResultsBib.showViewAllItemsLink).toBe(true)
    })
  })

  describe("getNumItemsMessage", () => {
    it("returns a message populated with the correct resource type and pluralization", () => {
      expect(searchResultsBib.getNumItemsMessage()).toBe("4 Items")
    })
  })

  describe("itemTables", () => {
    it("returns an array of one ItemTableData object per item capped at the maximum of ITEMS_PER_SEARCH_RESULT", () => {
      expect(searchResultsBib.itemTables.length).toBe(3)
      expect(typeof searchResultsBib.itemTables[0]).toBe("object")
      expect(searchResultsBib.itemTables[0] instanceof ItemTableData).toBe(true)
    })
  })
})
