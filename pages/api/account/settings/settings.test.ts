import handler, { settingsUpdate } from "./[id]"
import sierraClient from "../../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../../src/server/auth"
import type { NextApiRequest, NextApiResponse } from "next"

jest.mock("../../../../src/server/sierraClient")
jest.mock("../../../../src/server/auth")

describe("handler", () => {
  let req: Partial<NextApiRequest>
  let res: Partial<NextApiResponse>

  beforeEach(() => {
    req = {
      cookies: {},
      method: "PUT",
      query: {},
      body: {},
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it("should return 403 if no authenticated patron", async () => {
    req.query.id = "123456"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: null,
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(settingsUpdate).not.toHaveBeenCalled
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith("No authenticated patron")
  })

  it("should return 403 if logged in patron does not match the patron they are updating", async () => {
    req.query.id = "678910"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(settingsUpdate).not.toHaveBeenCalled
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith(
      "Authenticated patron does not match request"
    )
  })

  it("should call settingsUpdate if authentication succeeds", async () => {
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(settingsUpdate).toHaveBeenCalled
  })
})

describe("settingsUpdate", () => {
  it("should return a success message if settings are updated", async () => {
    const patronId = "12345"
    const patronData = { emails: ["fake"] }
    const clientMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Updated",
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: clientMock })

    const response = await settingsUpdate(patronId, patronData)

    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/${patronId}`, patronData)
    expect(response.status).toBe(200)
    expect(response.message).toBe("Updated")
  })

  it("should return a 500 error if server errors", async () => {
    const patronId = "12345"
    const patronData = { emails: ["fake"] }
    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: "Server error",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: clientMock })

    try {
      await settingsUpdate(patronId, patronData)
    } catch (error) {
      expect(sierraClient).toHaveBeenCalled()
      expect(clientMock).toHaveBeenCalledWith(`patrons/${patronId}`, patronData)
      expect(error.response.status).toBe(500)
      expect(error.response.data.message).toBe("Server error")
    }
  })
})
