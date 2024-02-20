import { checkoutRenewal } from "./[...id]"
import type { NextApiResponse } from "next"
import sierraClient from "../../../src/server/sierraClient"

jest.mock("../../../src/server/sierraClient")

describe("checkoutRenewal", () => {
  let mockStatus: any
  let mockJson: any
  let mockRes: NextApiResponse

  beforeEach(() => {
    jest.clearAllMocks()
    mockStatus = jest.fn().mockReturnThis()
    mockJson = jest.fn()
    mockRes = {
      status: mockStatus,
      json: mockJson,
    } as unknown as NextApiResponse
  })

  it("should return a success message if renewal is successful", async () => {
    const checkoutId = "123"
    const clientMock = jest
      .fn()
      .mockResolvedValueOnce({ status: 200, message: "Renewed!" })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: clientMock })

    await checkoutRenewal(mockRes, checkoutId)

    expect(clientMock).toHaveBeenCalledWith(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    expect(mockStatus).toHaveBeenCalledWith(200)
    expect(mockJson).toHaveBeenCalledWith({ message: "Renewed!" })
  })

  it("should return a 403 error if renewal fails", async () => {
    const checkoutId = "456"
    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 403,
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: clientMock })

    await checkoutRenewal(mockRes, checkoutId)

    expect(clientMock).toHaveBeenCalledWith(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    expect(mockStatus).toHaveBeenCalledWith(403)
    expect(mockJson).toHaveBeenCalledWith({
      message:
        "RENEWAL NOT ALLOWED. Please contact gethelp@nypl.org for assistance.",
    })
  })

  it("should return a 500 error if server fails", async () => {
    const checkoutId = "789"
    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: clientMock })

    await checkoutRenewal(mockRes, checkoutId)

    expect(clientMock).toHaveBeenCalledWith(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    expect(mockStatus).toHaveBeenCalledWith(500)
    expect(mockJson).toHaveBeenCalledWith({
      message: "Server error",
    })
  })
})
