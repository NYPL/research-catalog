import {
  bibWithItems,
  bibWithSupplementaryContent as bibWithOneElectronicResource,
  bibNoItems,
} from "../../../__test__/fixtures/bibFixtures"
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
      expect(searchResultsBib.format).toBe("Text")
      expect(searchResultsBib.issuance).toStrictEqual([
        { "@id": "urn:biblevel:s", prefLabel: "serial" },
      ])
    })
    it("defaults to title display when no title", () => {
      const bibWithNoTitle = new SearchResultsBib({
        ...bibWithItems.resource,
        title: undefined,
        titleDisplay: ["Display title"],
      })
      expect(bibWithNoTitle.title).toBe("Display title")
    })
    it("defaults to '[Untitled]' when no title or titleDisplay", () => {
      const bibWithNoTitle = new SearchResultsBib({
        ...bibWithItems.resource,
        title: undefined,
        titleDisplay: undefined,
      })
      expect(bibWithNoTitle.title).toBe("[Untitled]")
    })

    it("initializes the yearPublished based on dateStartYear", () => {
      expect(searchResultsBib.yearPublished).toBe("1999")
    })

    it("initializes the publicationStatement based on bib result's publicationStatement if present", () => {
      expect(searchResultsBib.publicationStatement).toBe(
        "Mansfield, Ohio : Urban Spaghetti, [1999?-"
      )
    })
  })

  describe("showViewAllItemsLink", () => {
    it("returns true if the number of physical items is greater than ITEMS_PER_SEARCH_RESULT", () => {
      expect(searchResultsBib.showViewAllItemsLink()).toBe(true)
    })
  })

  describe("getNumItemsMessage", () => {
    it("returns a message populated with the correct resource type and pluralization", () => {
      expect(searchResultsBib.getNumItemsMessage()).toBe("4 items")
    })
    it("works for single eResource", () => {
      const bibOneElectronicResource = new SearchResultsBib(
        bibWithOneElectronicResource.resource
      )
      expect(bibOneElectronicResource.getNumItemsMessage()).toBe("1 resource")
    })
    it("works for a bib with no items", () => {
      const bibWithNoItems = new SearchResultsBib(bibNoItems.resource)
      expect(bibWithNoItems.getNumItemsMessage()).toBe("0 resources")
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
