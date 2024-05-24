import {
  parseAccountSettingsPayload,
  updatePhoneOrEmailArrayWithNewPrimary,
  buildUpdatedPatronDisplayData,
} from "./AccountSettingsUtils"
import { mockPatron } from "../../../../__test__/fixtures/processedMyAccountData"

describe("Account settings utils", () => {
  describe("buildUpdatedPatronDisplayData", () => {
    it("can handle an empty patron", () => {
      const originalPatronData = {
        barcode: "23333121538324",
        emails: ["veggievera@gmail.com"],
        expirationDate: "2025-03-28",
        homeLibraryCode: "sn",
        id: 2772226,
        name: "KAHN, VERA RUTH",
        notificationPreference: "Email",
        phones: [{ number: "6466600432", type: "t" }],
      }
      const patronUpdateBody = {}
      expect(
        buildUpdatedPatronDisplayData(originalPatronData, patronUpdateBody)
      ).toStrictEqual(originalPatronData)
    })
    it("can combine patron data and update body with all fields provided", () => {
      const originalPatronData = {
        barcode: "23333121538324",
        emails: ["veggievera@gmail.com"],
        expirationDate: "2025-03-28",
        homeLibraryCode: "sn",
        id: 2772226,
        name: "KAHN, VERA RUTH",
        notificationPreference: "Email",
        phones: [{ number: "6466600432", type: "t" }],
      }
      const patronUpdateBody = {
        emails: ["veraruthkahn@gmail.com", "veggievera@gmail.com"],
        fixedFields: { 268: { label: "Notice Preference", value: "p" } },
        homeLibraryCode: "mp   ",
        phones: [
          { number: "6466600432", type: "t" },
          { number: "1234567890", type: "t" },
        ],
      }
      const { id, emails, phones, homeLibraryCode, notificationPreference } =
        buildUpdatedPatronDisplayData(originalPatronData, patronUpdateBody)
      expect(emails).toStrictEqual([
        "veraruthkahn@gmail.com",
        "veggievera@gmail.com",
      ])
      expect(phones).toStrictEqual([
        { number: "6466600432", type: "t" },
        { number: "1234567890", type: "t" },
      ])
      expect(notificationPreference).toEqual("Phone")
      expect(homeLibraryCode).toStrictEqual("mp   ")
      expect(id).toEqual(originalPatronData.id)
    })
    it("updates original data when updated data is missing fields", () => {
      const originalPatronData = {
        barcode: "23333121538324",
        emails: ["veggievera@gmail.com"],
        expirationDate: "2025-03-28",
        homeLibraryCode: "sn",
        id: 2772226,
        name: "KAHN, VERA RUTH",
        notificationPreference: "Email",
        phones: [{ number: "6466600432", type: "t" }],
      }
      const patronUpdateBody = {
        fixedFields: { 268: { label: "Notice Preference", value: "p" } },
        homeLibraryCode: "mp   ",
      }
      const { id, emails, phones, homeLibraryCode, notificationPreference } =
        buildUpdatedPatronDisplayData(originalPatronData, patronUpdateBody)
      expect(emails).toStrictEqual(originalPatronData.emails)
      expect(phones).toStrictEqual(originalPatronData.phones)
      expect(homeLibraryCode).toEqual("mp   ")
      expect(notificationPreference).toEqual("Phone")
      expect(id).toEqual(originalPatronData.id)
    })
  })
  describe("parseAccountSettingsPayload", () => {
    it("does not submit empty form inputs", () => {
      const eventTarget = {
        emails: { value: "" },
        phones: { value: "" },
      }
      expect(
        parseAccountSettingsPayload(eventTarget, mockPatron)
      ).toStrictEqual({})
    })
    it("submits inputs with values", () => {
      const eventTarget = {
        emails: { value: "fusili@gmail.com" },
        phones: { value: "666" },
        homeLibraryCode: { value: "xx   " },
        notificationPreference: { value: "z" },
      }
      expect(
        parseAccountSettingsPayload(eventTarget, mockPatron).emails
      ).toStrictEqual([
        "fusili@gmail.com",
        "streganonna@gmail.com",
        "spaghettigrandma@gmail.com",
      ])
      expect(
        parseAccountSettingsPayload(eventTarget, mockPatron).phones
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
        parseAccountSettingsPayload(eventTarget, mockPatron).homeLibraryCode
      ).toBe("xx   ")
      expect(
        parseAccountSettingsPayload(eventTarget, mockPatron).fixedFields
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
