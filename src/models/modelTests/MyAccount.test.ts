import MyAccount, { MyAccountFactory } from "../MyAccount"
import {
  holds,
  checkouts,
  patron,
  fines,
  holdBibs,
  checkoutBibs,
  empty,
} from "./data/MyAccount"

jest.mock("../../server/sierraClient")

describe("MyAccountModel", () => {
  const fetchBibs = MyAccount.fetchBibData
  afterAll(() => (MyAccount.fetchBibData = fetchBibs))
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
    it("returns the status as given when it's user-friendly", () => {
      expect(
        MyAccount.getHoldStatus({
          code: "i",
          name: "Requested item ready for pickup.",
        })
      ).toBe("Requested item ready for pickup.")
    })
    it("returns REQUEST PLACED instead of AVAILABLE", () => {
      expect(
        MyAccount.getHoldStatus({ code: "status:a", name: "AVAILABLE" })
      ).toBe("REQUEST PLACED")
    })
    it("returns READY FOR PICKUP instead of READY SOON", () => {
      expect(
        MyAccount.getHoldStatus({ code: "spaghetti", name: "READY SOON" })
      ).toBe("READY FOR PICKUP")
    })
  })
  describe("building model", () => {
    it("builds Account data model", async () => {
      MyAccount.fetchCheckouts = async () => checkouts
      MyAccount.fetchHolds = async () => holds
      MyAccount.fetchPatron = async () => patron
      MyAccount.fetchFines = async () => fines
      MyAccount.fetchBibData = async (entries, recordType) => {
        if (recordType === "item") {
          return checkoutBibs
        } else return holdBibs
      }
      const account = await MyAccountFactory("12345")
      expect(account.patron).toStrictEqual({
        name: "NONNA, STREGA",
        barcode: "23333121538324",
        expirationDate: "2025-03-28",
        primaryEmail: "streganonna@gmail.com",
        emails: ["streganonna@gmail.com", "spaghettigrandma@gmail.com"],
        primaryPhone: "123-456-7890",
        phones: [
          {
            number: "123-456-7890",
            type: "t",
          },
        ],
        homeLibrary: "Stavros Niarchos Foundation Library (SNFL)",
        id: 2772226,
      })
      expect(account.holds).toStrictEqual([
        {
          patron: "2772226",
          id: "48636910",
          pickupByDate: "2024-02-15T09:00:00Z",
          canFreeze: false,
          frozen: false,
          status: "Requested item ready for pickup.",
          pickupLocation: "SNFL (formerly Mid-Manhattan)",
          title:
            "Quit like a woman : the radical choice to not drink in a culture obsessed with alcohol",
          isResearch: false,
          bibId: "22002760",
          isNyplOwned: false,
        },
      ])
      expect(account.checkouts).toStrictEqual([
        {
          id: "65060571",
          callNumber: "972.93 D",
          barcode: "33333432264691",
          dueDate: "2024-02-09T09:00:00Z",
          patron: "2772226",
          title: "The Dominican Republic reader : history, culture, politics",
          isResearch: false,
          bibId: "21678146",
          isNyplOwned: true,
        },
        {
          id: "65060570",
          callNumber: "Spa FIC ALVAREZ",
          barcode: "33333455520789",
          dueDate: "2024-02-09T09:00:00Z",
          patron: "2772226",
          title: "En el tiempo de las mariposas",
          isResearch: false,
          bibId: "17699134",
          isNyplOwned: true,
        },
      ])
      expect(account.fines).toStrictEqual({
        total: 14.99,
        entries: [
          {
            detail: "Replacement",
            amount: 14.99,
            date: "2023-06-15T17:34:46Z",
          },
        ],
      })
    })
    it("builds empty Account data model with empty phones and email", async () => {
      MyAccount.fetchCheckouts = async () => empty
      MyAccount.fetchHolds = async () => empty
      MyAccount.fetchPatron = async () => ({
        ...patron,
        phones: [],
        emails: [],
      })
      MyAccount.fetchFines = async () => ({ total: 0, entries: [] })
      MyAccount.fetchBibData = async () => ({ total: 0, entries: [] })

      const emptyAccount = await MyAccountFactory("12345")
      expect(emptyAccount.patron).toStrictEqual({
        name: "NONNA, STREGA",
        barcode: "23333121538324",
        expirationDate: "2025-03-28",
        primaryEmail: "",
        emails: [],
        primaryPhone: "",
        phones: [],
        homeLibrary: "Stavros Niarchos Foundation Library (SNFL)",
        id: 2772226,
      })
      expect(emptyAccount.checkouts).toStrictEqual([])
      expect(emptyAccount.holds).toStrictEqual([])
      expect(emptyAccount.fines).toStrictEqual({ total: 0, entries: [] })
    })
    it("builds empty Account data model with empty phones and email", async () => {
      MyAccount.fetchCheckouts = async () => empty
      MyAccount.fetchHolds = async () => empty
      MyAccount.fetchPatron = async () => ({
        ...patron,
        phones: undefined,
        emails: undefined,
        homeLibrary: undefined,
      })
      MyAccount.fetchFines = async () => empty
      MyAccount.fetchBibData = async () => empty

      const emptyAccount = await MyAccountFactory("12345")
      expect(emptyAccount.patron).toStrictEqual({
        name: "NONNA, STREGA",
        barcode: "23333121538324",
        expirationDate: "2025-03-28",
        primaryEmail: "",
        emails: [],
        primaryPhone: "",
        phones: [],
        homeLibrary: "",
        id: 2772226,
      })
    })
  })
})
