import {
  collapseMultiValueQueryParams,
  buildFilterQuery,
} from "../refineSearchUtils"

describe("refineSearchUtils", () => {
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
      const filters = { dateTo: [""], dateFrom: ["1990"] }
      expect(buildFilterQuery(filters)).toStrictEqual({
        "filters[dateFrom][0]": "1990",
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
