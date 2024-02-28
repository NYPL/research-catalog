import handler from "../../../../pages/api/account/update-pin/[id]"
import { updatePin } from "../../../../pages/api/account/helpers"
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
    updatePin: jest.fn().mockResolvedValueOnce({
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
    expect(updatePin).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith("No authenticated patron")
  })

  it("should return 403 if logged in patron does not match the patron they are updating", async () => {
    req.query.id = "678910"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(updatePin).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith(
      "Authenticated patron does not match request"
    )
  })

  it("should call updatePin if authentication succeeds", async () => {
    req.query.id = "123456"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(updatePin).toHaveBeenCalled()
  })
})
