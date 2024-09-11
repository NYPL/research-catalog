import { bibWithItems } from "../../../__test__/fixtures/bibFixtures"
import Bib from "../Bib"
import Item from "../Item"

describe("Bib model", () => {
  let bib: Bib

  beforeEach(() => {
    bib = new Bib(bibWithItems.resource)
  })

  describe("constructor", () => {
    it("initializes the Bib ID with the with the Bib's @id field", () => {
      expect(bib.id).toBe("b15080796")
    })

    it("initializes the title when present", () => {
      expect(bib.title).toBe("Urban spaghetti.")
    })

    it("initializes the titleDisplay field when present", () => {
      expect(bib.titleDisplay).toBe("Urban spaghetti.")
    })

    it("initializes the electronicResources as empty array when missing from bib result", () => {
      expect(bib.electronicResources).toStrictEqual([])
    })

    it("initializes numPhysicalItems based on the number of physical items", () => {
      expect(bib.numPhysicalItems).toBe(4)
    })

    it("initializes materialType with the Bib's materialType field", () => {
      expect(bib.materialType).toBe("Text")
    })

    it("initializes issuance with the Bib's issuance field", () => {
      expect(bib.issuance).toStrictEqual([
        { "@id": "urn:biblevel:s", prefLabel: "serial" },
      ])
    })

    it("initializes the items field with the Bib's items mapped as Item objects", () => {
      expect(bib.items.length).toBe(4)
      expect(typeof bib.items[0]).toBe("object")
      expect(bib.items[0] instanceof Item).toBe(true)
    })
  })
})
