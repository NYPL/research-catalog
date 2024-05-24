import {
  emptyPatron,
  processedCheckouts,
  processedFines,
  processedHolds,
  processedPatron,
} from "../../../__test__/fixtures/processedMyAccountData"
import { filteredPickupLocations } from "../../utils/myAccountUtils"
import MyAccount, {
  MyAccountFactory,
  filterPickupLocations,
} from "../MyAccount"
import {
  pickupLocations,
  holds,
  checkouts,
  patron,
  fines,
  holdBibs,
  checkoutBibs,
  empty,
} from "../../../__test__/fixtures/rawSierraAccountData"

describe("MyAccountModel", () => {
  const fetchBibs = MyAccount.prototype.fetchBibData
  afterAll(() => {
    MyAccount.prototype.fetchBibData = fetchBibs
  })

  describe("fetchPickupLocations", () => {
    it("filters out closed and research branches", () => {
      expect(filterPickupLocations(pickupLocations)).toStrictEqual(
        filteredPickupLocations
      )
    })
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
          }
        },
      }
      const fetcher = new MyAccount(mockSierraClient, "12345")
      const processedCheckouts = await fetcher.getCheckouts()
      expect(processedCheckouts).toStrictEqual(processedCheckouts)
    })
    it("can return holds", async () => {
      const mockSierraClient = {
        get: async (path) => {
          if (path.includes("holds")) {
            return Promise.resolve(holds)
          } else if (path.includes("bibs")) {
            return Promise.resolve(holdBibs)
          }
        },
      }
      const fetcher = new MyAccount(mockSierraClient, "12345")
      const processedHolds = await fetcher.getHolds()
      expect(processedHolds).toStrictEqual(processedHolds)
    })
    it("can return fines", async () => {
      const mockSierraClient = {
        get: async (path) => Promise.resolve(fines),
      }
      const fetcher = new MyAccount(mockSierraClient, "12345")
      const processedFines = await fetcher.getFines()
      expect(processedFines).toStrictEqual(processedFines)
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
    it("builds Account data model", async () => {
      MyAccount.prototype.fetchCheckouts = async () =>
        Promise.resolve(checkouts)
      MyAccount.prototype.fetchHolds = async () => Promise.resolve(holds)
      MyAccount.prototype.fetchPatron = async () => Promise.resolve(patron)
      MyAccount.prototype.fetchFines = async () => Promise.resolve(fines)
      MyAccount.prototype.fetchBibData = jest
        .fn()
        .mockResolvedValueOnce(checkoutBibs)
        .mockResolvedValueOnce(holdBibs)
      // passing in an empty object for a mock sierra client triggers a type error. ignore because we are
      // mocking the fetch calls.
      // @ts-ignore
      const account = await MyAccountFactory("12345", {})
      expect(account.patron).toStrictEqual(processedPatron)
      expect(account.holds).toStrictEqual(processedHolds)
      expect(account.checkouts).toStrictEqual(processedCheckouts)
      expect(account.fines).toStrictEqual(processedFines)
    })
    it("builds empty Account data model with empty phones and email", async () => {
      MyAccount.prototype.fetchCheckouts = async () => empty
      MyAccount.prototype.fetchHolds = async () => empty
      MyAccount.prototype.fetchPatron = async () => ({
        ...patron,
        phones: [],
        emails: [],
      })
      MyAccount.prototype.fetchFines = async () => ({ total: 0, entries: [] })
      MyAccount.prototype.fetchBibData = async () => ({ total: 0, entries: [] })

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
      MyAccount.prototype.fetchBibData = jest
        .fn()
        .mockResolvedValueOnce(checkoutBibs)
        .mockResolvedValueOnce(holdBibs)
      const patronWithFails = await MyAccountFactory("123", {})
      expect(patronWithFails.holds).toBeNull()
      expect(patronWithFails.checkouts).not.toHaveLength(0)
      expect(patronWithFails.fines.total).toEqual(0)
      expect(patronWithFails.patron.name).toEqual("NONNA, STREGA")
    })
    it("will return other processed data if an error is thrown", async () => {
      MyAccount.prototype.fetchCheckouts = async () =>
        Promise.resolve(checkouts)
      MyAccount.prototype.fetchHolds = async () => Promise.resolve(holds)
      MyAccount.prototype.fetchPatron = async () => Promise.resolve(patron)
      MyAccount.prototype.fetchFines = async () => ({ total: 0, entries: [] })
      MyAccount.prototype.fetchBibData = jest
        .fn()
        .mockImplementationOnce(() => {
          throw new Error("spahget")
        })
        .mockResolvedValueOnce(holdBibs)
      const patronWithFails = await MyAccountFactory("123", {})
      expect(patronWithFails.checkouts).toBe(null)
      expect(patronWithFails.holds).not.toHaveLength(0)
      expect(patronWithFails.fines.total).toEqual(0)
      expect(patronWithFails.patron.name).toEqual("NONNA, STREGA")
    })
  })
})
