import {
  buildAppliedFiltersValueArrayWithTagRemoved,
  buildTagsetData,
} from "./appliedFilterUtils"

describe("Applied Filter utils", () => {
  describe("buildAppliedFiltersValueArrayWithTagRemoved", () => {
    it("removes the provided tag", () => {
      const tagToRemove = {
        label: "Tag",
        field: "tags",
        value: "remove",
        id: "id",
      }
      const tagToKeep = {
        label: "Tag 2",
        field: "tags",
        value: "keep",
        id: "id",
      }
      const appliedFiltersWithLabels = {
        tags: [tagToRemove, tagToKeep],
      }
      expect(
        buildAppliedFiltersValueArrayWithTagRemoved(
          tagToRemove,
          appliedFiltersWithLabels
        )
      ).toStrictEqual({ tags: ["keep"] })
    })
  })
  describe("buildTagsetData", () => {
    it("returns an array of tagset data", () => {
      const appliedFiltersWithLabels = {
        language: [
          {
            value: "lang:eng",
            count: 14,
            label: "English",
          },
          {
            value: "lang:fre",
            count: 2,
            label: "French",
          },
        ],
        subjectLiteral: [
          {
            value: "Spaghetti Westerns -- History and criticism.",
            count: 12,
            label: "Spaghetti Westerns -- History and criticism.",
          },
          {
            value: "COOKING -- General.",
            count: 4,
            label: "COOKING -- General.",
          },
        ],
      }
      expect(buildTagsetData(appliedFiltersWithLabels)).toStrictEqual([
        {
          id: "language-English",
          label: "English",
          field: "language",
        },
        {
          id: "language-French",
          label: "French",
          field: "language",
        },
        {
          id: "subjectLiteral-Spaghetti Westerns -- History and criticism.",
          label: "Spaghetti Westerns -- History and criticism.",
          field: "subjectLiteral",
        },
        {
          id: "subjectLiteral-COOKING -- General.",
          label: "COOKING -- General.",
          field: "subjectLiteral",
        },
      ])
    })
  })
})
