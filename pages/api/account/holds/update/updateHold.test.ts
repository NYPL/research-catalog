import handler, { holdUpdate } from "./[id]"
import sierraClient from "../../../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../../../src/server/auth"
import type { NextApiRequest, NextApiResponse } from "next"

jest.mock("../../../../../src/server/sierraClient")
jest.mock("../../../../../src/server/auth")

const mockHoldUpdate = (holdUpdateReturnValue = "") => {
  const mockedHoldUpdate = jest.fn(async () => holdUpdateReturnValue)
  jest.mock("./[id]", () => {
    const handler = jest.requireActual("./[id]")
    return { default: handler, holdUpdate: mockedHoldUpdate }
  })
  return mockedHoldUpdate
}

describe("handler", () => {
  let req: Partial<NextApiRequest>
  let res: Partial<NextApiResponse>
  let mockedHoldUpdate: jest.Mock
  beforeEach(() => {
    mockedHoldUpdate = mockHoldUpdate()
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
    expect(mockedHoldUpdate).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith("No authenticated patron")
  })

  it("should return 403 if logged in patron does not match the hold they are updating", async () => {
    req.body.patronId = "678910"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })

    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(mockedHoldUpdate).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith(
      "Authenticated patron does not own this hold"
    )
  })

  it("should call holdUpdate if authentication succeeds", async () => {
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(mockedHoldUpdate).toHaveBeenCalled
  })
})

describe("holdUpdate", () => {
  it("should return a success message if hold is updated", async () => {
    const holdId = "12345"
    const holdData = { freeze: false, pickupLocation: "sn" }
    const clientMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Updated",
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: clientMock })

    const response = await holdUpdate(holdId, holdData)

    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`, holdData)
    expect(response.status).toBe(200)
    expect(response.message).toBe("Updated")
  })

  it("should return a 400 error if request has invalid parameters", async () => {
    const holdId = "12345"
    const holdData = { freeze: false, pickupLocation: "" }
    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          description: "Invalid parameter : New pickup location is invalid.",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: clientMock })

    const response = await holdUpdate(holdId, holdData)
    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`, holdData)
    expect(response.status).toBe(400)
    expect(response.message).toBe(
      "Invalid parameter : New pickup location is invalid."
    )
  })

  it("should return a 500 error if server errors", async () => {
    const holdId = "12345"
    const holdData = { freeze: false, pickupLocation: "sn" }
    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: "Server error",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: clientMock })

    const response = await holdUpdate(holdId, holdData)
    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`, holdData)
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })
})
