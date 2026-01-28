import sierraClient from "../../../src/server/sierraClient"
import nyplApiClient from "../nyplApiClient"
import {
  updatePin,
  updatePatronSettings,
  updateHold,
  renewCheckout,
  cancelHold,
  updateUsername,
} from "../../../pages/api/account/helpers"
import logger from "../../../lib/logger"

jest.mock("../../../src/server/sierraClient")
jest.mock("../../../src/server/nyplApiClient")

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
  it("should return a success message if hold is canceled", async () => {
    logger.info = jest.fn()
    const holdId = "12345"
    const methodMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Deleted",
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      deleteRequest: methodMock,
    })

    const response = await cancelHold(holdId, {
      patronId: "123",
      itemId: "123",
      patronBarcode: "patronBarcode",
    })

    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`)
    expect(response.status).toBe(200)
    expect(response.message).toBe("Canceled")
    // @ts-ignore
    expect(logger.info.mock.calls).toEqual([
      [
        "My account cancel hold request",
        {
          itemId: "123",
          patronBarcode: "patronBarcode",
          patronId: "123",
          sierraHoldId: "12345",
        },
      ],
    ])
  })

  it("should return a 404 error if hold DNE", async () => {
    const holdId = "12345"
    const methodMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          name: "Record not found.",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      deleteRequest: methodMock,
    })

    const response = await cancelHold(holdId, {})
    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`)
    expect(response.status).toBe(404)
    expect(response.message).toBe("Record not found.")
  })

  it("should return a 500 error if server errors", async () => {
    logger.info = jest.fn()
    const holdId = "12345"
    const methodMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          name: "Server error",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      deleteRequest: methodMock,
    })

    const response = await cancelHold(holdId, {
      itemId: "123",
      patronBarcode: "patronBarcode",
      patronId: "123",
      sierraHoldId: "12345",
    })
    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`)
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
    expect(logger.info).toHaveBeenCalledTimes(2)
    // @ts-ignore
    expect(logger.info.mock.calls[1]).toEqual([
      "My account cancel hold request failed",
      {
        itemId: "123",
        patronBarcode: "patronBarcode",
        patronId: "123",
        sierraHoldId: "12345",
        status: 500,
      },
    ])
  })
})

describe("updateHold", () => {
  it("should return a success message if hold is updated", async () => {
    const holdId = "12345"
    const holdData = { freeze: false, pickupLocation: "sn" }
    const methodMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Updated",
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: methodMock })

    const response = await updateHold(holdId, holdData, {
      patronId: "123",
      itemId: "456",
    })

    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`, holdData)
    expect(response.status).toBe(200)
    expect(response.message).toBe("Updated")
  })

  it("should return a 400 error if request has invalid parameters", async () => {
    const holdId = "12345"
    const holdData = { freeze: false, pickupLocation: "" }
    const methodMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          description: "Invalid parameter : New pickup location is invalid.",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: methodMock })

    const response = await updateHold(holdId, holdData, {
      patronId: "123",
      itemId: "456",
    })
    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`, holdData)
    expect(response.status).toBe(400)
    expect(response.message).toBe(
      "Invalid parameter : New pickup location is invalid."
    )
  })

  it("should return a 500 error if server errors", async () => {
    const holdId = "12345"
    const holdData = { freeze: false, pickupLocation: "sn" }
    const methodMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: "Server error",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: methodMock })

    const response = await updateHold(holdId, holdData, {
      patronId: "123",
      itemId: "456",
    })
    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(`patrons/holds/${holdId}`, holdData)
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })
})

describe("updatePatronSettings", () => {
  it("should return a success message if settings are updated", async () => {
    const patronId = "12345"
    const patronData = { emails: ["fake"] }
    const methodMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Updated",
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: methodMock })

    const response = await updatePatronSettings(patronId, patronData)

    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(`patrons/${patronId}`, patronData)
    expect(response.status).toBe(200)
    expect(response.message).toBe("Updated")
  })

  it("should return a 500 error if server errors", async () => {
    const patronId = "12345"
    const patronData = { emails: ["fake"] }
    const methodMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: "Server error",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ put: methodMock })

    const response = await updatePatronSettings(patronId, patronData)
    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(`patrons/${patronId}`, patronData)
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

    const methodMock = jest
      .fn()
      .mockResolvedValueOnce({
        status: 200,
      })
      .mockResolvedValueOnce({
        status: 200,
        message: `Pin updated to ${newPin}`,
      })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      post: methodMock,
      put: methodMock,
    })

    const response = await updatePin(patronId, patronBarcode, oldPin, newPin)

    expect(sierraClient).toHaveBeenCalled
    expect(methodMock).toHaveBeenNthCalledWith(1, "patrons/validate", {
      barcode: patronBarcode,
      pin: oldPin,
    })
    expect(methodMock).toHaveBeenNthCalledWith(2, `patrons/${patronId}`, {
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

    const methodMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 400,
        data: { description: "Invalid parameter : Invalid barcode or PIN" },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      post: methodMock,
    })

    const response = await updatePin(patronId, patronBarcode, oldPin, newPin)

    expect(sierraClient).toHaveBeenCalled
    expect(methodMock).toHaveBeenCalledWith("patrons/validate", {
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

    const methodMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
        data: { message: "Server error" },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      post: methodMock,
    })

    const response = await updatePin(patronId, patronBarcode, oldPin, newPin)

    expect(sierraClient).toHaveBeenCalled
    expect(methodMock).toHaveBeenCalledWith("patrons/validate", {
      barcode: patronBarcode,
      pin: oldPin,
    })
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })
})

describe("updateUsername", () => {
  it("should return a success message if username is updated", async () => {
    const newUsername = "newUsername"
    const patronId = "678910"

    const platformMethodMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      type: "available-username",
    })
    ;(nyplApiClient as jest.Mock).mockResolvedValueOnce({
      post: platformMethodMock,
    })

    const sierraMethodMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: `Username updated to ${newUsername}`,
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({
      put: sierraMethodMock,
    })

    const response = await updateUsername(patronId, newUsername)

    expect(nyplApiClient).toHaveBeenCalled
    expect(platformMethodMock).toHaveBeenNthCalledWith(
      1,
      "/validations/username",
      {
        username: newUsername,
      }
    )

    expect(sierraClient).toHaveBeenCalled
    expect(sierraMethodMock).toHaveBeenNthCalledWith(1, `patrons/${patronId}`, {
      varFields: [{ fieldTag: "u", content: newUsername }],
    })

    expect(response.status).toBe(200)
    expect(response.message).toBe(`Username updated to ${newUsername}`)
  })

  it("should return a message if username is already taken or invalid", async () => {
    const alreadyTakenUsername = "alreadyTakenUsername"
    const patronId = "678910"

    const platformMethodMock = jest.fn().mockResolvedValueOnce({
      status: 400,
      type: "unavailable-username",
      title: "Bad Username",
      detail:
        "Usernames should be 5-25 characters, letters or numbers only. Please revise your username.",
    })
    ;(nyplApiClient as jest.Mock).mockResolvedValueOnce({
      post: platformMethodMock,
    })

    const response = await updateUsername(patronId, alreadyTakenUsername)

    expect(nyplApiClient).toHaveBeenCalled
    expect(platformMethodMock).toHaveBeenNthCalledWith(
      1,
      "/validations/username",
      {
        username: alreadyTakenUsername,
      }
    )

    expect(sierraClient).not.toHaveBeenCalled

    expect(response.status).toBe(200)
    expect(response.message).toBe("Username taken")
  })

  it("should return an error if there's a server error", async () => {
    const newUsername = "newUsername"
    const patronId = "678910"

    const platformMethodMock = jest.fn().mockResolvedValueOnce({
      status: 502,
      type: "ils-integration-error",
    })
    ;(nyplApiClient as jest.Mock).mockResolvedValueOnce({
      post: platformMethodMock,
    })

    const response = await updateUsername(patronId, newUsername)

    expect(nyplApiClient).toHaveBeenCalled
    expect(platformMethodMock).toHaveBeenNthCalledWith(
      1,
      "/validations/username",
      {
        username: newUsername,
      }
    )

    expect(sierraClient).not.toHaveBeenCalled

    expect(response.status).toBe(500)
    expect(response.message).toBe("Username update failed")
  })
})

describe("renewCheckout", () => {
  it("should return a success message, and the checkout, if renewal is successful", async () => {
    const checkoutId = "123"
    const methodMock = jest.fn().mockResolvedValueOnce({
      status: 200,
      message: "Renewed",
      body: mockCheckoutResponse,
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: methodMock })

    const response = await renewCheckout(checkoutId)

    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    expect(response.body.status).toBe(200)
    expect(response.body.message).toBe("Renewed")
    expect(response.body.body).toBe(mockCheckoutResponse)
  })

  it("should return a 500 error if server errors", async () => {
    const checkoutId = "789"
    const methodMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: "Server error",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: methodMock })

    const response = await renewCheckout(checkoutId)
    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    expect(response.status).toBe(500)
    expect(response.message).toBe("Server error")
  })

  it("should return a 403 error if renewal fails", async () => {
    const checkoutId = "456"
    const methodMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 403,
        data: {
          description:
            "RENEWAL NOT ALLOWED. Please contact gethelp@nypl.org for assistance",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: methodMock })

    const response = await renewCheckout(checkoutId)
    expect(sierraClient).toHaveBeenCalled()
    expect(methodMock).toHaveBeenCalledWith(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    expect(response.status).toBe(403)
    expect(response.message).toBe(
      "RENEWAL NOT ALLOWED. Please contact gethelp@nypl.org for assistance"
    )
  })
})
