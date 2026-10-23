import {
  bibWithItems,
  bibWithSupplementaryContent as bibWithOneElectronicResource,
  bibNoItems,
} from "../../../__test__/fixtures/bibFixtures"
import SearchResultsBib from "../SearchResultsBib"
import ItemTableData from "../ItemTableData"

const collectionField = {
  "@id": "collection:id",
  prefLabel: "Collection",
  locationsPath: "locations/collection",
}

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

    it("initializes the publicationStatement based on bib result's publicationStatement if present", () => {
      expect(searchResultsBib.publicationStatement).toBe(
        "Mansfield, Ohio : Urban Spaghetti, [1999?-"
      )
    })

    it("suppresses bib level callNumber and collection from the result when it has no items AND is not purely electronic", () => {
      const bibWithNoItems = new SearchResultsBib(bibNoItems.resource)
      expect(bibWithNoItems.callNumber).toBe("JFK 01-374")
    })

    it("suppresses bib level callNumber and collection for purely electronic resource bibs", () => {
      const electronicOnlyResult = {
        ...bibWithOneElectronicResource.resource,
        shelfMark: ["JFK 01-374"],
        collection: [collectionField],
      }
      const electronicOnlyBib = new SearchResultsBib(electronicOnlyResult)
      expect(electronicOnlyBib.isOnlyElectronicResources).toBe(true)
      expect(electronicOnlyBib.callNumber).toBeNull()
      expect(electronicOnlyBib.collection).toBeNull()
    })

    it("suppresses bib level callNumber and collection when the bib has items", () => {
      expect(searchResultsBib.callNumber).toBeNull()
      expect(searchResultsBib.collection).toBeNull()
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

  describe("noItemsBibTableData", () => {
    it("returns call number table data for a bib with no items and no electronic resources", () => {
      const bibWithNoItems = new SearchResultsBib(bibNoItems.resource)
      expect(bibWithNoItems.noItemsBibTableData.tableHeadings).toContain(
        "Call Number"
      )
    })

    it("returns null for a purely electronic resource bib, even if it has a shelfMark/collection", () => {
      const electronicOnlyResult = {
        ...bibWithOneElectronicResource.resource,
        shelfMark: ["JFK 01-374"],
        collection: [collectionField],
      }
      const electronicOnlyBib = new SearchResultsBib(electronicOnlyResult)
      expect(electronicOnlyBib.noItemsBibTableData).toBeNull()
    })

    it("returns null for a bib with items", () => {
      expect(searchResultsBib.noItemsBibTableData).toBeNull()
    })
  })
})
