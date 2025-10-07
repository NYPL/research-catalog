import {
  buildGoBackHref,
  mapCollectionsIntoLocations,
  mapCollectionToFilterTag,
} from "../advancedSearchUtils"

describe("Advanced search utils", () => {
  describe("buildGoBackHref", () => {
    it("returns null with no referer", () => {
      expect(buildGoBackHref(undefined)).toBe(null)
    })
    it("returns null when referer is not an RC URL", () => {
      expect(buildGoBackHref("spaghetti.com")).toBe(null)
    })
    it("returns / when endpoint is home", () => {
      expect(buildGoBackHref("nypl.org/research/research-catalog")).toBe("/")
    })
    it("returns endpoint when there is one", () => {
      expect(
        buildGoBackHref(
          "http://local.nypl.org:8080/research/research-catalog/search?q=spaghetti&search_scope=title"
        )
      ).toBe("/search?q=spaghetti&search_scope=title")
    })
  })

  describe("mapCollectionsIntoLocations", () => {
    it("groups collections under correct building locations", () => {
      const collections = [
        { value: "ma001", label: "SASB Test Collection", count: 100 },
        { value: "sc002", label: "Schomburg Test Collection", count: 50 },
      ]

      const result = mapCollectionsIntoLocations(collections)

      expect(result).toEqual([
        {
          id: "ma",
          name: "Stephen A. Schwarzman Building (SASB)",
          children: [
            { id: "ma001", name: "SASB Test Collection (100)", count: 100 },
          ],
        },
        {
          id: "sc",
          name: "Schomburg Center for Research in Black Culture",
          children: [
            { id: "sc002", name: "Schomburg Test Collection (50)", count: 50 },
          ],
        },
      ])
    })

    it('filters out restricted ("rc") building', () => {
      const collections = [{ value: "rc999", label: "Restricted Set" }]
      const result = mapCollectionsIntoLocations(collections)

      expect(result).toEqual([])
    })

    it("omits empty building groups (no collections match)", () => {
      const collections = [
        { value: "xx100", label: "No corresponding location" },
      ]
      const result = mapCollectionsIntoLocations(collections)
      expect(result).toEqual([])
    })
  })

  describe("mapCollectionToFilterTag", () => {
    it("returns nickname and collection name", () => {
      const result = mapCollectionToFilterTag("mac82", "Arents Collection")
      expect(result).toBe("SASB - Arents Collection")
    })

    it("returns only collection name when no building match", () => {
      const result = mapCollectionToFilterTag("zz999", "Unknown Collection")
      expect(result).toBe("Unknown Collection")
    })
  })
})
