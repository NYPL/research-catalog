import { endDateInvalid, rangeContainsInvalidYearFormat } from "./useDateForm"

describe("useDateForm", () => {
  describe("endDateInvalid", () => {
    it("returns false if either dateBefore or dateAfter are empty", () => {
      expect(endDateInvalid("", "2000")).toBe(false)
      expect(endDateInvalid("2000", "")).toBe(false)
    })
    it("returns true if the dateBefore is less than dateAfter", () => {
      expect(endDateInvalid("2000", "1900")).toBe(true)
    })
    it("returns false if dateBefore is greater than dateAfter", () => {
      expect(endDateInvalid("2000", "2001")).toBe(false)
    })
  })
  describe("rangeContainsInvalidYearFormat", () => {
    it("returns true for too short values", () => {
      expect(rangeContainsInvalidYearFormat("19", "20")).toBe(true)
    })
    it("returns true for too long values", () => {
      expect(rangeContainsInvalidYearFormat("19000000", "2000")).toBe(true)
    })
    it("it returns true for only one invalid format", () => {
      expect(rangeContainsInvalidYearFormat("", "19")).toBe(true)
    })
    it("it returns true for one valid and one invalid format", () => {
      expect(rangeContainsInvalidYearFormat("19", "2000")).toBe(true)
    })
    it("returns false for one valid input", () => {
      expect(rangeContainsInvalidYearFormat("", "2000")).toBe(false)
    })
    it("returns false for two valid inputs", () => {
      expect(rangeContainsInvalidYearFormat("1990", "2000")).toBe(false)
    })
  })
})
