import handler, { holdCancel } from "./[id]"
import sierraClient from "../../../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../../../src/server/auth"
import type { NextApiRequest, NextApiResponse } from "next"

jest.mock("../../../../../src/server/sierraClient")
jest.mock("../../../../../src/server/auth")

describe("handler", () => {
  let req: Partial<NextApiRequest>
  let res: Partial<NextApiResponse>

  beforeEach(() => {
    req = {
      cookies: {},
      method: "POST",
      query: {},
      body: {},
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
  })

  it("should return 403 if no authenticated patron", async () => {
    req.body.patronId = "123456"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: null,
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(holdCancel).not.toHaveBeenCalled
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith("No authenticated patron")
  })

  it("should return 403 if logged in patron does not match the hold they are deleting", async () => {
    req.body.patronId = "678910"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(holdCancel).not.toHaveBeenCalled
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith(
      "Authenticated patron does not own this hold"
    )
  })

  it("should call holdCancel if authentication succeeds", async () => {
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(holdCancel).toHaveBeenCalled
  })
})

describe("holdCancel", () => {
  it("should return a success message if hold is deleted", async () => {
    const holdId = "12345"
    const clientMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Deleted",
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      deleteRequest: clientMock,
    })

    const response = await holdCancel(holdId)

    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`)
    expect(response.status).toBe(200)
    expect(response.message).toBe("Deleted")
  })

  it("should return a 404 error if hold DNE", async () => {
    const holdId = "12345"
    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          name: "Record not found.",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      deleteRequest: clientMock,
    })

    const response = await holdCancel(holdId)
    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`)
    expect(response.status).toBe(404)
    expect(response.message).toBe("Record not found.")
  })

  it("should return a 500 error if server errors", async () => {
    const holdId = "12345"
    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          name: "Server error",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      deleteRequest: clientMock,
    })

    const response = await holdCancel(holdId)
    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`)
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })
})
