import {
  buildAppliedFiltersValueArrayWithTagRemoved,
  buildTagsetData,
  addLabelPropAndParseFilters,
} from "./appliedFilterUtils"

import { aggregationsResults } from "../../../__test__/fixtures/searchResultsManyBibs"

describe("Applied Filter utils", () => {
  describe("addLabelPropAndParseFilters", () => {
    it("can handle a subject literal that is 2 of 3 facets", () => {
      const aggregations = [
        {
          "@type": "nypl:Aggregation",
          "@id": "res:subjectLiteral",
          id: "subjectLiteral",
          field: "subjectLiteral",
          values: [
            {
              count: 1,
              value: "facet 1 -- facet 2 -- facet 3",
              label: "facet 1 -- facet 2 -- facet 3",
            },
          ],
        },
      ]
      const appliedFilterValues = {
        subjectLiteral: ["facet 1 -- facet 2"],
      }
      expect(
        addLabelPropAndParseFilters(aggregations, appliedFilterValues)
      ).toStrictEqual({
        subjectLiteral: [
          {
            count: null,
            value: "facet 1 -- facet 2",
            label: "facet 1 -- facet 2",
          },
        ],
      })
    })
    it("does not return filter value for invalid filter", () => {
      const aggregations = [
        {
          "@type": "nypl:Aggregation",
          "@id": "res:owner",
          id: "owner",
          field: "owner",
          values: [
            {
              value: "orgs:1121",
              count: 1,
              label: "Jerome Robbins Dance Division",
            },
          ],
        },
        {
          "@type": "nypl:Aggregation",
          "@id": "res:contributorLiteral",
          id: "contributorLiteral",
          field: "contributorLiteral",
          values: [
            {
              value: "Schomburg Children's Collection.",
              count: 54,
              label: "Schomburg Children's Collection.",
            },
            {
              value: "Schomburg Children's Collection. ",
              count: 11,
              label: "Schomburg Children's Collection. ",
            },
          ],
        },
      ]
      const appliedFilterValues = {
        holdingLocation: ["loc:scff2"],
      }
      expect(
        addLabelPropAndParseFilters(aggregations, appliedFilterValues)
      ).toStrictEqual({})
    })

    it("takes applied filter values and adds the appropriate label", () => {
      const appliedFilterValues = {
        materialType: ["resourcetypes:txt"],
        language: ["lang:ita"],
        subjectLiteral: ["Spaghetti Westerns -- History and criticism."],
      }
      const parsed = addLabelPropAndParseFilters(
        aggregationsResults.itemListElement,
        appliedFilterValues
      )
      expect(parsed).toStrictEqual({
        materialType: [
          { value: "resourcetypes:txt", count: 371, label: "Text" },
        ],
        language: [{ value: "lang:ita", count: 59, label: "Italian" }],
        subjectLiteral: [
          {
            value: "Spaghetti Westerns -- History and criticism.",
            count: null,
            label: "Spaghetti Westerns -- History and criticism.",
          },
        ],
      })
    })
    it("takes applied date filter values and adds the appropriate label", () => {
      const appliedFilterValues = {
        dateBefore: ["2009"],
        dateAfter: ["2010"],
      }
      const parsed = addLabelPropAndParseFilters(
        aggregationsResults.itemListElement,
        appliedFilterValues
      )
      expect(parsed).toStrictEqual({
        dateBefore: [{ value: "2009", count: null, label: "Before 2009" }],
        dateAfter: [{ value: "2010", count: null, label: "After 2010" }],
      })
    })
  })
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
