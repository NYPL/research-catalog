import { getActivePage } from "../../src/utils/appUtils"
import { PATHS } from "../../src/config/constants"

describe("appUtils", () => {
  describe("getActivePage", () => {
    it("should return search for / or /search", () => {
      expect(getActivePage(PATHS.HOME)).toBe("search")
      expect(getActivePage(PATHS.SEARCH)).toBe("search")
    }) 
    it("should return advanced for ADVANCED SEARCH", () => {
      expect(getActivePage(PATHS.ADVANCED_SEARCH)).toBe("advanced")
    })
    it("should return advanced for PATHS[404]", () => {
      expect(getActivePage(PATHS["404"])).toBe("404")
      expect(getActivePage(PATHS["404_REDIRECT"])).toBe("404")
    })
    it("should return an empty string for all other cases", () => {
      expect(getActivePage("spaghetti")).toBe("")
    })
  })
})