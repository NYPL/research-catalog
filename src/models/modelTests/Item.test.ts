import Item from "../Item"
import SearchResultsBib from "../SearchResultsBib"
import {
  itemPhysicallyRequestable,
  itemEddRequestable,
  itemUnavailable,
  itemPartnerReCAP,
  itemNYPLReCAP,
  itemUseInLibrary,
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
      expect(item.dueDate).toBe("2023-09-03")
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

  describe("Getter functions", () => {
    it("determines if an item is available based on the status label", () => {
      expect(item.isAvailable).toBe(true)

      const useInLibraryItem = new Item(itemUseInLibrary, parentBib)
      expect(useInLibraryItem.isAvailable).toBe(true)

      const unavailableItem = new Item(itemUnavailable, parentBib)
      expect(unavailableItem.isAvailable).toBe(false)
    })

    it("formats an aria label for the request buttons that includes the bib title and the volume if available", () => {
      expect(item.requestButtonAriaLabel).toBe(
        "A history of spaghetti eating and cooking for: spaghetti dinner., no. 4 (2001)"
      )
      const itemWithoutVolume = new Item(itemUnavailable, parentBib)
      expect(itemWithoutVolume.requestButtonAriaLabel).toBe(
        "A history of spaghetti eating and cooking for: spaghetti dinner."
      )
    })

    it("returns the source in kebabcase for use in hold requests", () => {
      expect(item.formattedSourceForHoldRequest).toBe("sierra-nypl")
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
})
