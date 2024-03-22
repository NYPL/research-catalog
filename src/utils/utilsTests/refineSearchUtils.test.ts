import {
  collapseMultiValueQueryParams,
  buildFilterQuery,
  addLabelPropAndParseFilters,
} from "../refineSearchUtils"
import { aggregationsResults } from "../../../__test__/fixtures/searchResultsManyBibs"

describe("refineSearchUtils", () => {
  describe("addLabelPropAndParseFilters", () => {
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
            count: 42,
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

  describe("collapseMultiValueQueryParams", () => {
    it("can parse a single filter", () => {
      const query = { "filters[language][0]": "lang:fre" }
      expect(collapseMultiValueQueryParams(query)).toStrictEqual({
        language: ["lang:fre"],
      })
    })
    it("can parse single filter with multiple values", () => {
      const query = {
        "filters[subjectLiteral][0]": "Italians in motion pictures",
        "filters[subjectLiteral][1]": "Immigrants -- Lorraine.",
        "filters[subjectLiteral][2]": "Italians -- Lorraine.",
        "filters[subjectLiteral][3]": "Italien (Motiv)",
        "filters[subjectLiteral][4]":
          "Motion pictures -- Social aspects -- Lorraine.",
      }
      expect(collapseMultiValueQueryParams(query)).toStrictEqual({
        subjectLiteral: [
          "Italians in motion pictures",
          "Immigrants -- Lorraine.",
          "Italians -- Lorraine.",
          "Italien (Motiv)",
          "Motion pictures -- Social aspects -- Lorraine.",
        ],
      })
    })
    it("can parse mulitple filters with single values", () => {
      const query = {
        "filters[subjectLiteral][0]": "Italians in motion pictures",
        "filters[language][0]": "lang:fre",
      }
      expect(collapseMultiValueQueryParams(query)).toStrictEqual({
        language: ["lang:fre"],
        subjectLiteral: ["Italians in motion pictures"],
      })
    })
    it.todo("can parse mulitple filters with multiple values")
    it.todo("can parse with other params")
  })

  describe("buildFilterQuery", () => {
    it("ignores empty filter value", () => {
      const filters = { dateBefore: [""], dateAfter: ["1990"] }
      expect(buildFilterQuery(filters)).toStrictEqual({
        "filters[dateAfter][0]": "1990",
      })
    })
    it("single filter single value", () => {
      const filters = { subjectLiteral: ["spaghetti"] }
      expect(buildFilterQuery(filters)).toStrictEqual({
        "filters[subjectLiteral][0]": "spaghetti",
      })
    })
    it("single filter multi value", () => {
      const filters = {
        subjectLiteral: ["spaghetti", "meatballs", "parmesean"],
      }
      expect(buildFilterQuery(filters)).toStrictEqual({
        "filters[subjectLiteral][0]": "spaghetti",
        "filters[subjectLiteral][1]": "meatballs",
        "filters[subjectLiteral][2]": "parmesean",
      })
    })
    it("multi filter multi value", () => {
      const filters = {
        subjectLiteral: ["spaghetti", "meatballs", "parmesean"],
        author: ["strega nonna", "chef boyardee"],
      }
      expect(buildFilterQuery(filters)).toStrictEqual({
        "filters[subjectLiteral][0]": "spaghetti",
        "filters[subjectLiteral][1]": "meatballs",
        "filters[subjectLiteral][2]": "parmesean",
        "filters[author][0]": "strega nonna",
        "filters[author][1]": "chef boyardee",
      })
    })
  })
})
