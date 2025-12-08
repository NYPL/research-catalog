import {
  emptyPatron,
  processedCheckouts,
  processedFines,
  processedHolds,
  processedPatron,
} from "../../../__test__/fixtures/processedMyAccountData"
import MyAccount, { MyAccountFactory } from "../MyAccount"
import {
  holds,
  checkouts,
  patron,
  fines,
  holdBibs,
  checkoutBibs,
  empty,
} from "../../../__test__/fixtures/rawSierraAccountData"
import type { Hold, SierraHold } from "../../types/myAccountTypes"

describe("MyAccountModel", () => {
  const fetchBibs = MyAccount.prototype.fetchBibItemData
  afterEach(() => {
    MyAccount.prototype.fetchBibItemData = fetchBibs
  })

  describe("getRecordId", () => {
    it("can parse an id", () => {
      const idUrl =
        "https://ilsstaff.nypl.org/iii/sierra-api/v6/patrons/holds/48636910"
      expect(MyAccount.getRecordId(idUrl)).toBe("48636910")
    })
    it("can handle no input", () => {
      expect(MyAccount.getRecordId("")).toBe(null)
    })
  })

  describe("getHoldStatus", () => {
    it("returns the correct status", () => {
      expect(
        MyAccount.getHoldStatus({
          code: "b",
          name: "Requested item ready for pickup.",
        })
      ).toBe("READY FOR PICKUP")
      expect(
        MyAccount.getHoldStatus({
          code: "i",
          name: "Requested item ready for pickup.",
        })
      ).toBe("READY FOR PICKUP")
      expect(
        MyAccount.getHoldStatus({
          code: "t",
          name: "Requested item is in transit.",
        })
      ).toBe("REQUEST CONFIRMED")
      expect(
        MyAccount.getHoldStatus({
          code: "0",
          name: "on hold.",
        })
      ).toBe("REQUEST PENDING")
    })
    it("returns anything beyond the mapped 3 as REQUEST PENDING", () => {
      expect(
        MyAccount.getHoldStatus({
          code: "spaghetti",
          name: "spagehe tti Hello",
        })
      ).toBe("REQUEST PENDING")
    })
  })

  describe("fetcher", () => {
    it("can return checkouts", async () => {
      const mockSierraClient = {
        get: async (path) => {
          if (path.includes("checkouts")) {
            return Promise.resolve(checkouts)
          } else if (path.includes("bibs")) {
            return Promise.resolve(checkoutBibs)
          } else if (path.includes("items")) {
            return Promise.resolve({ entries: [] })
          }
        },
      }
      const fetcher = new MyAccount(mockSierraClient, "12345")
      const processedCheckoutsToTest = await fetcher.getCheckouts()
      expect(processedCheckoutsToTest).toStrictEqual(processedCheckouts)
    })
    it("can return holds", async () => {
      const mockSierraClient = {
        get: async (path) => {
          if (path.includes("holds")) {
            return Promise.resolve(holds)
          } else if (path.includes("bibs")) {
            return Promise.resolve(holdBibs)
          } else if (path.includes("items")) {
            return Promise.resolve({ entries: [] })
          }
        },
      }
      const fetcher = new MyAccount(mockSierraClient, "12345")
      const processedHoldsToTest = await fetcher.getHolds()
      expect(processedHoldsToTest).toStrictEqual(processedHolds)
    })
    it("can return fines", async () => {
      const mockSierraClient = {
        get: async () => Promise.resolve(fines),
      }
      const fetcher = new MyAccount(mockSierraClient, "12345")
      const processedFinesToTest = await fetcher.getFines()
      expect(processedFinesToTest).toStrictEqual(processedFines)
    })
  })

  describe("getResearchAndOwnership", () => {
    it("can handle no varfields", () => {
      expect(MyAccount.getResearchAndOwnership({})).toStrictEqual({
        isResearch: false,
        isNyplOwned: true,
      })
    })
    it("can handle missing 910 field", () => {
      expect(
        MyAccount.getResearchAndOwnership({
          varFields: [{ marcTag: "666" }],
        })
      ).toStrictEqual({
        isResearch: true,
        isNyplOwned: false,
      })
    })
    it("can handle a otf record", () => {
      expect(
        MyAccount.getResearchAndOwnership({
          varFields: [
            { marcTag: "910", subfields: [{ tag: "a", content: "RLOTF" }] },
          ],
        })
      ).toStrictEqual({
        isResearch: true,
        isNyplOwned: false,
      })
    })
    it("can handle an nypl research record", () => {
      expect(
        MyAccount.getResearchAndOwnership({
          varFields: [
            { marcTag: "910", subfields: [{ tag: "a", content: "RL" }] },
          ],
        })
      ).toStrictEqual({
        isResearch: true,
        isNyplOwned: true,
      })
    })
  })

  describe("MyAccountFactory", () => {
    it("sortHolds", () => {
      const holds = [
        { pickupByDate: null },
        { pickupByDate: "May 17, 2024" },
        { pickupByDate: null },
        { pickupByDate: "January 17, 2024" },
        { pickupByDate: null },
        { pickupByDate: "April 17, 2024" },
        { pickupByDate: null },
      ] as Hold[]
      expect(MyAccount.sortHolds(holds)).toStrictEqual([
        { pickupByDate: "May 17, 2024" },
        { pickupByDate: "April 17, 2024" },
        { pickupByDate: "January 17, 2024" },
        { pickupByDate: null },
        { pickupByDate: null },
        { pickupByDate: null },
        { pickupByDate: null },
      ])
    })
    it("builds Account data model", async () => {
      MyAccount.prototype.fetchCheckouts = async () =>
        Promise.resolve(checkouts)
      MyAccount.prototype.fetchHolds = async () => Promise.resolve(holds)
      MyAccount.prototype.fetchPatron = async () => Promise.resolve(patron)
      MyAccount.prototype.fetchFines = async () => Promise.resolve(fines)
      MyAccount.prototype.fetchBibItemData = jest
        .fn()
        .mockResolvedValueOnce({
          bibEntries: checkoutBibs.entries,
          itemVarFieldsMap: {},
        })
        .mockResolvedValueOnce({
          bibEntries: holdBibs.entries,
          itemVarFieldsMap: {},
        })
      // passing in an empty object for a mock sierra client triggers a type error. ignore because we are
      // mocking the fetch calls.
      // @ts-ignore
      const account = await MyAccountFactory("12345", {})
      expect(account.patron).toStrictEqual(processedPatron)
      expect(account.holds).toStrictEqual(processedHolds)
      expect(account.checkouts).toStrictEqual(processedCheckouts)
      expect(account.fines).toStrictEqual(processedFines)
    })

    it("builds empty Account data model with empty phones, email, username", async () => {
      MyAccount.prototype.fetchCheckouts = async () => empty
      MyAccount.prototype.fetchHolds = async () => empty
      MyAccount.prototype.fetchPatron = async () => ({
        ...patron,
        phones: [],
        emails: [],
        varFields: [{ fieldtag: "not u", content: "irrelevant" }],
      })
      MyAccount.prototype.fetchFines = async () => ({ total: 0, entries: [] })
      MyAccount.prototype.fetchBibItemData = async () => ({
        total: 0,
        bibEntries: [],
        itemVarFieldsMap: { entries: [] },
      })

      const emptyAccount = await MyAccountFactory("12345", {})
      expect(emptyAccount.patron).toStrictEqual(emptyPatron)
      expect(emptyAccount.checkouts).toStrictEqual([])
      expect(emptyAccount.holds).toStrictEqual([])
      expect(emptyAccount.fines).toStrictEqual({ total: 0, entries: [] })
    })
    it("will return other processed data if one fetch fails", async () => {
      MyAccount.prototype.fetchCheckouts = async () =>
        Promise.resolve(checkouts)
      MyAccount.prototype.fetchHolds = jest.fn().mockRejectedValue({})
      MyAccount.prototype.fetchPatron = async () => Promise.resolve(patron)
      MyAccount.prototype.fetchFines = async () => ({ total: 0, entries: [] })
      MyAccount.prototype.fetchBibItemData = jest
        .fn()
        .mockResolvedValueOnce({
          bibEntries: checkoutBibs.entries,
          itemVarFieldsMap: {},
        })
        .mockResolvedValueOnce({
          bibEntries: holdBibs.entries,
          itemVarFieldsMap: {},
        })
      const patronWithFails = await MyAccountFactory("123", {})
      expect(patronWithFails.holds).toBeNull()
      expect(patronWithFails.checkouts).not.toHaveLength(0)
      expect(patronWithFails.fines.total).toEqual(0)
      expect(patronWithFails.patron.name).toEqual("Strega Nonna")
    })
    it("will return other processed data if an error is thrown", async () => {
      MyAccount.prototype.fetchCheckouts = async () =>
        Promise.resolve(checkouts)
      MyAccount.prototype.fetchHolds = async () => Promise.resolve(holds)
      MyAccount.prototype.fetchPatron = async () => Promise.resolve(patron)
      MyAccount.prototype.fetchFines = async () => ({ total: 0, entries: [] })
      MyAccount.prototype.fetchBibItemData = jest
        .fn()
        .mockImplementationOnce(() => {
          throw new Error("spahget")
        })
        .mockResolvedValueOnce({
          bibEntries: holdBibs.entries,
          itemVarFieldsMap: {},
        })
      const patronWithFails = await MyAccountFactory("123", {})
      expect(patronWithFails.checkouts).toBe(null)
      expect(patronWithFails.holds).not.toHaveLength(0)
      expect(patronWithFails.fines.total).toEqual(0)
      expect(patronWithFails.patron.name).toEqual("Strega Nonna")
    })
  })
  describe("fetchBibItemData", () => {
    it("can handle bib level holds with no item level holds", async () => {
      const account = new MyAccount({ get: () => "spaghetti" }, "1234567")
      const bibHolds = holds.entries.filter((hold) => !hold.record.bibIds)
      const processedBibHolds = await account.fetchBibItemData(
        bibHolds as SierraHold[],
        "record"
      )
      expect(processedBibHolds).toStrictEqual({
        bibEntries: bibHolds.map((hold) => hold.record),
        itemVarFieldsMap: {},
      })
    })
    it("requests bib and item info for item level holds", async () => {
      const fetchSpy = jest.fn().mockResolvedValue({ entries: [{ id: "123" }] })
      const account = new MyAccount({ get: fetchSpy }, "1234567")

      await account.fetchBibItemData(holds.entries as SierraHold[], "record")

      expect(fetchSpy).toHaveBeenCalledTimes(2)
    })
  })
  describe("item-level volume appending", () => {
    it("fetches item data and adds volume to title", async () => {
      const itemLevelCheckout = [
        {
          id: "checkout123",
          item: {
            id: "item123",
            bibIds: ["bib123"],
            callNumber: "QA123",
            barcode: "barcode123",
          },
          numberOfRenewals: 0,
          patron: "patron123",
          dueDate: "2025-12-08",
        },
      ]

      const account = new MyAccount({ get: jest.fn() }, "patron123")

      account.fetchBibItemData = jest.fn().mockResolvedValue({
        bibEntries: [{ id: "bib123", title: "Test Book", varFields: [] }],
        itemVarFieldsMap: {
          item123: [{ fieldTag: "v", content: "v.1" }],
        },
      })

      account.fetchCheckouts = jest.fn().mockResolvedValue({
        entries: itemLevelCheckout,
      })
      const checkouts = await account.getCheckouts()

      expect(checkouts[0].title).toBe("Test Book v.1")
      expect(account.fetchBibItemData).toHaveBeenCalledWith(
        itemLevelCheckout,
        "item"
      )
    })
  })
})
