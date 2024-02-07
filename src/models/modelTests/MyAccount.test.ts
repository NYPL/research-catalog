import MyAccount from "../MyAccount"

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
  it.todo("builds Account data model")
})
