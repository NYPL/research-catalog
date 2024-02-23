import handler, { pinUpdate } from "./[id]"
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
    expect(pinUpdate).not.toHaveBeenCalled
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith("No authenticated patron")
  })

  it("should return 403 if logged in patron does not match the patron they are updating", async () => {
    req.query.id = "678910"
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(pinUpdate).not.toHaveBeenCalled
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith(
      "Authenticated patron does not match request"
    )
  })

  it("should call pinUpdate if authentication succeeds", async () => {
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      decodedPatron: { sub: "123456" },
    })
    await handler(req as NextApiRequest, res as NextApiResponse)
    expect(pinUpdate).toHaveBeenCalled
  })
})

describe("pinUpdate", () => {
  it("should return a success message if pin is updated", async () => {
    const patronId = "12345"
    const patronBarcode = "123456789"
    const oldPin = "1234"
    const newPin = "6789"

    const clientMock = jest
      .fn()
      .mockResolvedValueOnce({
        status: 200,
      })
      .mockResolvedValueOnce({
        status: 200,
        message: `Pin updated to ${newPin}`,
      })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      post: clientMock,
      put: clientMock,
    })

    const response = await pinUpdate(patronId, patronBarcode, oldPin, newPin)

    expect(sierraClient).toHaveBeenCalled
    expect(clientMock).toHaveBeenNthCalledWith(1, "patrons/validate", {
      barcode: patronBarcode,
      pin: oldPin,
    })
    expect(clientMock).toHaveBeenNthCalledWith(2, `patrons/${patronId}`, {
      pin: newPin,
    })
    expect(response.status).toBe(200)
    expect(response.message).toBe(`Pin updated to ${newPin}`)
  })

  it("should return a 400 error if pin is incorrect", async () => {
    const patronId = "12345"
    const patronBarcode = "123456789"
    const oldPin = "1234"
    const newPin = "6789"

    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 400,
        data: { description: "Invalid parameter : Invalid barcode or PIN" },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      post: clientMock,
    })

    const response = await pinUpdate(patronId, patronBarcode, oldPin, newPin)

    expect(sierraClient).toHaveBeenCalled
    expect(clientMock).toHaveBeenCalledWith("patrons/validate", {
      barcode: patronBarcode,
      pin: oldPin,
    })
    expect(response.status).toBe(400)
    expect(response.message).toBe("Invalid parameter : Invalid barcode or PIN")
  })

  it("should return a 500 error if server errors", async () => {
    const patronId = "12345"
    const patronBarcode = "123456789"
    const oldPin = "1234"
    const newPin = "6789"

    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
        data: { message: "Server error" },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      post: clientMock,
    })

    const response = await pinUpdate(patronId, patronBarcode, oldPin, newPin)

    expect(sierraClient).toHaveBeenCalled
    expect(clientMock).toHaveBeenCalledWith("patrons/validate", {
      barcode: patronBarcode,
      pin: oldPin,
    })
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })
})
