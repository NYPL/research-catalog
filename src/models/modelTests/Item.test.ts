import Item from "../Item"
import SearchResultsBib from "../SearchResultsBib"
import { itemPhysicallyRequestable } from "../../../__test__/fixtures/itemPhysicallyRequestable"
import { itemEddRequestable } from "../../../__test__/fixtures/itemEddRequestable"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"

describe("Item model", () => {
  let parentBib: SearchResultsBib
  let item: Item

  beforeEach(() => {
    parentBib = new SearchResultsBib(searchResultPhysicalItems)
    item = new Item(itemPhysicallyRequestable, parentBib)
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

    it("initializes the Item's call number", () => {
      expect(item.callNumber).toBe("D-11 2906")
    })

    it("initializes the Item's volume", () => {
      expect(item.volume).toBe("no. 4 (2001)")
    })

    it("initializes the Item's barcode", () => {
      expect(item.barcode).toBe("33433090622188")
    })

    it("initializes the Item's location", () => {
      expect(item.location).toStrictEqual({
        "@id": "loc:mal82",
        endpoint: "schwarzman",
        prefLabel: "Schwarzman Building - Main Reading Room 315",
      })
    })

    it("initializes the Item's aeon url", () => {
      expect(item.aeonUrl).toBe(
        "https://specialcollections.nypl.org/aeon/Aeon.dll?Action=10&Form=30&Title=Spaghetti+westerns.&Site=LPAMRAMI&CallNumber=*LDC+14245&ItemPlace=[New+York?]+:&ItemPublisher=DRG+Records+Inc.,&Date=p1995.&ItemInfo3=https://catalog.nypl.org/record=b19028235&ReferenceNumber=b190282356&ItemInfo1=USE+IN+LIBRARY&ItemNumber=33433085319782&ItemISxN=i265238791&Genre=Music+CD&Location=Performing+Arts+Music+Division"
      )
    })

    it("initializes the Item's isPhysicallyRequestable and isEddRequestable params", () => {
      expect(item.isPhysicallyRequestable).toBe(true)
      expect(item.isEDDRequestable).toBe(false)

      const itemEdd = new Item(itemEddRequestable, parentBib)
      expect(itemEdd.isEDDRequestable).toBe(true)
      expect(itemEdd.isPhysicallyRequestable).toBe(false)
    })
  })
})
