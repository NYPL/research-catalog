import { fetchSubjects } from "../browse"
import type { DiscoverySubjectsResponse } from "../../../types/browseTypes"

jest.mock("../../nyplApiClient")
import nyplApiClient from "../../nyplApiClient"

const mockClient = {
  get: jest.fn(),
}

beforeEach(() => {
  jest.clearAllMocks()
  ;(nyplApiClient as jest.Mock).mockResolvedValue(mockClient)
})

describe("fetchSubjects", () => {
  it("fetches valid subject heading results", async () => {
    mockClient.get.mockResolvedValue({
      subjects: [{}, {}, {}, {}],
      totalResults: 4,
    })

    const response = (await fetchSubjects({
      q: "cat",
    })) as DiscoverySubjectsResponse

    expect(response.subjects.length).toBe(4)
  })

  it("returns 500 if the client fails to initialize", async () => {
    ;(nyplApiClient as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Bad API URL")
    })

    const response = await fetchSubjects({ q: "cat" })
    expect(response).toEqual({ status: 500, message: "Bad API URL" })
  })

  it("returns 500 if API call fails", async () => {
    mockClient.get.mockRejectedValueOnce(new Error("Results error"))

    const response = await fetchSubjects({ q: "cat" })
    expect(response).toEqual({
      status: 500,
      message: expect.stringContaining("Results error"),
    })
  })

  it("handles 404 response", async () => {
    mockClient.get.mockResolvedValueOnce({
      status: 404,
      message: "Not found",
    })

    const response = await fetchSubjects({ q: "unknown" })
    expect(response).toEqual({ status: 404, message: "Not found" })
  })

  it("handles valid response but no results", async () => {
    mockClient.get.mockResolvedValueOnce({
      subjects: [],
      totalResults: 0,
    })

    const response = await fetchSubjects({ q: "empty" })
    expect(response).toEqual({ status: 404, message: "No subjects found" })
  })
})
