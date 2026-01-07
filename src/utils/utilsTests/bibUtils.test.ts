import {
  standardizeBibId,
  isNyplBibID,
  getBibQueryString,
  buildItemTableDisplayingString,
  itemFiltersActive,
  buildBibMetadataTitle,
} from "../bibUtils"

describe("bibUtils", () => {
  describe("standardizeBibId", () => {
    it("doesn't mess with kosher id", () => {
      expect(standardizeBibId("b12345678")).toBe("b12345678")
      expect(standardizeBibId("hb123456789123456789")).toBe(
        "hb123456789123456789"
      )
    })
    it("removes check digit", () => {
      expect(standardizeBibId("b12345678x")).toBe("b12345678")
      expect(standardizeBibId("b12345678X")).toBe("b12345678")
      expect(standardizeBibId("b123456781")).toBe("b12345678")
    })
    it("lower cases everything", () => {
      expect(standardizeBibId("B12345678")).toBe("b12345678")
      expect(standardizeBibId("CB1234567")).toBe("cb1234567")
      expect(standardizeBibId("Hb123456789123456789")).toBe(
        "hb123456789123456789"
      )
      expect(standardizeBibId("PB1234567")).toBe("pb1234567")
      expect(standardizeBibId("PB1234567812345678")).toBe("pb1234567812345678")
    })
    it("returns value provided if input does not match bib id regexes", () => {
      expect(standardizeBibId("b1234567899")).toBe("b1234567899")
      expect(standardizeBibId("i am not a bib id hb123")).toBe(
        "i am not a bib id hb123"
      )
    })
  })
  describe("isNyplBibID", () => {
    it("determines if a given bib ID is an NYPL bib id", () => {
      expect(isNyplBibID("b12082323")).toBe(true)
      expect(isNyplBibID("pb123456")).toBe(false)
      expect(isNyplBibID("hb10000202040400")).toBe(false)
    })
  })
  describe("itemFiltersActive", () => {
    it("returns true when any of the filter params are populated in the bib query string", () => {
      expect(itemFiltersActive({ item_location: "location" })).toBe(true)
      expect(itemFiltersActive({ item_status: "status" })).toBe(true)
      expect(itemFiltersActive({ item_date: "date" })).toBe(true)
    })
    it("returns false when item filter params are absent in the bib query or if they defined as empty strings", () => {
      expect(
        itemFiltersActive({
          id: "b12082323",
          item_page: 5,
        })
      ).toBe(false)
      expect(
        itemFiltersActive({
          item_location: "",
          item_status: "",
          item_date: "",
        })
      ).toBe(false)
    })
  })
  describe("getBibQueryString", () => {
    it("returns the correct query string with a bib ID and no bib params", () => {
      expect(getBibQueryString({ id: "b12082323" })).toBe(
        "?items_size=20&items_from=0&item_page=1&merge_checkin_card_items=true"
      )
    })
    it("returns the correct query string with a bib ID and query params", () => {
      expect(getBibQueryString({ id: "b12082323", item_page: 5 })).toBe(
        "?items_size=20&items_from=80&item_page=5&merge_checkin_card_items=true"
      )
    })
    it("replaces pagination query params with all_items when all_items is true", () => {
      expect(
        getBibQueryString({ id: "b12082323", item_page: 5, all_items: true })
      ).toBe("?all_items=true&merge_checkin_card_items=true")
    })
    it("does not replace pagination query params when all_items is present and false", () => {
      expect(
        getBibQueryString({
          id: "b12082323",
          item_page: 5,
          all_items: false,
        })
      ).toBe(
        "?items_size=20&items_from=80&item_page=5&merge_checkin_card_items=true"
      )
    })
    it("replaces pagination query params with all_items when all_items is true", () => {
      expect(
        getBibQueryString({ id: "b12082323", item_page: 5, all_items: true })
      ).toBe("?all_items=true&merge_checkin_card_items=true")
    })
    it("does not replace pagination query params when all_items is present and false", () => {
      expect(
        getBibQueryString({
          id: "b12082323",
          item_page: 5,
          all_items: false,
        })
      ).toBe(
        "?items_size=20&items_from=80&item_page=5&merge_checkin_card_items=true"
      )
    })
  })
  describe("buildItemTableDisplayingString", () => {
    it("returns the correct item table heading when there is one item", () => {
      expect(buildItemTableDisplayingString(1, 1)).toBe("Displaying 1 item")
    })
    it("returns the correct item table heading when the total number is greater than 1 but less than the pagination limit", () => {
      expect(buildItemTableDisplayingString(1, 2)).toBe(
        "Displaying all 2 items"
      )
    })
    it("returns the correct item table heading for first page when there are many items", () => {
      expect(buildItemTableDisplayingString(1, 300)).toBe(
        "Displaying 1-20 of 300 items"
      )
    })
    it("returns the correct item table heading for pages greater than 1 when there are many items", () => {
      expect(buildItemTableDisplayingString(5, 300)).toBe(
        "Displaying 81-100 of 300 items"
      )
    })
    it("returns the correct item table heading for when view all items is enabled", () => {
      expect(buildItemTableDisplayingString(1, 300, true)).toBe(
        "Displaying all 300 items"
      )
    })
    it("returns the correct item table heading for when filters are applied and there are no matching items", () => {
      expect(buildItemTableDisplayingString(1, 0, false, true)).toBe(
        "No results found matching the applied filters"
      )
    })
  })
  describe("buildBibMetadataTitle", () => {
    const suffix = " | Item Details | Research Catalog | NYPL"
    const marcSuffix = " | MARC record | Research Catalog | NYPL"
    const suffixLength = suffix.length

    it("returns unmodified title if it's short enough", () => {
      const title = "Short Title"
      const result = buildBibMetadataTitle({ bibTitle: title })
      expect(result).toBe(`${title}${suffix}`)
      expect(result.length).toBeLessThanOrEqual(100)
    })

    it("truncates long titles and appends suffix", () => {
      const longTitle = "A".repeat(200)
      const result = buildBibMetadataTitle({ bibTitle: longTitle })

      expect(result.endsWith(suffix)).toBe(true)
      expect(result.length).toBe(100)

      const expectedTruncatedLength = 100 - suffixLength
      const prefix = result.slice(0, expectedTruncatedLength)
      expect(prefix.endsWith("...")).toBe(true)
    })

    it("truncates at exact length and adds ellipsis", () => {
      const exactLengthTitle = "A".repeat(100 - suffixLength)
      const result = buildBibMetadataTitle({
        bibTitle: `${exactLengthTitle}EXTRA TEXT`,
      })
      expect(result.length).toBe(100)
      expect(result.endsWith(suffix)).toBe(true)
    })
    it("returns fallback title if input is undefined", () => {
      expect(buildBibMetadataTitle(undefined)).toBe(
        "Item Details | Research Catalog | NYPL"
      )
    })
    it("returns MARC string", () => {
      const title = "Title"
      const result = buildBibMetadataTitle({ bibTitle: title, marc: true })
      expect(result).toBe(`${title}${marcSuffix}`)
      expect(result.length).toBeLessThanOrEqual(100)
    })
  })
})
