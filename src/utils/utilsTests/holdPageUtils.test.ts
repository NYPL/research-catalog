import {
  initialEDDInvalidFields,
  getUpdatedInvalidFields,
} from "../holdPageUtils"

describe("holdPageUtils", () => {
  describe("getUpdatedInvalidFields", () => {
    it("returns correctly updated field validation statuses for different inputs", () => {
      expect(
        getUpdatedInvalidFields("email", "test", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: true, key: "email" },
        { isInvalid: false, key: "startingNumber" },
        { isInvalid: false, key: "endingNumber" },
        { isInvalid: false, key: "chapter" },
      ])
      expect(
        getUpdatedInvalidFields(
          "email",
          "test@test.com",
          initialEDDInvalidFields
        )
      ).toStrictEqual([
        { isInvalid: false, key: "email" },
        { isInvalid: false, key: "startingNumber" },
        { isInvalid: false, key: "endingNumber" },
        { isInvalid: false, key: "chapter" },
      ])
      expect(
        getUpdatedInvalidFields("email", "", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: true, key: "email" },
        { isInvalid: false, key: "startingNumber" },
        { isInvalid: false, key: "endingNumber" },
        { isInvalid: false, key: "chapter" },
      ])
      expect(
        getUpdatedInvalidFields("startingNumber", "", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: false, key: "email" },
        { isInvalid: true, key: "startingNumber" },
        { isInvalid: false, key: "endingNumber" },
        { isInvalid: false, key: "chapter" },
      ])
      expect(
        getUpdatedInvalidFields("endingNumber", "", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: false, key: "email" },
        { isInvalid: false, key: "startingNumber" },
        { isInvalid: true, key: "endingNumber" },
        { isInvalid: false, key: "chapter" },
      ])
      expect(
        getUpdatedInvalidFields("chapter", "", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: false, key: "email" },
        { isInvalid: false, key: "startingNumber" },
        { isInvalid: false, key: "endingNumber" },
        { isInvalid: true, key: "chapter" },
      ])
    })
    it("preserves unchanged field statuses as passed in the previous state param", () => {
      expect(
        getUpdatedInvalidFields("email", "test", [
          { isInvalid: false, key: "email" },
          { isInvalid: true, key: "startingNumber" },
          { isInvalid: true, key: "endingNumber" },
          { isInvalid: true, key: "chapter" },
        ])
      ).toStrictEqual([
        { isInvalid: true, key: "email" },
        { isInvalid: true, key: "startingNumber" },
        { isInvalid: true, key: "endingNumber" },
        { isInvalid: true, key: "chapter" },
      ])
    })
  })
})
