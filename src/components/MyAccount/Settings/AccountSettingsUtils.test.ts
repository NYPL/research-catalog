import { parsePayload, updateArrayValue } from "./AccountSettingsUtils"
import { processedPatron } from "../../../../__test__/fixtures/processedMyAccountData"

describe("Account settings utils", () => {
  describe("parsePayload", () => {
    it.todo("does not submit empty form inputs")
    it("submits inputs with values", () => {
      const eventTarget = {
        emails: { value: "fusili@gmail.com" },
        phones: { value: "666" },
        homeLibrary: { value: "xx   " },
        notificationPreference: { value: "z" },
      }
      expect(parsePayload(eventTarget, processedPatron).emails).toStrictEqual([
        "fusili@gmail.com",
        "streganonna@gmail.com",
        "spaghettigrandma@gmail.com",
      ])
      expect(parsePayload(eventTarget, processedPatron).phones).toStrictEqual([
        {
          number: "666",
          type: "t",
        },
        {
          number: "123-456-7890",
          type: "t",
        },
      ])
      expect(parsePayload(eventTarget, processedPatron).homeLibrary).toBe(
        "xx   "
      )
      expect(
        parsePayload(eventTarget, processedPatron).fixedFields
      ).toStrictEqual({
        268: {
          label: "Notice Preference",
          value: "z",
        },
      })
    })
  })
  describe("updateArrayValue", () => {
    it("appends new primary to the front of the array", () => {
      expect(updateArrayValue("a", ["b", "c"])).toStrictEqual(["a", "b", "c"])
    })
    it("does not return duplicate new primaries", () => {
      expect(updateArrayValue("a", ["b", "c", "a"])).toStrictEqual([
        "a",
        "b",
        "c",
      ])
    })
    it("does not return duplicate new primary phone types", () => {
      expect(
        updateArrayValue({ number: "789", type: "t" }, [
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
        updateArrayValue({ number: "123", type: "t" }, [
          { number: "456", type: "t" },
        ])
      ).toStrictEqual([
        { number: "123", type: "t" },
        { number: "456", type: "t" },
      ])
    })
  })
})
