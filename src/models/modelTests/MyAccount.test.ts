import MyAccount from "../MyAccount"
import {
  holds,
  checkouts,
  patron,
  holdBibs,
  checkoutBibs,
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
  it.todo("can handle all empty data")
  it.only("builds Account data model", () => {
    const getStub = sinon
      .stub()
      .onCall(0)
      .resolves(checkouts)
      .onCall(1)
      .resolves(holds)
      .onCall(2)
      .resolves(patron)
      .onCall(3)
      .resolves({ total: 0, entries: [] })
      .onCall(4)
      .resolves(checkoutBibs)
      .onCall(5)
      .resolves(holdBibs)

    const mockSierraClient = sinon.stub(sierraClient, "sierraClient").resolves({
      get: getStub,
    })
    const account = MyAccount.MyAccountFactory({
      holds: holds.entries,
      patron,
      checkouts: checkouts.entries,
      fines: { total: 0, entries: [] },
    })
  })
})
