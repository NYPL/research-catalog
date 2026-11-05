import type { HTTPStatusCode } from "../../types/appTypes"
import { logSingleFilterNoResults, redactSensitiveFields } from "../logUtils"

import { logger } from "@nypl/node-utils"

const mock404Result = {
  status: 404 as HTTPStatusCode,
}
const mockSearchParamSingleFilter = {
  filters: {
    language: ["lang:rus"],
  },
}

describe("logUtils", () => {
  describe("logSingleFilterNoResults", () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    it("logs the correct warning if conditions apply", () => {
      logSingleFilterNoResults(
        "search page gSSP",
        mock404Result,
        mockSearchParamSingleFilter,
        "http://local.nypl.org:8080/research/research-catalog/bib/b16767329"
      )
      expect(logger.warn).toHaveBeenCalledWith(
        "Warning in search page gSSP: Link to single filter, no results; referer: http://local.nypl.org:8080/research/research-catalog/bib/b16767329"
      )
    })
    it("doesn't log when referer is undefined", () => {
      logSingleFilterNoResults(
        "search page",
        mock404Result,
        mockSearchParamSingleFilter,
        undefined
      )
      expect(logger.warn).toHaveBeenCalledTimes(0)
    })
  })

  describe("redactSensitiveFields", () => {
    it("redacts a top-level sensitive field", () => {
      expect(redactSensitiveFields({ pin: "1234", barcode: "999" })).toEqual({
        pin: "*****",
        barcode: "999",
      })
    })

    it("redacts multiple sensitive fields", () => {
      expect(
        redactSensitiveFields({
          oldPin: "1111",
          newPin: "2222",
          password: "hunter2",
          patronId: "123",
          patron: "123",
          email: "a@test.com",
          emails: ["a@test.com"],
          emailAddress: "a@test.com",
          phone: "555-5555",
          phones: ["555-5555"],
          phoneNumber: "555-5555",
          safeToLog: "here",
        })
      ).toEqual({
        oldPin: "*****",
        newPin: "*****",
        password: "*****",
        patronId: "*****",
        patron: "*****",
        email: "*****",
        emails: "*****",
        emailAddress: "*****",
        phone: "*****",
        phones: "*****",
        phoneNumber: "*****",
        safeToLog: "here",
      })
    })

    it("redacts hold id fields", () => {
      expect(
        redactSensitiveFields({
          sierraHoldId: "12345",
          holdId: "12345",
          requestId: "123456",
          type: "freeze",
        })
      ).toEqual({
        sierraHoldId: "*****",
        holdId: "*****",
        requestId: "*****",
        type: "freeze",
      })
    })

    it("redacts sensitive fields nested in objects", () => {
      expect(
        redactSensitiveFields({
          requestType: "edd",
          docDeliveryData: {
            emailAddress: "a@test.com",
            chapterTitle: "ch 1",
          },
        })
      ).toEqual({
        requestType: "edd",
        docDeliveryData: {
          emailAddress: "*****",
          chapterTitle: "ch 1",
        },
      })
    })

    it("redacts sensitive fields nested in arrays", () => {
      expect(
        redactSensitiveFields({
          patrons: [{ patronId: "1" }, { patronId: "2" }],
        })
      ).toEqual({
        patrons: [{ patronId: "*****" }, { patronId: "*****" }],
      })
    })

    it("leaves non-sensitive fields untouched", () => {
      const body = { itemId: "i1", bibId: "b1", pickupLocation: "loc1" }
      expect(redactSensitiveFields(body)).toEqual(body)
    })

    it("returns primitives and null/undefined unchanged", () => {
      expect(redactSensitiveFields(null)).toBeNull()
      expect(redactSensitiveFields(undefined)).toBeUndefined()
      expect(redactSensitiveFields("a string")).toBe("a string")
      expect(redactSensitiveFields(42)).toBe(42)
    })
  })
})
