import {
  adobeAnalyticsRouteToPageName,
  encodeHTML,
  getPaginationOffsetStrings,
  convertToSentenceCase,
  tryInstantiate,
  standardizeBibId,
} from "../appUtils"
import {
  ADOBE_ANALYTICS_RC_PREFIX,
  ADOBE_ANALYTICS_PAGE_NAMES,
} from "../../config/constants"

describe("appUtils", () => {
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
  describe("adobeAnalyticsRouteToPageName", () => {
    it("should return the appropriate page name for a given route", () => {
      expect(adobeAnalyticsRouteToPageName("/")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.HOME}`
      )
      expect(adobeAnalyticsRouteToPageName("")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.HOME}`
      )
      expect(adobeAnalyticsRouteToPageName("/search")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.SEARCH_RESULTS}`
      )
      expect(adobeAnalyticsRouteToPageName("/search", "?q=test")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.SEARCH_RESULTS}|?q=test`
      )
      expect(adobeAnalyticsRouteToPageName("/search/advanced")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.ADVANCED_SEARCH}`
      )
      expect(adobeAnalyticsRouteToPageName("/bib")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.BIB}`
      )
      expect(adobeAnalyticsRouteToPageName("/bib/b12345678")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.BIB}|b12345678`
      )
      expect(adobeAnalyticsRouteToPageName("/bib/b12345678/all")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.BIB}|b12345678|all`
      )
      expect(adobeAnalyticsRouteToPageName("/hold/request/b12345678")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.HOLD_REQUEST}|b12345678`
      )
      expect(
        adobeAnalyticsRouteToPageName("/hold/request/b12345678-12345")
      ).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.HOLD_REQUEST}|b12345678|12345`
      )
      expect(adobeAnalyticsRouteToPageName("/hold/request/b12345678/edd")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.EDD_REQUEST}|b12345678`
      )
      expect(
        adobeAnalyticsRouteToPageName("/hold/request/b12345678-12345/edd")
      ).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.EDD_REQUEST}|b12345678|12345`
      )
      expect(adobeAnalyticsRouteToPageName("/account")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.ACCOUNT}`
      )
      expect(adobeAnalyticsRouteToPageName("/account/holds")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.ACCOUNT}`
      )
      expect(adobeAnalyticsRouteToPageName("/accountError")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.ACCOUNT_ERROR}`
      )
      expect(adobeAnalyticsRouteToPageName("/404/redirect")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.REDIRECT}`
      )
      expect(adobeAnalyticsRouteToPageName("/404")).toBe(
        `${ADOBE_ANALYTICS_RC_PREFIX}${ADOBE_ANALYTICS_PAGE_NAMES.NOT_FOUND_404}`
      )
    })
  })
  describe("encodeHTML", () => {
    it("should correctly encode a string to html", () => {
      expect(encodeHTML('"Test" & string to < encode')).toBe(
        "&quot;Test&quot; &amp; string to &lt; encode"
      )
    })
  })
  describe("getPaginationOffsetStrings", () => {
    it("returns a tuple of strings with the correct start and end values for the first page", () => {
      const [start, end] = getPaginationOffsetStrings(1, 1200, 50)
      expect(start).toEqual("1")
      expect(end).toEqual("50")
    })
    it("returns a tuple of strings with the correct start and end values for any given page", () => {
      const [start, end] = getPaginationOffsetStrings(5, 1200, 50)
      expect(start).toEqual("201")
      expect(end).toEqual("250")
    })
    it("correctly sets the end value for the last page", () => {
      const [start, end] = getPaginationOffsetStrings(24, 1195, 50)
      expect(start).toEqual("1,151")
      expect(end).toEqual("1,195")
    })
  })
  describe("convertToSentenceCase", () => {
    it("converts a capitalized string to sentence case", () => {
      expect(convertToSentenceCase("Convert This Sentence.")).toEqual(
        "Convert this sentence."
      )
    })
    it("converts a fully uppercase string to sentence case", () => {
      expect(convertToSentenceCase("CONVERT THIS SENTENCE.")).toEqual(
        "Convert this sentence."
      )
    })
    it("returns the string that is passed in if it's a single word, to avoid sentence-casing acronyms", () => {
      expect(convertToSentenceCase("ISSN")).toEqual("ISSN")
    })
  })
  class TestClass {
    value: number
    constructor(value: number) {
      this.value = value
    }
  }
  class ErrorClass {
    constructor() {
      throw new Error("Constructor failed")
    }
  }

  describe("tryInstantiate", () => {
    test("creates instance with correct arguments", () => {
      const instance = tryInstantiate({
        constructor: TestClass,
        args: [42],
        ignoreError: false,
        errorMessage: "Should not throw",
      })
      expect(instance).toBeInstanceOf(TestClass)
      expect(instance?.value).toBe(42)
    })

    test("throws error when constructor fails and ignoreError is false", () => {
      expect(() => {
        tryInstantiate({
          constructor: ErrorClass,
          args: [],
          ignoreError: false,
          errorMessage: "Custom error message",
        })
      }).toThrow("Custom error message")
    })

    test("returns null when constructor fails and ignoreError is true", () => {
      const result = tryInstantiate({
        constructor: ErrorClass,
        args: [],
        ignoreError: true,
        errorMessage: "This message is ignored",
      })
      expect(result).toBeNull()
    })
  })
})
