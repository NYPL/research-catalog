import MyAccount, { MyAccountFactory } from "../MyAccount"
import {
  holds,
  checkouts,
  patron,
  fines,
  holdBibs,
  checkoutBibs,
  empty,
} from "../../../__test__/fixtures/processedMyAccountData"

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
        notificationPreference: "Email",
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
          catalogHref:
            "https://nypl.na2.iiivega.com/search/card?recordId=22002760",
        },
        {
          patron: "2772226",
          id: "42273371",
          pickupByDate: null,
          canFreeze: false,
          frozen: false,
          status: "REQUEST PENDING",
          pickupLocation: { code: "mp", name: "Morris Park" },
          title: "2017 Tony Award Season.",
          isResearch: false,
          bibId: "21317166",
          isNyplOwned: true,
          catalogHref:
            "https://nypl.na2.iiivega.com/search/card?recordId=21317166",
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
          catalogHref:
            "https://nypl.na2.iiivega.com/search/card?recordId=21678146",
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
          catalogHref:
            "https://nypl.na2.iiivega.com/search/card?recordId=17699134",
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
      MyAccount.fetchCheckouts = async () => empty
      MyAccount.fetchHolds = async () => empty
      MyAccount.fetchPatron = async () => ({
        ...patron,
        fixedFields: {
          "268": { label: "notification preference", value: "-" },
        },
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
        notificationPreference: null,
      })
      expect(emptyAccount.checkouts).toStrictEqual([])
      expect(emptyAccount.holds).toStrictEqual([])
      expect(emptyAccount.fines).toStrictEqual({ total: 0, entries: [] })
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
})
