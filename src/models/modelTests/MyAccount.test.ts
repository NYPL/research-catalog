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
import {
  listsResponse,
  processedLists,
} from "../../../__test__/fixtures/listFixtures"
import type { Hold } from "../../types/myAccountTypes"
import { fetchLists } from "../../server/api/lists"
jest.mock("../../server/api/lists")

describe("MyAccountModel", () => {
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
      const fetcher = new MyAccount({
        sierraClient: mockSierraClient,
        patronId: "12345",
      })
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
      const fetcher = new MyAccount({
        sierraClient: mockSierraClient,
        patronId: "12345",
      })
      const processedHoldsToTest = await fetcher.getHolds()
      expect(processedHoldsToTest).toStrictEqual(processedHolds)
    })
    it("can return fines", async () => {
      const mockSierraClient = {
        get: async () => Promise.resolve(fines),
      }
      const fetcher = new MyAccount({
        sierraClient: mockSierraClient,
        patronId: "12345",
      })
      const processedFinesToTest = await fetcher.getFines()
      expect(processedFinesToTest).toStrictEqual(processedFines)
    })
    it("can return lists", async () => {
      ;(fetchLists as jest.Mock).mockResolvedValue({ lists: listsResponse })
      const fetcher = new MyAccount({
        patronId: "12345",
      })
      const processedListsToTest = await fetcher.getLists("12345")
      expect(processedListsToTest).toStrictEqual(processedLists)
      expect(fetchLists).toHaveBeenCalledWith({ patronId: "12345" })
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
      MyAccount.prototype.getLists = async () => Promise.resolve(processedLists)
      // passing in an empty object for a mock sierra client triggers a type error. ignore because we are
      // mocking the fetch calls.
      // @ts-ignore
      const account = await MyAccountFactory({ patronId: "12345" })
      expect(account.patron).toStrictEqual(processedPatron)
      expect(account.holds).toStrictEqual(processedHolds)
      expect(account.checkouts).toStrictEqual(processedCheckouts)
      expect(account.fines).toStrictEqual(processedFines)
      expect(account.lists).toStrictEqual(processedLists)
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
      MyAccount.prototype.getLists = async () => []

      const emptyAccount = await MyAccountFactory({ patronId: "12345" })
      expect(emptyAccount.patron).toStrictEqual(emptyPatron)
      expect(emptyAccount.checkouts).toStrictEqual([])
      expect(emptyAccount.holds).toStrictEqual([])
      expect(emptyAccount.fines).toStrictEqual({ total: 0, entries: [] })
      expect(emptyAccount.lists).toStrictEqual([])
    })
    it("will return other processed data if one fetch fails", async () => {
      MyAccount.prototype.fetchCheckouts = async () =>
        Promise.resolve(checkouts)
      MyAccount.prototype.fetchHolds = jest.fn().mockRejectedValue({})
      MyAccount.prototype.fetchPatron = async () => Promise.resolve(patron)
      MyAccount.prototype.fetchFines = async () => ({ total: 0, entries: [] })
      MyAccount.prototype.getLists = async () => Promise.resolve(processedLists)

      const patronWithFails = await MyAccountFactory({ patronId: "123" })
      expect(patronWithFails.holds).toBeNull()
      expect(patronWithFails.checkouts).not.toHaveLength(0)
      expect(patronWithFails.fines.total).toEqual(0)
      expect(patronWithFails.patron.name).toEqual("Strega Nonna")
      expect(patronWithFails.lists).toStrictEqual(processedLists)
    })
    it("will return other processed data if an error is thrown", async () => {
      MyAccount.prototype.fetchCheckouts = async () =>
        Promise.resolve(checkouts)
      MyAccount.prototype.fetchHolds = async () => Promise.resolve(holds)
      MyAccount.prototype.fetchPatron = async () => Promise.resolve(patron)
      MyAccount.prototype.fetchFines = async () => ({ total: 0, entries: [] })
      MyAccount.prototype.getLists = async () => Promise.resolve(processedLists)

      const patronWithFails = await MyAccountFactory({ patronId: "123" })
      expect(patronWithFails.checkouts).toBe(null)
      expect(patronWithFails.holds).not.toHaveLength(0)
      expect(patronWithFails.fines.total).toEqual(0)
      expect(patronWithFails.patron.name).toEqual("Strega Nonna")
      expect(patronWithFails.lists).toStrictEqual(processedLists)
    })
  })
})
