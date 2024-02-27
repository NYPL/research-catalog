import { adobeAnalyticsRouteToPageName, encodeHTML } from "../appUtils"
import {
  ADOBE_ANALYTICS_RC_PREFIX,
  ADOBE_ANALYTICS_PAGE_NAMES,
} from "../../config/constants"

describe("appUtils", () => {
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
})
