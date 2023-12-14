import { parseFilters, buildFilters } from "../refineSearchUtils"

xdescribe("refineSearchUtils", () => {
  describe("parseFilters", () => {
    it("can parse a single filter", () => {
      const query = { "filters[language][0]": "lang:fre" }
      expect(parseFilters(query)).toStrictEqual({
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
      expect(parseFilters(query)).toStrictEqual({
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
      expect(parseFilters(query)).toStrictEqual({
        language: ["lang:fre"],
        subjectLiteral: ["Italians in motion pictures"],
      })
    })
    it.todo("can parse mulitple filters with multiple values")
    it.todo("can parse with other params")
  })

  describe("buildFilters", () => {
    it("single filter single value", () => {
      const filters = { subjectLiteral: ["spaghetti"] }
      expect(buildFilters(filters)).toBe(
        "&filters[subjectLiteral][0]=spaghetti"
      )
    })
    it("single filter multi value", () => {
      const filters = {
        subjectLiteral: ["spaghetti", "meatballs", "parmesean"],
      }
      expect(buildFilters(filters)).toBe(
        "&filters[subjectLiteral][0]=spaghetti&filters[subjectLiteral][1]=meatballs&filters[subjectLiteral][2]=parmesean"
      )
    })
    it("multi filter multi value", () => {
      const filters = {
        subjectLiteral: ["spaghetti", "meatballs", "parmesean"],
        author: ["strega nonna", "chef boyardee"],
      }
      expect(buildFilters(filters)).toBe(
        "&filters[subjectLiteral][0]=spaghetti&filters[subjectLiteral][1]=meatballs&filters[subjectLiteral][2]=parmesean&filters[author][0]=strega%20nonna&filters[author][1]=chef%20boyardee"
      )
    })
  })
})
