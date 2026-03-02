import {
  buildAppliedFiltersValueArrayWithTagRemoved,
  buildTagsetData,
  addLabelPropAndParseFilters,
} from "./appliedFilterUtils"

import { aggregationsResults } from "../../../__test__/fixtures/searchResultsManyBibs"

describe("Applied Filter utils", () => {
  describe("addLabelPropAndParseFilters", () => {
    it("does not return values for filters we don't display", () => {
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
        format: ["resourcetypes:txt"],
        language: ["lang:ita"],
        subjectLiteral: ["Spaghetti Westerns -- History and criticism."],
      }
      const parsed = addLabelPropAndParseFilters(
        aggregationsResults.itemListElement,
        appliedFilterValues
      )
      expect(parsed).toStrictEqual({
        format: [{ value: "resourcetypes:txt", count: 371, label: "Text" }],
        language: [{ value: "lang:ita", count: 59, label: "Italian" }],
        subjectLiteral: [
          {
            value: "Spaghetti Westerns -- History and criticism.",
            count: 42,
            label: "Spaghetti Westerns -- History and criticism.",
          },
        ],
      })
    })
    it("takes applied date filter values and adds the appropriate label", () => {
      const appliedFilterValues = {
        dateFrom: ["2009"],
        dateTo: ["2010"],
      }
      const parsed = addLabelPropAndParseFilters(
        aggregationsResults.itemListElement,
        appliedFilterValues
      )
      expect(parsed).toStrictEqual({
        dateFrom: [{ value: "2009", count: null, label: "From 2009" }],
        dateTo: [{ value: "2010", count: null, label: "To 2010" }],
      })
    })
  })
  describe("buildAppliedFiltersValueArrayWithTagRemoved", () => {
    it("removes the provided tag", () => {
      const tagToRemove = {
        label: "Tag",
        field: "filterField",
        value: "remove",
        id: "id",
      }
      const appliedFilters = {
        filterField: ["remove", "keep"],
      }
      expect(
        buildAppliedFiltersValueArrayWithTagRemoved(tagToRemove, appliedFilters)
      ).toStrictEqual({ filterField: ["keep"] })
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
          value: "lang:eng",
        },
        {
          id: "language-French",
          label: "French",
          field: "language",
          value: "lang:fre",
        },
        {
          id: "subjectLiteral-Spaghetti Westerns -- History and criticism.",
          label: "Spaghetti Westerns -- History and criticism.",
          field: "subjectLiteral",
          value: "Spaghetti Westerns -- History and criticism.",
        },
        {
          id: "subjectLiteral-COOKING -- General.",
          label: "COOKING -- General.",
          field: "subjectLiteral",
          value: "COOKING -- General.",
        },
      ])
    })
  })
})
