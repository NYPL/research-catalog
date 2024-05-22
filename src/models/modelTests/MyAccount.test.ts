import { filteredPickupLocations } from "../../../__test__/fixtures/processedMyAccountData"
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
  afterAll(() => (MyAccount.prototype.fetchBibData = fetchBibs))
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
      expect(processedCheckouts).toStrictEqual([
        {
          id: "65060571",
          callNumber: "972.93 D",
          barcode: "33333432264691",
          dueDate: "February 9, 2024",
          patron: "2772226",
          title: "The Dominican Republic reader : history, culture, politics",
          isResearch: false,
          bibId: "21678146",
          isNyplOwned: true,
          catalogHref: "https://borrow.nypl.org/search/card?recordId=21678146",
        },
        {
          id: "65060570",
          callNumber: "Spa FIC ALVAREZ",
          barcode: "33333455520789",
          dueDate: "February 9, 2024",
          patron: "2772226",
          title: "En el tiempo de las mariposas",
          isResearch: false,
          bibId: "17699134",
          isNyplOwned: true,
          catalogHref: "https://borrow.nypl.org/search/card?recordId=17699134",
        },
      ])
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
      expect(processedHolds).toStrictEqual([
        {
          patron: "2772226",
          id: "48636910",
          pickupByDate: "February 15, 2024",
          canFreeze: false,
          frozen: false,
          status: "READY FOR PICKUP",
          pickupLocation: { code: "sn", name: "SNFL (formerly Mid-Manhattan)" },
          title:
            "Quit like a woman : the radical choice to not drink in a culture obsessed with alcohol",
          isResearch: false,
          bibId: "22002760",
          isNyplOwned: true,
          catalogHref: "https://borrow.nypl.org/search/card?recordId=22002760",
        },
        {
          bibId: "21317166",
          canFreeze: false,
          catalogHref: "https://borrow.nypl.org/search/card?recordId=21317166",
          frozen: false,
          id: "42273371",
          isNyplOwned: true,
          isResearch: false,
          patron: "2772226",
          pickupByDate: null,
          pickupLocation: {
            code: "mp",
            name: "Morris Park",
          },
          status: "REQUEST PENDING",
          title: "2017 Tony Award Season.",
        },
      ])
    })
    it("can return fines", async () => {
      const mockSierraClient = {
        get: async (path) => Promise.resolve(fines),
      }
      const fetcher = new MyAccount(mockSierraClient, "12345")
      const processedFines = await fetcher.getFines()
      expect(processedFines).toStrictEqual({
        total: 14.99,
        entries: [
          {
            detail: "Replacement",
            amount: 14.99,
            date: "June 15, 2023",
          },
        ],
      })
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
      expect(account.patron).toStrictEqual({
        notificationPreference: "Email",
        name: "Strega Nonna",
        barcode: "23333121538324",
        formattedBarcode: "2 3333 12153 8324",
        expirationDate: "March 27, 2025",
        emails: ["streganonna@gmail.com", "spaghettigrandma@gmail.com"],
        phones: [
          {
            number: "123-456-7890",
            type: "t",
          },
        ],
        homeLibrary: {
          code: "sn",
          name: "Stavros Niarchos Foundation Library (SNFL)",
        },
        id: 2772226,
      })
      expect(account.holds).toStrictEqual([
        {
          patron: "2772226",
          id: "48636910",
          pickupByDate: "February 15, 2024",
          canFreeze: false,
          frozen: false,
          status: "READY FOR PICKUP",
          pickupLocation: {
            code: "sn",
            name: "SNFL (formerly Mid-Manhattan)",
          },
          title:
            "Quit like a woman : the radical choice to not drink in a culture obsessed with alcohol",
          isResearch: false,
          bibId: "22002760",
          isNyplOwned: true,
          catalogHref: "https://borrow.nypl.org/search/card?recordId=22002760",
        },
        {
          bibId: "21317166",
          canFreeze: false,
          catalogHref: "https://borrow.nypl.org/search/card?recordId=21317166",
          frozen: false,
          id: "42273371",
          isNyplOwned: true,
          isResearch: false,
          patron: "2772226",
          pickupByDate: null,
          pickupLocation: {
            code: "mp",
            name: "Morris Park",
          },
          status: "REQUEST PENDING",
          title: "2017 Tony Award Season.",
        },
      ])
      expect(account.checkouts).toStrictEqual([
        {
          id: "65060571",
          callNumber: "972.93 D",
          barcode: "33333432264691",
          dueDate: "February 9, 2024",
          patron: "2772226",
          title: "The Dominican Republic reader : history, culture, politics",
          isResearch: false,
          bibId: "21678146",
          isNyplOwned: true,
          catalogHref: "https://borrow.nypl.org/search/card?recordId=21678146",
        },
        {
          id: "65060570",
          callNumber: "Spa FIC ALVAREZ",
          barcode: "33333455520789",
          dueDate: "February 9, 2024",
          patron: "2772226",
          title: "En el tiempo de las mariposas",
          isResearch: false,
          bibId: "17699134",
          isNyplOwned: true,
          catalogHref: "https://borrow.nypl.org/search/card?recordId=17699134",
        },
      ])
      expect(account.fines).toStrictEqual({
        total: 14.99,
        entries: [
          {
            detail: "Replacement",
            amount: 14.99,
            date: "June 15, 2023",
          },
        ],
      })
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
      expect(emptyAccount.patron).toStrictEqual({
        notificationPreference: "Email",
        name: "Strega Nonna",
        barcode: "23333121538324",
        formattedBarcode: "2 3333 12153 8324",
        expirationDate: "March 27, 2025",
        emails: [],
        phones: [],
        homeLibrary: {
          code: "sn",
          name: "Stavros Niarchos Foundation Library (SNFL)",
        },
        id: 2772226,
      })
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
      expect(patronWithFails.patron.name).toEqual("Strega Nonna")
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
      expect(patronWithFails.patron.name).toEqual("Strega Nonna")
    })
  })
})
