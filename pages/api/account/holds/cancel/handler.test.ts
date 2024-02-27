import handler from "./[id]"
import holdCancel from "./cancelHold"
import initializePatronTokenAuth from "../../../../../src/server/auth"
import type { NextApiRequest, NextApiResponse } from "next"

jest.mock("../../../../../src/server/sierraClient")
jest.mock("../../../../../src/server/auth")
jest.mock("./cancelHold")

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
    expect(holdCancel).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith("No authenticated patron")
  })

  it("should return 403 if logged in patron does not match the hold they are deleting", async () => {
    req.body.patronId = "678910"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(holdCancel).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith(
      "Authenticated patron does not own this hold"
    )
  })

  it("should call holdCancel if authentication succeeds", async () => {
    req.body.patronId = "123456"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    ;(holdCancel as jest.Mock).mockResolvedValueOnce({
      status: "200",
      message: "test",
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(holdCancel).toHaveBeenCalled()
  })
})
