import { checkoutRenewal } from "./[...checkouts]"
import sierraClient from "../../../src/server/sierraClient"

jest.mock("../../../src/server/sierraClient")

describe("checkoutRenewal", () => {
  it("should return a success message if renewal is successful", async () => {
    const checkoutId = "123"
    const clientMock = jest
      .fn()
      .mockResolvedValueOnce({ status: 200, data: { message: "Renewed" } })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: clientMock })

    const response = await checkoutRenewal(checkoutId)

    expect(sierraClient).toHaveBeenCalled()
    expect(clientMock).toHaveBeenCalledWith(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    expect(response.status).toBe(200)
    expect(response.message).toBe("Renewed")
  })

  it("should return a 403 error if renewal fails", async () => {
    const checkoutId = "456"
    const clientMock = jest.fn().mockRejectedValueOnce({
      response: {
        status: 403,
        data: {
          message:
            "RENEWAL NOT ALLOWED. Please contact gethelp@nypl.org for assistance",
        },
      },
    })
    ;(sierraClient as jest.Mock).mockResolvedValueOnce({ post: clientMock })

    try {
      await checkoutRenewal(checkoutId)
    } catch (error) {
      expect(sierraClient).toHaveBeenCalled()
      expect(clientMock).toHaveBeenCalledWith(
        `patrons/checkouts/${checkoutId}/renewal`
      )
      expect(error.response.status).toBe(403)
      expect(error.response.data.message).toBe(
        "RENEWAL NOT ALLOWED. Please contact gethelp@nypl.org for assistance"
      )
    }
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

    try {
      await checkoutRenewal(checkoutId)
    } catch (error) {
      expect(sierraClient).toHaveBeenCalled()
      expect(clientMock).toHaveBeenCalledWith(
        `patrons/checkouts/${checkoutId}/renewal`
      )
      expect(error.response.status).toBe(500)
      expect(error.response.data.message).toBe("Server error")
    }
  })
})
