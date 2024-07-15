import {
  parseAccountSettingsPayload,
  updatePhoneOrEmailArrayWithNewPrimary,
  formatPhoneNumber,
} from "./AccountSettingsUtils"
import { processedPatron } from "../../../../__test__/fixtures/processedMyAccountData"
import { formatDate, formatPatronName } from "../../../utils/myAccountUtils"

describe("Account settings utils", () => {
  describe("formatDate", () => {
    it("can parse a date", () => {
      const date = "2025-03-28"
      expect(formatDate(date)).toEqual("March 28, 2025")
    })
  })
  describe("formatPatronName", () => {
    it("correctly formats the patron name when in all caps and comma-separated", () => {
      expect(formatPatronName("LAST,FIRST")).toEqual("First Last")
    })
    it("falls back to the input name when not comma-separated", () => {
      expect(formatPatronName("QA Tester ILS")).toEqual("QA Tester ILS")
    })
  })
  describe("formatPhoneNumber", () => {
    it("formats a 10 digit number", () => {
      const phones = [{ number: "1234567890", type: "t" }]
      expect(formatPhoneNumber(phones)).toEqual("123-456-7890")
    })
    it("formats an 11 digit number", () => {
      const phones = [{ number: "01234567890", type: "t" }]
      expect(formatPhoneNumber(phones)).toEqual("0-123-456-7890")
    })
    it("returns any other number", () => {
      const phones = [{ number: "1234567", type: "t" }]
      expect(formatPhoneNumber(phones)).toEqual("1234567")
    })
  })
  describe("parseAccountSettingsPayload", () => {
    it("does not submit empty form inputs", () => {
      const eventTarget = {
        emails: { value: "" },
        phones: { value: "" },
      }
      expect(
        parseAccountSettingsPayload(eventTarget, processedPatron)
      ).toStrictEqual({})
    })
    it("submits inputs with values", () => {
      const eventTarget = {
        emails: { value: "fusili@gmail.com" },
        phones: { value: "666" },
        homeLibrary: { value: "xx   @spaghetti" },
        notificationPreference: { value: "z" },
      }
      expect(
        parseAccountSettingsPayload(eventTarget, processedPatron).emails
      ).toStrictEqual([
        "fusili@gmail.com",
        "streganonna@gmail.com",
        "spaghettigrandma@gmail.com",
      ])
      expect(
        parseAccountSettingsPayload(eventTarget, processedPatron).phones
      ).toStrictEqual([
        {
          number: "666",
          type: "t",
        },
        {
          number: "123-456-7890",
          type: "t",
        },
      ])
      expect(
        parseAccountSettingsPayload(eventTarget, processedPatron)
          .homeLibraryCode
      ).toBe("xx   ")
      expect(
        parseAccountSettingsPayload(eventTarget, processedPatron).fixedFields
      ).toStrictEqual({
        268: {
          label: "Notice Preference",
          value: "z",
        },
      })
    })
  })
  describe("updatePhoneOrEmailArrayWithNewPrimary", () => {
    it("appends new primary to the front of the array", () => {
      expect(
        updatePhoneOrEmailArrayWithNewPrimary("a", ["b", "c"])
      ).toStrictEqual(["a", "b", "c"])
    })
    it("does not return duplicate new primaries", () => {
      expect(
        updatePhoneOrEmailArrayWithNewPrimary("a", ["b", "c", "a"])
      ).toStrictEqual(["a", "b", "c"])
    })
    it("does not return duplicate new primary phone types", () => {
      expect(
        updatePhoneOrEmailArrayWithNewPrimary({ number: "789", type: "t" }, [
          { number: "123", type: "t" },
          { number: "456", type: "t" },
          { number: "789", type: "t" },
        ])
      ).toStrictEqual([
        { number: "789", type: "t" },
        { number: "123", type: "t" },
        { number: "456", type: "t" },
      ])
    })
    it("works for phone types", () => {
      expect(
        updatePhoneOrEmailArrayWithNewPrimary({ number: "123", type: "t" }, [
          { number: "456", type: "t" },
        ])
      ).toStrictEqual([
        { number: "123", type: "t" },
        { number: "456", type: "t" },
      ])
    })
  })
})
