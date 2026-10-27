import {
  emptyPatron,
  processedCheckouts,
  processedFines,
  processedHolds,
  processedPatron,
} from "../../../__test__/fixtures/processedMyAccountData"
import MyAccount, { MyAccountFactory } from "../MyAccount"
import {
  patron,
  fines,
  empty,
} from "../../../__test__/fixtures/rawSierraAccountData"
import {
  listsResponse,
  processedLists,
} from "../../../__test__/fixtures/listFixtures"
import type { Hold } from "../../types/myAccountTypes"
import { fetchLists } from "../../server/api/lists"
import { holds, checkouts } from "../../../__test__/fixtures/patronServicesData"
jest.mock("../../server/api/lists")

describe("MyAccountModel", () => {
  describe("fetchWithRetries", () => {
    it("returns response on first successful attempt", async () => {
      const mockGet = jest.fn().mockResolvedValue({ entries: [] })
      const fetcher = new MyAccount({
        patronId: "aaaaa",
        sierraClient: { get: mockGet },
      })
      const result = await fetcher.fetchWithRetries(
        "sierra",
        "a/fake/path",
        "operation"
      )
      expect(result).toStrictEqual({ entries: [] })
      expect(mockGet).toHaveBeenCalledTimes(1)
    })

    it("retries after a failure and returns the response on a later success", async () => {
      const mockGet = jest
        .fn()
        .mockRejectedValueOnce(new Error("fail"))
        .mockResolvedValueOnce({ entries: [] })
      const fetcher = new MyAccount({
        patronId: "aaaaa",
        sierraClient: { get: mockGet },
      })
      const result = await fetcher.fetchWithRetries(
        "sierra",
        "a/fake/path",
        "operation"
      )
      expect(result).toStrictEqual({ entries: [] })
      expect(mockGet).toHaveBeenCalledTimes(2)
    })

    it("throws error after exhausting retries", async () => {
      const mockGet = jest.fn().mockRejectedValue(new Error("always fails"))
      const fetcher = new MyAccount({
        patronId: "aaaaa",
        sierraClient: { get: mockGet },
      })
      await expect(
        fetcher.fetchWithRetries("sierra", "a/fake/path", "operation", 3)
      ).rejects.toThrow("MyAccount#operation error: ")
      expect(mockGet).toHaveBeenCalledTimes(4)
    })

    it("respects custom retries count", async () => {
      const mockGet = jest.fn().mockRejectedValue(new Error("always fails"))
      const fetcher = new MyAccount({
        patronId: "aaaaa",
        sierraClient: { get: mockGet },
      })
      await expect(
        fetcher.fetchWithRetries("sierra", "a/fake/path", "operation", 0)
      ).rejects.toThrow()
      expect(mockGet).toHaveBeenCalledTimes(1)
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
      const mockPlatformClient = {
        get: async () => Promise.resolve(checkouts),
      }
      const fetcher = new MyAccount({
        platformClient: mockPlatformClient,
        patronId: "6742743",
      })
      const processedCheckoutsToTest = await fetcher.getCheckouts()
      expect(processedCheckoutsToTest).toStrictEqual(processedCheckouts)
    })
    it("can return holds", async () => {
      const mockPlatformClient = {
        get: async () => Promise.resolve(holds),
      }
      const fetcher = new MyAccount({
        platformClient: mockPlatformClient,
        patronId: "6742743",
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
      const account = await MyAccountFactory({ patronId: "6742743" })
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

      const emptyAccount = await MyAccountFactory({ patronId: "6742743" })
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
      MyAccount.prototype.fetchCheckouts = jest.fn().mockRejectedValue({})
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
