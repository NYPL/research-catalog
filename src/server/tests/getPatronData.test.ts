import { extractNoticePreference, getPatronData } from "../getPatronData"

jest.mock("../nyplApiClient", () => {
  return async () => {
    return await new Promise((resolve) => {
      resolve({
        get: () => {
          return new Promise((resolve) => {
            resolve({
              data: {
                id: "123",
                names: ["John Doe"],
                emails: ["test@test.org"],
                moneyOwed: 0,
                homeLibraryCode: "eb",
                patronType: "7",
                expirationDate: "12/12/2034",
                phones: ["718-123-4567"],
                barCodes: ["123456789"],
                fixedFields: {
                  "268": {
                    label: "NOTICE PREFERENCE",
                    value: "z",
                  },
                },
              },
            })
          })
        },
      })
    })
  }
})

describe("extractNoticePreference", () => {
  it('should return "None" if fixedFields is empty', () => {
    expect(extractNoticePreference()).toEqual("None")
  })
  it('should return "None" if fixedFields does not have a "268" field', () => {
    expect(extractNoticePreference({ "123": "nonsense" })).toEqual("None")
  })
  it('should return "Email" if "268" field value is "z"', () => {
    expect(extractNoticePreference({ "268": { value: "z" } })).toEqual("Email")
  })
  it('should return "Telephone" if "268" field value is "p"', () => {
    expect(extractNoticePreference({ "268": { value: "p" } })).toEqual(
      "Telephone"
    )
  })
  it('should return "None" if "268" field value is "-"', () => {
    expect(extractNoticePreference({ "268": { value: "-" } })).toEqual("None")
  })
})

describe("getPatronData", () => {
  it("should return a patron object with loggedIn false if isTokenValid is false", async () => {
    const patron = await getPatronData({ isTokenValid: false, userId: null })

    expect(patron.id).toEqual("")
    expect(patron.names).toEqual([])
    expect(patron.barcodes).toEqual([])
    expect(patron.emails).toEqual([])
    expect(patron.loggedIn).toEqual(false)
  })
  it("should return a patron object with loggedIn false if userId is not provided", async () => {
    const patron = await getPatronData({ isTokenValid: true, userId: null })

    expect(patron.id).toEqual("")
    expect(patron.names).toEqual([])
    expect(patron.barcodes).toEqual([])
    expect(patron.emails).toEqual([])
    expect(patron.loggedIn).toEqual(false)
  })
  it("should return a patron object from Platform API when isTokenValid is true and userId is provided", async () => {
    const patron = await getPatronData({ isTokenValid: true, userId: "123" })

    expect(patron.id).toEqual("123")
    expect(patron.names).toEqual(["John Doe"])
    expect(patron.barcodes).toEqual(["123456789"])
    expect(patron.emails).toEqual(["test@test.org"])
    expect(patron.loggedIn).toEqual(true)
    expect(patron.moneyOwed).toEqual(0)
    expect(patron.homeLibraryCode).toEqual("eb")
    expect(patron.patronType).toEqual("7")
    expect(patron.expirationDate).toEqual("12/12/2034")
    expect(patron.phones).toEqual(["718-123-4567"])
    expect(patron.noticePreference).toEqual("Email")
  })
})
