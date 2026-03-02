import { fetchMarc } from "../marc"
import type { MarcResponse } from "../../../types/marcTypes"

jest.mock("../../nyplApiClient")
import nyplApiClient from "../../nyplApiClient"

const mockClient = {
  get: jest.fn(),
}

const mockMarcResponse = (overrides = {}) => ({
  bib: {
    id: "17418167",
    nyplSource: "sierra-nypl",
    fields: Array(7).fill({}),
    ...overrides,
  },
})

describe("fetchMarc", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(nyplApiClient as jest.Mock).mockResolvedValue(mockClient)
  })

  it("returns marc with 200 status", async () => {
    mockClient.get.mockResolvedValueOnce(mockMarcResponse())

    const marcResponse = (await fetchMarc("b17418167")) as MarcResponse

    expect(marcResponse.discoveryMarcResult.bib.id).toBe("17418167")
    expect(marcResponse.discoveryMarcResult.bib.nyplSource).toEqual(
      "sierra-nypl"
    )
    expect(marcResponse.status).toBe(200)
  })

  it("responds with 404 when marc is not found", async () => {
    mockClient.get
      // Marc not found
      .mockResolvedValueOnce({
        status: 404,
        name: "NotFoundError",
        error: "Record not found",
      })

    const marcResponse = (await fetchMarc("b17418167")) as MarcResponse

    expect(marcResponse.status).toBe(404)
  })
})
