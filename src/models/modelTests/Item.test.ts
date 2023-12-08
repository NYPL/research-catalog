import Item from "../Item"
import SearchResultsBib from "../SearchResultsBib"
import {
  itemPhysicallyRequestable,
  itemEddRequestable,
  itemUnavailable,
  itemPartnerReCAP,
  itemNYPLReCAP,
  itemNoShelfMark,
  itemNoShelfMarkNoURI,
} from "../../../__test__/fixtures/itemFixtures"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"

describe("Item model", () => {
  let parentBib: SearchResultsBib
  let item: Item

  beforeEach(() => {
    parentBib = new SearchResultsBib(searchResultPhysicalItems)
    item = new Item(itemPhysicallyRequestable, parentBib)
  })

  describe("constructor", () => {
    it("initializes the Item ID with the with the item's uri field", () => {
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

    it("initializes the Item's due date", () => {
      expect(item.dueDate).toBe("September 3rd")
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

  describe("isAvailable", () => {
    it("determines if an item is available based on the status label", () => {
      expect(item.isAvailable).toBe(true)

      const unavailableItem = new Item(itemUnavailable, parentBib)
      expect(unavailableItem.isAvailable).toBe(false)
    })
  })

  describe("ReCAP checks", () => {
    let partnerRecap: Item
    let nyplRecap: Item
    beforeEach(() => {
      partnerRecap = new Item(itemPartnerReCAP, parentBib)
      nyplRecap = new Item(itemNYPLReCAP, parentBib)
    })

    it("determines if an item is reCAP", () => {
      expect(partnerRecap.isReCAP).toBe(true)
      expect(nyplRecap.isReCAP).toBe(true)
    })

    it("determines if an item is nypl-owned reCAP or non-nypl Recap", () => {
      expect(partnerRecap.isNYPLReCAP()).toBe(false)
      expect(partnerRecap.isPartnerReCAP()).toBe(true)

      expect(nyplRecap.isNYPLReCAP()).toBe(true)
      expect(nyplRecap.isPartnerReCAP()).toBe(false)
    })
  })

  describe("Sortable shelfMark field creation", () => {
    it("sets the sortableShelfMark with an 'a' prefix when shelfMark field is present", () => {
      const itemWithShelfMark = new Item(itemPhysicallyRequestable, parentBib)
      expect(itemWithShelfMark.sortableShelfMark).toBe("aD-11 002906")
    })
    it("correctly sets the sortableShelfMark as the call number with a 'b' prefix when shelfMark is absent", () => {
      const itemMissingShelfMark = new Item(itemNoShelfMark, parentBib)
      expect(itemMissingShelfMark.sortableShelfMark).toBe("bi10572546")
    })
    it("correctly sets the sortableShelfMark to 'c' when shelfMark and URI are absent", () => {
      const itemMissingShelfMarkAndURI = new Item(
        itemNoShelfMarkNoURI,
        parentBib
      )
      expect(itemMissingShelfMarkAndURI.sortableShelfMark).toBe("c")
    })
  })
})
