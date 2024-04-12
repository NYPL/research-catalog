import { parsePayload, updateArrayValue } from "./AccountSettingsUtils"

describe("Account settings utils", () => {
  describe("parsePayload", () => {
    it.todo("does not submit empty form inputs")
    it.todo("submits inputs with values")
    it.todo("sends an array of phones and emails")
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
