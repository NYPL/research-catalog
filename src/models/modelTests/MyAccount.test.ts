import MyAccount from "../MyAccount"
import {
  holds,
  checkouts,
  patron,
  fines,
  holdBibs,
  checkoutBibs,
  empty,
} from "./data/MyAccount"
import * as sierraClient from "../../server/sierraClient"

import sinon from "sinon"

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
  it("builds Account data model", async () => {
    const getStub = sinon
      .stub()
      .onCall(0)
      .resolves(checkouts)
      .onCall(1)
      .resolves(holds)
      .onCall(2)
      .resolves(patron)
      .onCall(3)
      .resolves(fines)
      .onCall(4)
      .resolves(checkoutBibs)
      .onCall(5)
      .resolves(holdBibs)

    const mockSierraClient = sinon.stub(sierraClient, "sierraClient").resolves({
      get: getStub,
    })
    const account = await MyAccount.MyAccountFactory({
      holds: holds.entries,
      patron,
      checkouts: checkouts.entries,
      fines: { total: 0, entries: [] },
    })
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
      total: 1,
      entries: [
        {
          detail: "Replacement",
          amount: 14.99,
          date: "2023-06-15T17:34:46Z",
        },
      ],
    })
  })
  it("builds empty Account model", async () => {
    const getStub = sinon
      .stub()
      .onCall(0)
      .resolves(empty)
      .onCall(1)
      .resolves(empty)
      .onCall(2)
      .resolves(patron)
      .onCall(3)
      .resolves({ total: 0, entries: [] })
      .onCall(4)
      .resolves(empty)
      .onCall(5)
      .resolves(empty)

    const mockSierraClient = sinon.stub(sierraClient, "sierraClient").resolves({
      get: getStub,
    })
    const emptyAccount = await MyAccount.MyAccountFactory({
      holds: holds.entries,
      patron,
      checkouts: checkouts.entries,
      fines: { total: 0, entries: [] },
    })
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
  it.todo("handles expired patron")
  it.todo("handles patron with fines")
})
