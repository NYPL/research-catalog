import { formatPatronName, formatDate, buildPatron } from "../myAccountUtils"
import type { SierraPatron } from "../../types/myAccountTypes"

describe("myAccountUtils", () => {
  describe("formatPatronName", () => {
    it("returns an empty string if no name is provided", () => {
      expect(formatPatronName()).toBe("")
      expect(formatPatronName("")).toBe("")
    })

    it("returns the original string if no comma is present", () => {
      expect(formatPatronName("Zendaya")).toBe("Zendaya")
    })

    it("formats 'LASTNAME, FIRSTNAME' to 'Firstname Lastname'", () => {
      expect(formatPatronName("NONNA, STREGA")).toBe("Strega Nonna")
    })

    it("handles multiple names correctly", () => {
      expect(formatPatronName("SMITH, JOHN DOE")).toBe("John Doe Smith")
    })
  })

  describe("formatDate", () => {
    it("returns null if no date is provided", () => {
      expect(formatDate("")).toBeNull()
    })

    it("formats YYYY-MM-DD correctly without timezone shifting", () => {
      expect(formatDate("2026-05-01")).toBe("May 1, 2026")
      expect(formatDate("2026-06-01")).toBe("June 1, 2026")
    })

    it("formats full ISO strings correctly", () => {
      expect(formatDate("2026-04-15T15:26:18.209Z")).toBe("April 15, 2026")
    })
  })

  describe("buildPatron", () => {
    it("constructs a Patron object from SierraPatron data", () => {
      const sierraPatron: SierraPatron = {
        id: 12345,
        names: ["NONNA, STREGA"],
        barcodes: ["23333121538324"],
        expirationDate: "2025-03-28",
        emails: ["streganonna@gmail.com", "spaghettigrandma@gmail.com"],
        homeLibrary: { code: "sn   ", name: "SNFL (formerly Mid-Manhattan)" },
        phones: [{ number: "123-456-7890", type: "t" }],
        varFields: [{ fieldTag: "u", content: "pastadisciple" }],
        fixedFields: {
          "268": { label: "notification preference", value: "z" },
        },
      }

      expect(buildPatron(sierraPatron)).toEqual({
        notificationPreference: "z",
        username: "pastadisciple",
        name: "Strega Nonna",
        barcode: "23333121538324",
        formattedBarcode: "2 3333 12153 8324",
        expirationDate: "March 28, 2025",
        emails: ["streganonna@gmail.com", "spaghettigrandma@gmail.com"],
        phones: [{ number: "123-456-7890", type: "t" }],
        homeLibrary: { code: "sn   ", name: "SNFL (formerly Mid-Manhattan)" },
        id: 12345,
      })
    })

    it("handles missing optional fields gracefully", () => {
      const emptySierraPatron: SierraPatron = { id: 12345 }

      const result = buildPatron(emptySierraPatron)
      expect(result.id).toBe(12345)
      expect(result.name).toBe("")
      expect(result.emails).toStrictEqual([])
    })
  })
})
