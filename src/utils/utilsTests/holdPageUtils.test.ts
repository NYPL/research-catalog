import { initialEDDInvalidFields, updateInvalidFields } from "../holdPageUtils"

describe("holdPageUtils", () => {
  describe("updateInvalidFields", () => {
    it("returns correctly updated field validation statuses for different inputs", () => {
      expect(
        updateInvalidFields("email", "test", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: true, key: "email" },
        { isInvalid: false, key: "startingNumber" },
        { isInvalid: false, key: "endingNumber" },
        { isInvalid: false, key: "chapter" },
      ])
      expect(
        updateInvalidFields("email", "test@test.com", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: false, key: "email" },
        { isInvalid: false, key: "startingNumber" },
        { isInvalid: false, key: "endingNumber" },
        { isInvalid: false, key: "chapter" },
      ])
      expect(
        updateInvalidFields("email", "", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: true, key: "email" },
        { isInvalid: false, key: "startingNumber" },
        { isInvalid: false, key: "endingNumber" },
        { isInvalid: false, key: "chapter" },
      ])
      expect(
        updateInvalidFields("startingNumber", "", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: false, key: "email" },
        { isInvalid: true, key: "startingNumber" },
        { isInvalid: false, key: "endingNumber" },
        { isInvalid: false, key: "chapter" },
      ])
      expect(
        updateInvalidFields("endingNumber", "", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: false, key: "email" },
        { isInvalid: false, key: "startingNumber" },
        { isInvalid: true, key: "endingNumber" },
        { isInvalid: false, key: "chapter" },
      ])
      expect(
        updateInvalidFields("chapter", "", initialEDDInvalidFields)
      ).toStrictEqual([
        { isInvalid: false, key: "email" },
        { isInvalid: false, key: "startingNumber" },
        { isInvalid: false, key: "endingNumber" },
        { isInvalid: true, key: "chapter" },
      ])
    })
    it("preserves unchanged field statuses as passed in the previous state param", () => {
      expect(
        updateInvalidFields("email", "test", [
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
