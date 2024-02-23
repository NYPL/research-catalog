import handler, { checkoutRenewal } from "./[id]"
import sierraClient from "../../../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../../../src/server/auth"
import type { NextApiRequest, NextApiResponse } from "next"

jest.mock("../../../../../src/server/sierraClient")
jest.mock("../../../../../src/server/auth")

const mockCheckoutResponse = {
  id: "1234567",
  callNumber: "123 TEST",
  barcode: "1234567890",
  dueDate: "2024-03-12T08:00:00Z",
  patron: "6742743",
  title: "The test checkout : poems",
  isResearch: false,
  bibId: "123456",
  isNyplOwned: true,
}

describe("handler", () => {
  let req: Partial<NextApiRequest>
  let res: Partial<NextApiResponse>

  beforeEach(() => {
    req = {
      cookies: {},
      method: "POST",
      query: { id: "123456" },
      body: {},
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it("should return 403 if no authenticated patron", async () => {
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: null,
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(checkoutRenewal).not.toHaveBeenCalled
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith("No authenticated patron")
  })

  it("should return 403 if logged in patron does not own the checkout", async () => {
    const checkoutPatronId = "678910"
    req.body = checkoutPatronId
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(checkoutRenewal).not.toHaveBeenCalled
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith(
      "Authenticated patron does not own this checkout"
    )
  })

  it("should call checkoutRenewal if authentication succeeds", async () => {
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(checkoutRenewal).toHaveBeenCalled
  })
})

describe("checkoutRenewal", () => {
  it("should return a success message, and the checkout, if renewal is successful", async () => {
    const checkoutId = "123"
    const clientMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Renewed",
      body: mockCheckoutResponse,
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: clientMock })

    const response = await checkoutRenewal(checkoutId)

    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    expect(response.body.status).toBe(200)
    expect(response.body.message).toBe("Renewed")
    expect(response.body.body).toBe(mockCheckoutResponse)
  })

  it("should return a 500 error if server errors", async () => {
    const checkoutId = "789"
    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: "Server error",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: clientMock })

    const response = await checkoutRenewal(checkoutId)
    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })

  it("should return a 403 error if renewal fails", async () => {
    const checkoutId = "456"
    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 403,
        data: {
          description:
            "RENEWAL NOT ALLOWED. Please contact gethelp@nypl.org for assistance",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: clientMock })

    const response = await checkoutRenewal(checkoutId)
    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    expect(response.status).toBe(403)
    expect(response.message).toBe(
      "RENEWAL NOT ALLOWED. Please contact gethelp@nypl.org for assistance"
    )
  })
})
