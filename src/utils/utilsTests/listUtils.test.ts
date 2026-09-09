import {
  generateListSlug,
  listResultsHeading,
  buildListRecordWithBibData,
  buildListRecords,
  downloadList,
  duplicateList,
  LIST_RECORDS_PER_PAGE,
} from "../listUtils"
import type { List, ListRecord, ListRecordResult } from "../../types/listTypes"
import type { DiscoverySearchResultsElement } from "../../types/searchTypes"
import type { Patron } from "../../types/myAccountTypes"
import { STATIC_STATUS_MESSAGES } from "../statusUtils"

describe("listUtils", () => {
  describe("generateListSlug", () => {
    it("converts a name to lowercase kebab-case", () => {
      expect(generateListSlug("My Favorite Books")).toBe("my-favorite-books")
    })

    it("collapses consecutive special characters into a single hyphen", () => {
      expect(generateListSlug("Books & More -- List!")).toBe("books-more-list")
    })

    it("strips leading and trailing hyphens", () => {
      expect(generateListSlug("  - My List - ")).toBe("my-list")
    })

    it("returns an empty string for an empty input", () => {
      expect(generateListSlug("")).toBe("")
    })

    it("returns an empty string for a null input", () => {
      expect(generateListSlug(null)).toBe("")
    })
  })

  describe("listResultsHeading", () => {
    it("returns the correct heading for the first page", () => {
      expect(listResultsHeading({ recordCount: 100 }, 1)).toBe(
        `Displaying 1-${LIST_RECORDS_PER_PAGE} of 100 records`
      )
    })

    it("returns the correct heading for a middle page", () => {
      expect(listResultsHeading({ recordCount: 100 }, 2)).toBe(
        "Displaying 21-40 of 100 records"
      )
    })

    it("clamps the end value to the total on the last page", () => {
      expect(listResultsHeading({ recordCount: 25 }, 2)).toBe(
        "Displaying 21-25 of 25 records"
      )
    })

    it("uses singular 'record' when total is 1", () => {
      expect(listResultsHeading({ recordCount: 1 }, 1)).toBe(
        "Displaying 1-1 of 1 record"
      )
    })
  })

  describe("buildListRecordWithBibData", () => {
    const baseRecord: ListRecordResult = {
      uri: "b12345678",
      addedToListDate: "2026-04-21T16:23:22.319202",
      description: "",
    }

    it("extracts title, creator, call number, and publication statement from bib data", () => {
      const bibData = {
        titleDisplay: ["A Great Book"],
        creatorLiteral: ["Smith, John"],
        publicationStatement: ["New York, 2020"],
        shelfMark: ["QA76.9.A25 S65"],
        items: [{}],
      }
      const record = buildListRecordWithBibData(baseRecord, bibData)
      expect(record.title).toBe("A Great Book")
      expect(record.creatorLiteral).toBe("Smith, John")
      expect(record.publicationStatement).toBe("New York, 2020")
      expect(record.callNumber).toBe("QA76.9.A25 S65")
    })

    it("formats addedToListDate when addedFormattedDate is not present", () => {
      const record = buildListRecordWithBibData(baseRecord, {})
      expect(record.addedFormattedDate).toBe("4/21/2026")
    })

    it("prefers addedFormattedDate when already present on the record", () => {
      const alreadyBuilt = {
        ...baseRecord,
        addedFormattedDate: "4/21/2026",
      } as ListRecordResult
      const record = buildListRecordWithBibData(alreadyBuilt, {
        titleDisplay: ["New Title"],
        items: [{}],
      })
      expect(record.addedFormattedDate).toBe("4/21/2026")
    })

    it("sets location to 'Multiple' when there is more than one item", () => {
      const record = buildListRecordWithBibData(baseRecord, {
        items: [{}, {}],
      })
      expect(record.location).toBe("Multiple")
    })

    it("sets location to 'Multiple' when numItemsTotal exceeds 1", () => {
      const record = buildListRecordWithBibData(baseRecord, {
        numItemsTotal: 5,
        items: [],
      })
      expect(record.location).toBe("Multiple")
    })

    it("returns null/empty defaults when bibData is empty", () => {
      const record = buildListRecordWithBibData(baseRecord, {})
      expect(record.title).toBeNull()
      expect(record.creatorLiteral).toBeNull()
      expect(record.callNumber).toBe("")
      expect(record.publicationStatement).toBeNull()
    })
  })

  describe("buildListRecords", () => {
    const pageRecords: ListRecordResult[] = [
      {
        uri: "b11111111",
        addedToListDate: "2026-01-01T00:00:00",
        description: "",
      },
      {
        uri: "b22222222",
        addedToListDate: "2026-01-02T00:00:00",
        description: "",
      },
      {
        uri: "b33333333",
        addedToListDate: "2026-01-03T00:00:00",
        description: "",
      },
    ]

    const bibData = [
      {
        "@id": "res:b11111111",
        titleDisplay: ["Zebra Book"],
        creatorLiteral: ["Cho, Anna"],
        shelfMark: ["Z100"],
      },
      {
        "@id": "res:b22222222",
        titleDisplay: ["Apple Book"],
        creatorLiteral: ["Braun, Carl"],
        shelfMark: ["A200"],
      },
      {
        "@id": "res:b33333333",
        titleDisplay: ["Mango Book"],
        creatorLiteral: ["Adams, Beth"],
        shelfMark: ["M300"],
      },
    ]

    it("sorts by title ascending", () => {
      const result = buildListRecords(
        bibData as unknown as DiscoverySearchResultsElement[],
        pageRecords,
        "title_asc"
      )
      expect(result.map((r) => r.title)).toEqual([
        "Apple Book",
        "Mango Book",
        "Zebra Book",
      ])
    })

    it("sorts by title descending", () => {
      const result = buildListRecords(
        bibData as unknown as DiscoverySearchResultsElement[],
        pageRecords,
        "title_desc"
      )
      expect(result.map((r) => r.title)).toEqual([
        "Zebra Book",
        "Mango Book",
        "Apple Book",
      ])
    })

    it("sorts by creator ascending", () => {
      const result = buildListRecords(
        bibData as unknown as DiscoverySearchResultsElement[],
        pageRecords,
        "creator_asc"
      )
      expect(result.map((r) => r.creatorLiteral)).toEqual([
        "Adams, Beth",
        "Braun, Carl",
        "Cho, Anna",
      ])
    })

    it("sorts by creator descending", () => {
      const result = buildListRecords(
        bibData as unknown as DiscoverySearchResultsElement[],
        pageRecords,
        "creator_desc"
      )
      expect(result.map((r) => r.creatorLiteral)).toEqual([
        "Cho, Anna",
        "Braun, Carl",
        "Adams, Beth",
      ])
    })

    it("sorts by call number ascending", () => {
      const result = buildListRecords(
        bibData as unknown as DiscoverySearchResultsElement[],
        pageRecords,
        "callnumber_asc"
      )
      expect(result.map((r) => r.callNumber)).toEqual(["A200", "M300", "Z100"])
    })

    it("preserves the backend order for modified_date sorts", () => {
      const result = buildListRecords(
        bibData as unknown as DiscoverySearchResultsElement[],
        pageRecords,
        "modified_date_asc"
      )
      expect(result.map((r) => r.uri)).toEqual([
        "b11111111",
        "b22222222",
        "b33333333",
      ])
    })

    it("appends records that have no matching bib data", () => {
      const result = buildListRecords(
        [bibData[0]] as unknown as DiscoverySearchResultsElement[],
        pageRecords,
        "title_asc"
      )
      expect(result).toHaveLength(3)
      // The two without bib data have no title
      expect(result.filter((r) => r.title === null)).toHaveLength(2)
    })
  })

  describe("downloadList", () => {
    beforeEach(() => jest.clearAllMocks())

    it("returns early without fetching when recordCount is 0", async () => {
      const list: List = {
        id: "1",
        listName: "Empty",
        patronId: "p1",
        records: [],
        recordCount: 0,
        description: null,
        createdDate: "2026-01-01",
        modifiedDate: "2026-01-01",
        isDefaultList: false,
      }
      global.fetch = jest.fn()
      await downloadList(list, "title_asc")
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it("returns early without fetching when records is null", async () => {
      const list = {
        id: "1",
        listName: "Null records",
        patronId: "p1",
        records: null,
        recordCount: 1,
        description: null,
        createdDate: "2026-01-01",
        modifiedDate: "2026-01-01",
        isDefaultList: false,
      } as unknown as List
      global.fetch = jest.fn()
      await downloadList(list, "title_asc")
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it("fetches bib data using the record URIs and triggers a download", async () => {
      const list: List = {
        id: "1",
        listName: "Test List",
        patronId: "p1",
        records: [
          { uri: "b11111111" } as ListRecord,
          { uri: "b22222222" } as ListRecord,
        ],
        recordCount: 2,
        description: null,
        createdDate: "2026-01-01",
        modifiedDate: "2026-01-01",
        isDefaultList: false,
      }

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ bibData: [] }),
      })
      global.URL.createObjectURL = jest.fn().mockReturnValue("blob:url")
      global.URL.revokeObjectURL = jest.fn()

      const link = {
        setAttribute: jest.fn(),
        click: jest.fn(),
      } as unknown as HTMLAnchorElement
      jest.spyOn(document, "createElement").mockReturnValue(link)
      jest.spyOn(document.body, "appendChild").mockReturnValue(link)
      jest.spyOn(document.body, "removeChild").mockReturnValue(link)

      await downloadList(list, "title_asc")

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("b11111111")
      )
      expect(link.click).toHaveBeenCalled()

      jest.restoreAllMocks()
    })

    it("writes a TSV row with the correct URL for each record", async () => {
      const list: List = {
        id: "1",
        listName: "URL Test",
        patronId: "p1",
        records: [{ uri: "b99999999" } as ListRecord],
        recordCount: 1,
        description: null,
        createdDate: "2026-01-01",
        modifiedDate: "2026-01-01",
        isDefaultList: false,
      }

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          bibData: [
            {
              uri: "b99999999",
              titleDisplay: ["Test Title"],
              creatorLiteral: ["Author, A"],
              shelfMark: ["TX123"],
            },
          ],
        }),
      })

      let capturedTsv = ""
      const OriginalBlob = global.Blob
      global.Blob = jest.fn().mockImplementation((parts: BlobPart[]) => {
        capturedTsv = parts[0] as string
        return new OriginalBlob(parts)
      }) as unknown as typeof Blob
      global.URL.createObjectURL = jest.fn().mockReturnValue("blob:url")
      global.URL.revokeObjectURL = jest.fn()

      const link = {
        setAttribute: jest.fn(),
        click: jest.fn(),
      } as unknown as HTMLAnchorElement
      jest.spyOn(document, "createElement").mockReturnValue(link)
      jest.spyOn(document.body, "appendChild").mockReturnValue(link)
      jest.spyOn(document.body, "removeChild").mockReturnValue(link)

      await downloadList(list, "title_asc")

      // TSV columns: #, Record number, Title, Author, Publication, Call number, Date added, URL
      const [, dataRow] = capturedTsv.split("\n")
      const columns = dataRow.split("\t")
      expect(columns[1]).toBe('"b99999999"')
      expect(columns[2]).toBe('"Test Title"')
      expect(columns[7]).toBe('"https://catalog.nypl.org/record=b99999999"')

      global.Blob = OriginalBlob
      jest.restoreAllMocks()
    })
  })

  describe("duplicateList", () => {
    const baseList: List = {
      id: "list-1",
      listName: "My List",
      patronId: "12345",
      records: [{ uri: "b11111111" } as ListRecord],
      recordCount: 1,
      description: "A description",
      createdDate: "2026-01-01",
      modifiedDate: "2026-01-01",
      isDefaultList: false,
    }
    const patron = { id: 12345 } as unknown as Patron
    const setStatus = jest.fn()
    const setUpdatedAccountData = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    it("POSTs with the list name suffixed with ' (copy)' and the record URIs", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          list: { id: "list-2", listName: "My List (copy)" },
        }),
      })

      await duplicateList({
        list: baseList,
        patron,
        lists: [],
        updatedAccountData: {},
        setUpdatedAccountData,
        setStatus,
      })

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/account/lists/list"),
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("My List (copy)"),
        })
      )
    })

    it("prepends the new list to updatedAccountData on success", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          list: { id: "list-2", listName: "My List (copy)" },
        }),
      })

      await duplicateList({
        list: baseList,
        patron,
        lists: [],
        updatedAccountData: {},
        setUpdatedAccountData,
        setStatus,
      })

      expect(setUpdatedAccountData).toHaveBeenCalledWith(
        expect.objectContaining({
          lists: [{ id: "list-2", listName: "My List (copy)" }],
        })
      )
    })

    it("calls setStatus with the failure message when the response is not ok", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: async () => ({}),
      })

      await duplicateList({
        list: baseList,
        patron,
        lists: [],
        updatedAccountData: {},
        setUpdatedAccountData,
        setStatus,
      })

      expect(setStatus).toHaveBeenCalledWith(
        STATIC_STATUS_MESSAGES.duplicateListFailure
      )
      expect(setUpdatedAccountData).not.toHaveBeenCalled()
    })

    it("truncates list names longer than 90 characters before appending ' (copy)'", async () => {
      const longName = "Z".repeat(95)
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          list: { id: "list-2", listName: `${"Z".repeat(90)} (copy)` },
        }),
      })

      await duplicateList({
        list: { ...baseList, listName: longName },
        patron,
        lists: [],
        updatedAccountData: {},
        setUpdatedAccountData,
        setStatus,
      })

      const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body)
      expect(body.listName).toBe(`${"Z".repeat(90)} (copy)`)
    })
  })
})
