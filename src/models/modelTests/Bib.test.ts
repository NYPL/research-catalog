import {
  bibWithItems,
  bibWithSupplementaryContent,
} from "../../../__test__/fixtures/bibFixtures"
import Bib from "../Bib"
import Item from "../Item"

describe("Bib model", () => {
  let bib: Bib

  beforeEach(() => {
    bib = new Bib(bibWithItems.resource)
  })

  describe("constructor", () => {
    describe("findingAid", () => {
      const findingAidBib = new Bib({
        ...bibWithItems.resource,
        supplementaryContent: [
          {
            "@type": "nypl:SupplementaryContent",
            label: "Finding aid",
            url: "http://archives.nypl.org/scm/29990",
          },
        ],
      })
      it("can handle supp content with no label", () => {
        const bib = new Bib({
          ...bibWithItems.resource,
          supplementaryContent: [
            {
              "@type": "nypl:SupplementaryContent",
              url: "http://archives.nypl.org/scm/29990",
            },
          ],
        })
        expect(bib.findingAid).toBe(null)
      })
      it("initializes the finding aid when present", () => {
        expect(findingAidBib.findingAid).toBe(
          "http://archives.nypl.org/scm/29990"
        )
      })

      it("does not initialize finding aid when no aid but supp content", () => {
        const bibWithSupplementaryContentModel = new Bib(
          bibWithSupplementaryContent.resource
        )
        expect(bibWithSupplementaryContentModel.findingAid).toBe(null)
      })

      it("can handle no supplementary content", () => {
        expect(bib.findingAid).toBe(null)
      })
      it("initializes finding aid in time to populate finding aid on item availability", () => {
        expect(
          findingAidBib.items.every((item) => item.availability.findingAid)
        ).toBe(true)
      })
    })
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

    it("initializes format with the Bib's format field", () => {
      expect(bib.format).toBe("Text")
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

    it("initializes the hasItemDates field when present", () => {
      expect(bib.hasItemDates).toBe(true)
    })
  })
})
