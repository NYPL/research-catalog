import { fetchBib } from "../bib"
import type { BibResponse } from "../../../types/bibTypes"

jest.mock("../../nyplApiClient")
import nyplApiClient from "../../nyplApiClient"

import { logger } from "@nypl/node-utils"
const mockClient = {
  get: jest.fn(),
}

jest.mock("../../../utils/bibServerUtils", () => {
  return {
    ...jest.requireActual("../../../utils/bibServerUtils"),
    isValidBibId: jest.fn().mockReturnValue(true),
  }
})
import * as utils from "../../../utils/bibServerUtils"

const mockBibResponse = (overrides = {}) => ({
  items: [{}],
  numItemsTotal: 1,
  title: ["Cats cats cats cats cats."],
  uri: "b17418167",
  ...overrides,
})

const mockAMResponse = (overrides = {}) => ({
  bib: {
    id: "17418167",
    nyplSource: "sierra-nypl",
    fields: Array(7).fill({}),
  },
  ...overrides,
})

describe("fetchBib", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // clearAllMocks only resets call history, not queued mockResolvedValueOnce/
    // mockRejectedValueOnce implementations, so reset mockClient.get explicitly
    // to prevent unconsumed queued responses from leaking between tests.
    mockClient.get.mockReset()
    ;(nyplApiClient as jest.Mock).mockResolvedValue(mockClient)
  })

  it("returns bib and annotated data with 200 status when URI is present", async () => {
    mockClient.get
      .mockResolvedValueOnce(mockBibResponse())
      .mockResolvedValueOnce(mockAMResponse())

    const bibResponse = (await fetchBib("b17418167")) as BibResponse

    expect(bibResponse.discoveryBibResult.numItemsTotal).toBe(1)
    expect(bibResponse.discoveryBibResult.title).toEqual([
      "Cats cats cats cats cats.",
    ])
    expect(bibResponse.annotatedMarc.id).toBe("17418167")
    expect(bibResponse.annotatedMarc.fields.length).toBe(7)
    expect(bibResponse.status).toBe(200)
  })

  it("accepts an optional item id, and does not return AM on item id", async () => {
    mockClient.get.mockResolvedValueOnce(mockBibResponse())

    const bibResponse = (await fetchBib(
      "b17418167",
      {},
      "i22253043"
    )) as BibResponse

    expect(bibResponse.discoveryBibResult.numItemsTotal).toBe(1)
    expect(bibResponse.annotatedMarc).toBe(null)
    expect(bibResponse.status).toBe(200)
  })

  it("redirects when URI is missing but Sierra call is 200", async () => {
    mockClient.get
      .mockResolvedValueOnce(
        mockBibResponse({ uri: undefined, titleDisplay: ["Some title"] })
      )
      .mockResolvedValueOnce(mockAMResponse())
      .mockResolvedValueOnce({ statusCode: 200 })

    const bibResponse = (await fetchBib("b17418167")) as BibResponse

    expect(logger.warn).toHaveBeenCalledWith(
      "Warning in fetchBib: Missing discoveryBibResult for id b17418167, or id does not match uri on returned result"
    )
    expect(bibResponse.status).toBe(307)
    expect(bibResponse.redirectUrl).toBe(
      "https://borrow.nypl.org/search/card?recordId=17418167"
    )
  })

  it("responds with 404 if bibId is found to be invalid", async () => {
    ;(utils.isValidBibId as jest.Mock).mockReturnValueOnce(false)
    const bibResponse = await fetchBib("null")
    expect(bibResponse.status).toBe(404)
  })

  it("responds with 404 when bib not found and Sierra call fails", async () => {
    mockClient.get
      // Bib
      .mockResolvedValueOnce({
        status: 404,
        name: "NotFoundError",
        error: "Record not found",
      })
      // AM
      .mockResolvedValueOnce({
        status: 404,
        name: "NotFoundError",
        error: "Record not found",
      })
      // Sierra
      .mockResolvedValueOnce({ detail: "Bib with id not found." })

    const bibResponse = (await fetchBib("b17418167")) as BibResponse

    expect(bibResponse.status).toBe(404)
  })

  it("redirects to standardized ID page when ID is non-standard", async () => {
    mockClient.get
      .mockResolvedValueOnce(mockBibResponse())
      .mockResolvedValueOnce(mockAMResponse())

    const bibResponse = (await fetchBib("B17418167")) as BibResponse

    expect(bibResponse.status).toBe(307)
  })

  it("returns 500 and logs the error when client doesnt initialize", async () => {
    const clientError = new Error("Failed to build client")
    ;(nyplApiClient as jest.Mock).mockRejectedValueOnce(clientError)

    const bibResponse = await fetchBib("b17418167")

    expect(bibResponse.status).toBe(500)
    expect((bibResponse as any).error).toBe("Failed to build client")
    expect(logger.error).toHaveBeenCalledWith(
      "Error in fetchBib: Error: Failed to build client"
    )
    expect(mockClient.get).not.toHaveBeenCalled()
  })

  it("returns 500 and logs the error when the bib GET request fails", async () => {
    const bibError = new Error(
      "Unexpected token '<', \"<doctype \"... is not valid JSON"
    )
    mockClient.get
      .mockRejectedValueOnce(bibError)
      .mockResolvedValueOnce(mockAMResponse())

    const bibResponse = await fetchBib("b17418167")

    expect(bibResponse.status).toBe(500)
    expect((bibResponse as any).error).toBe(bibError.message)
    expect(logger.error).toHaveBeenCalledWith(`Error in fetchBib: ${bibError}`)
  })

  it("returns 500 and logs the error when the annotated marc GET request fails", async () => {
    const annotatedMarcError = new Error(
      "Unexpected token '<', \"<doctype \"... is not valid JSON"
    )
    mockClient.get
      .mockResolvedValueOnce(mockBibResponse())
      .mockRejectedValueOnce(annotatedMarcError)

    const bibResponse = await fetchBib("b17418167")

    expect(bibResponse.status).toBe(500)
    expect((bibResponse as any).error).toBe(annotatedMarcError.message)
    expect(logger.error).toHaveBeenCalledWith(
      `Error in fetchBib: ${annotatedMarcError}`
    )
  })
})
