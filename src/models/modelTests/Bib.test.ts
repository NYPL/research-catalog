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

  describe("Item table", () => {
    it("returns empty array if no items exist", () => {
      const bibWithoutItems = new Bib({ ...bibWithItems.resource, items: [] })
      expect(bibWithoutItems.getItemTable({ inSearchResult: false })).toEqual(
        []
      )
    })

    it("returns individual tables for items in search results", () => {
      const result = bib.getItemTable({ inSearchResult: true, maxItems: 3 })
      expect(result).toHaveLength(3)
      result.forEach((table) => {
        expect(table.items).toHaveLength(1)
        expect(table.tableHeadings).toContain("Call number")
        expect(Array.isArray(table.tableData)).toBe(true)
      })
    })

    it("returns one table for all items outside of search results", () => {
      const result = bib.getItemTable({ inSearchResult: false })
      expect(result).toHaveLength(1)
      const [table] = result
      expect(table.items).toHaveLength(4)
      expect(table.tableHeadings).toContain("Call number")
      expect(Array.isArray(table.tableData)).toBe(true)
      expect(table.tableData).toHaveLength(4)
    })

    describe("getItemTableHeadings", () => {
      it("includes all columns outside search results", () => {
        const headings = bib.getItemTableHeadings({ inSearchResult: false })
        expect(headings).toEqual(
          expect.arrayContaining([
            "Status",
            "Vol/date",
            "Format",
            "Access",
            "Call number",
            "Item location",
          ])
        )
      })

      it("excludes conditional columns in search results", () => {
        const headings = bib.getItemTableHeadings({ inSearchResult: true })
        expect(headings).toEqual(
          expect.arrayContaining(["Format", "Call number", "Item location"])
        )
        expect(headings).not.toContain("Status")
        expect(headings).not.toContain("Access")
        expect(headings).not.toContain("Vol/date") // volume column is skipped for search results
      })
    })

    describe("Item table column visibility", () => {
      it("shows status column only outside of search results", () => {
        expect(bib.showStatusColumn(false)).toBe(true)
        expect(bib.showStatusColumn(true)).toBe(false)
      })

      it("shows access column only outside of search results", () => {
        expect(bib.showAccessColumn(false)).toBe(true)
        expect(bib.showAccessColumn(true)).toBe(false)
      })

      it("shows volume column only if at least one item has volume and not in search results", () => {
        expect(bib.showVolumeColumn(false)).toBe(true)
        expect(bib.showVolumeColumn(true)).toBe(false)
      })

      it("returns Container as volume heading for archive collection", () => {
        const archiveBib = new Bib({
          ...bibWithItems.resource,
          issuance: [{ "@id": "urn:biblevel:c", prefLabel: "collection" }],
        })
        expect(archiveBib.volumeColumnHeading()).toBe("Container")
      })

      it("returns 'Vol/date' as volume heading for non-archive bibs", () => {
        expect(bib.volumeColumnHeading()).toBe("Vol/date")
      })
    })

    describe("getItemTableContents", () => {
      it("returns table content with proper structure outside of search results", () => {
        const contents = bib.getItemTableContents({ inSearchResult: false })
        expect(contents.length).toBe(4)
        contents.forEach((row) => {
          expect(Array.isArray(row)).toBe(true)
          expect(row.length).toBe(6) // Status, Volume, Format, Access, Call number, Item location
        })
      })

      it("returns table content with fewer columns in search results", () => {
        const contents = bib.getItemTableContents({ inSearchResult: true })
        expect(contents.length).toBe(4)
        contents.forEach((row) => {
          expect(row.length).toBe(3) // Format, Call number, Item location
        })
      })

      it("uses specified items when passed explicitly", () => {
        const subset = bib.items.slice(0, 2)
        const contents = bib.getItemTableContents({
          inSearchResult: true,
          items: subset,
        })
        expect(contents.length).toBe(2)
      })
    })
  })
})
