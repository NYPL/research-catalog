import MyAccount from "../MyAccount"
import {
  holds as mockHolds,
  checkouts as mockCheckouts,
  patron as mockPatron,
  fines as mockFines,
  holdBibs as mockHoldBibs,
  checkoutBibs as mockCheckoutBibs,
  empty as mockEmpty,
} from "./data/MyAccount"

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
  describe("getStatus", () => {
    it("returns REQUEST PLACED instead of AVAILABLE", () => {
      expect(MyAccount.getStatus({ code: "status:a", name: "AVAILABLE" })).toBe(
        "REQUEST PLACED"
      )
    })
    it("returns READY FOR PICKUP instead of READY SOON", () => {
      expect(
        MyAccount.getStatus({ code: "spaghetti", name: "READY SOON" })
      ).toBe("READY FOR PICKUP")
    })
  })
  describe("building model", () => {
    it("builds Account data model", async () => {
      MyAccount.fetchCheckouts = async () => mockCheckouts
      MyAccount.fetchHolds = async () => mockHolds
      MyAccount.fetchPatron = async () => mockPatron
      MyAccount.fetchFines = async () => mockFines
      MyAccount.fetchBibData = async (entries, recordType) => {
        if (recordType === "item") {
          return mockCheckoutBibs
        } else return mockHoldBibs
      }
      const account = await MyAccount.MyAccountFactory("12345")
      expect(account.patron).toStrictEqual({
        name: "KAHN, VERA RUTH",
        barcode: "23333121538324",
        expirationDate: "2025-03-28",
        primaryEmail: "veraruthkahn@gmail.com",
        emails: ["veraruthkahn@gmail.com", "veggievera@gmail.com"],
        primaryPhone: "646-660-0432",
        phones: [
          {
            number: "646-660-0432",
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
    it("builds empty Account data model", async () => {
      MyAccount.fetchCheckouts = async () => mockEmpty
      MyAccount.fetchHolds = async () => mockEmpty
      MyAccount.fetchPatron = async () => mockPatron
      MyAccount.fetchFines = async () => ({ total: 0, entries: [] })
      MyAccount.fetchBibData = async () => mockEmpty

      const emptyAccount = await MyAccount.MyAccountFactory("12345")
      expect(emptyAccount.patron).toStrictEqual({
        name: "KAHN, VERA RUTH",
        barcode: "23333121538324",
        expirationDate: "2025-03-28",
        primaryEmail: "veraruthkahn@gmail.com",
        emails: ["veraruthkahn@gmail.com", "veggievera@gmail.com"],
        primaryPhone: "646-660-0432",
        phones: [
          {
            number: "646-660-0432",
            type: "t",
          },
        ],
        homeLibrary: "Stavros Niarchos Foundation Library (SNFL)",
        id: 2772226,
      })
      expect(emptyAccount.checkouts).toStrictEqual([])
      expect(emptyAccount.holds).toStrictEqual([])
      expect(emptyAccount.fines).toStrictEqual({ total: 0, entries: [] })
    })
  })
})
