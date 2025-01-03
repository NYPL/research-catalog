import {
  defaultValidatedEDDFields,
  getUpdatedInvalidFields,
} from "../holdPageUtils"

describe("holdPageUtils", () => {
  describe("getUpdatedInvalidFields", () => {
    it("returns correctly updated field validation statuses for different inputs", () => {
      expect(
        getUpdatedInvalidFields(
          "emailAddress",
          "test",
          defaultValidatedEDDFields
        )
      ).toStrictEqual([
        { isInvalid: true, key: "emailAddress" },
        { isInvalid: false, key: "startPage" },
        { isInvalid: false, key: "endPage" },
        { isInvalid: false, key: "chapterTitle" },
      ])
      expect(
        getUpdatedInvalidFields(
          "emailAddress",
          "test@test.com",
          defaultValidatedEDDFields
        )
      ).toStrictEqual([
        { isInvalid: false, key: "emailAddress" },
        { isInvalid: false, key: "startPage" },
        { isInvalid: false, key: "endPage" },
        { isInvalid: false, key: "chapterTitle" },
      ])
      expect(
        getUpdatedInvalidFields("emailAddress", "", defaultValidatedEDDFields)
      ).toStrictEqual([
        { isInvalid: true, key: "emailAddress" },
        { isInvalid: false, key: "startPage" },
        { isInvalid: false, key: "endPage" },
        { isInvalid: false, key: "chapterTitle" },
      ])
      expect(
        getUpdatedInvalidFields("startPage", "", defaultValidatedEDDFields)
      ).toStrictEqual([
        { isInvalid: false, key: "emailAddress" },
        { isInvalid: true, key: "startPage" },
        { isInvalid: false, key: "endPage" },
        { isInvalid: false, key: "chapterTitle" },
      ])
      expect(
        getUpdatedInvalidFields("endPage", "", defaultValidatedEDDFields)
      ).toStrictEqual([
        { isInvalid: false, key: "emailAddress" },
        { isInvalid: false, key: "startPage" },
        { isInvalid: true, key: "endPage" },
        { isInvalid: false, key: "chapterTitle" },
      ])
      expect(
        getUpdatedInvalidFields("chapterTitle", "", defaultValidatedEDDFields)
      ).toStrictEqual([
        { isInvalid: false, key: "emailAddress" },
        { isInvalid: false, key: "startPage" },
        { isInvalid: false, key: "endPage" },
        { isInvalid: true, key: "chapterTitle" },
      ])
    })
    it("preserves unchanged field statuses as passed in the previous state param", () => {
      expect(
        getUpdatedInvalidFields("emailAddress", "test", [
          { isInvalid: false, key: "emailAddress" },
          { isInvalid: true, key: "startPage" },
          { isInvalid: true, key: "endPage" },
          { isInvalid: true, key: "chapterTitle" },
        ])
      ).toStrictEqual([
        { isInvalid: true, key: "emailAddress" },
        { isInvalid: true, key: "startPage" },
        { isInvalid: true, key: "endPage" },
        { isInvalid: true, key: "chapterTitle" },
      ])
    })
  })
})
