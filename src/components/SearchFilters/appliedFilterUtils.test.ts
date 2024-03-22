import { buildAppliedFiltersValueArrayWithTagRemoved } from "./appliedFilterUtils"

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
})
