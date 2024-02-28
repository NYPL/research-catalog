import sierraClient from "../../../src/server/sierraClient"
import {
  updatePin,
  updateSettings,
  updateHold,
  renewCheckout,
  cancelHold,
} from "./helpers"

jest.mock("../../../src/server/sierraClient")
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

describe("cancelHold", () => {
  it("should return a success message if hold is deleted", async () => {
    const holdId = "12345"
    const clientMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Deleted",
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      deleteRequest: clientMock,
    })

    const response = await cancelHold(holdId)

    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`)
    expect(response.status).toBe(200)
    expect(response.message).toBe("Cancelled")
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

    const response = await cancelHold(holdId)
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

    const response = await cancelHold(holdId)
    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`)
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })
})

describe("updateHold", () => {
  it("should return a success message if hold is updated", async () => {
    const holdId = "12345"
    const holdData = { freeze: false, pickupLocation: "sn" }
    const clientMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Updated",
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: clientMock })

    const response = await updateHold(holdId, holdData)

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

    const response = await updateHold(holdId, holdData)
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

    const response = await updateHold(holdId, holdData)
    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`, holdData)
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })
})

describe("updateSettings", () => {
  it("should return a success message if settings are updated", async () => {
    const patronId = "12345"
    const patronData = { emails: ["fake"] }
    const clientMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Updated",
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: clientMock })

    const response = await updateSettings(patronId, patronData)

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

    const response = await updateSettings(patronId, patronData)
    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(`patrons/${patronId}`, patronData)
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })
})

describe("updatePin", () => {
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

    const response = await updatePin(patronId, patronBarcode, oldPin, newPin)

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

    const response = await updatePin(patronId, patronBarcode, oldPin, newPin)

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

    const response = await updatePin(patronId, patronBarcode, oldPin, newPin)

    expect(sierraClient).toHaveBeenCalled
    expect(clientMock).toHaveBeenCalledWith("patrons/validate", {
      barcode: patronBarcode,
      pin: oldPin,
    })
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })
})

describe("renewCheckout", () => {
  it("should return a success message, and the checkout, if renewal is successful", async () => {
    const checkoutId = "123"
    const clientMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Renewed",
      body: mockCheckoutResponse,
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: clientMock })

    const response = await renewCheckout(checkoutId)

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

    const response = await renewCheckout(checkoutId)
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

    const response = await renewCheckout(checkoutId)
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
