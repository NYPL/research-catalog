import type { HTTPStatusCode } from "../../types/appTypes"
import { logSingleFilterNoResults } from "../logUtils"

jest.mock("@nypl/node-utils", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}))
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
        "search page",
        mock404Result,
        mockSearchParamSingleFilter,
        "http://local.nypl.org:8080/research/research-catalog/bib/b16767329"
      )
      expect(logger.warn).toHaveBeenCalledWith(
        "Warning in Search results gSSP: Link to single filter, no results at search page; referer: http://local.nypl.org:8080/research/research-catalog/bib/b16767329"
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
})
