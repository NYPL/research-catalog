import handler from "../../../../pages/api/account/holds/cancel/[id]"
import { cancelHold } from "../../../../pages/api/account/helpers"
import initializePatronTokenAuth from "../../auth"
import type { NextApiRequest, NextApiResponse } from "next"

jest.mock("../../auth")
jest.mock("../../../../pages/api/account/helpers", () => {
  const originalModule = jest.requireActual(
    "../../../../pages/api/account/helpers"
  )
  return {
    __esModule: true,
    ...originalModule,
    cancelHold: jest.fn().mockResolvedValueOnce({
      status: "200",
      message: "test",
    }),
  }
})

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
    expect(cancelHold).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith("No authenticated patron")
  })

  it("should return 403 if logged in patron does not match the hold they are deleting", async () => {
    req.body.patronId = "678910"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(cancelHold).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith(
      "Authenticated patron does not own this hold"
    )
  })

  it("should call cancelHold if authentication succeeds", async () => {
    req.body.patronId = "123456"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(cancelHold).toHaveBeenCalled()
  })
})
