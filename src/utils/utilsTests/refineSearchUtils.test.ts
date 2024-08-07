import {
  collapseMultiValueQueryParams,
  buildFilterQuery,
  buildHoldingLocationFilters,
} from "../refineSearchUtils"

describe("refineSearchUtils", () => {
  describe("buildHoldingLocationFilters", () => {
    it("can handle undefined", () => {
      expect(buildHoldingLocationFilters(undefined)).not.toBeDefined()
    })
    it("can handle a single location string", () => {
      const parsedFilters = buildHoldingLocationFilters([
        "loc:mal82,loc:mal92,loc:mal99",
      ])
      expect(Object.keys(parsedFilters)).toHaveLength(3)
    })
    it("can handle three location strings", () => {
      const parsedFilters = buildHoldingLocationFilters([
        "1,2,3",
        "x,y,z",
        "a,b,c",
      ])
      expect(Object.keys(parsedFilters)).toHaveLength(9)
      expect(parsedFilters).toStrictEqual({
        "filters[holdingLocation][0]": "1",
        "filters[holdingLocation][1]": "2",
        "filters[holdingLocation][2]": "3",
        "filters[holdingLocation][3]": "x",
        "filters[holdingLocation][4]": "y",
        "filters[holdingLocation][5]": "z",
        "filters[holdingLocation][6]": "a",
        "filters[holdingLocation][7]": "b",
        "filters[holdingLocation][8]": "c",
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
