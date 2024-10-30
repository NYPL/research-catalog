import { fetchDeliveryLocations, postHoldRequest } from "../hold"
import type { DeliveryLocationsResult } from "../../../types/locationTypes"
import type { HoldPostResult } from "../../../types/holdTypes"

jest.mock("../../nyplApiClient", () => {
  return jest
    .fn()
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest.fn().mockReturnValueOnce({
            itemListElement: [
              {
                deliveryLocation: [
                  {
                    key: "schwarzman",
                    value: "mag",
                    address: "476 Fifth Avenue (42nd St and Fifth Ave)",
                    label: "Schwarzman Building - Milstein Division Room 121",
                  },
                  {
                    key: "lpa",
                    value: "par",
                    address: "40 Lincoln Center Plaza",
                    label: "Library for the Performing Arts",
                  },
                ],
              },
            ],
          }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest.fn().mockReturnValueOnce({
            itemListElement: [
              {
                deliveryLocation: [
                  {
                    key: "schwarzman",
                    value: "mag",
                    address: "476 Fifth Avenue (42nd St and Fifth Ave)",
                    label: "Schwarzman Building - Milstein Division Room 121",
                  },
                  {
                    key: "lpa",
                    value: "par",
                    address: "40 Lincoln Center Plaza",
                    label: "Library for the Performing Arts",
                  },
                ],
                eddRequestable: true,
              },
            ],
          }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: () => {
            throw new Error("Error fetching delivery locations")
          },
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          post: jest.fn().mockReturnValueOnce({
            data: {
              id: "123456",
            },
          }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: () => {
            throw new Error("Error fetching delivery locations")
          },
        })
      })
    })
})

describe("fetchDeliveryLocations", () => {
  it("should return delivery location data from Discovery API", async () => {
    const deliveryLocationResults = (await fetchDeliveryLocations(
      "123",
      "456"
    )) as DeliveryLocationsResult

    expect(deliveryLocationResults.deliveryLocations.length).toEqual(2)
    expect(deliveryLocationResults.eddRequestable).toEqual(false) // eddRequestable should be false by default
    expect(deliveryLocationResults.status).toEqual(200)
  })

  it("should set eddRequestable to true if set in the Discovery Response", async () => {
    const deliveryLocationResults = (await fetchDeliveryLocations(
      "123",
      "456"
    )) as DeliveryLocationsResult

    expect(deliveryLocationResults.deliveryLocations.length).toEqual(2)
    expect(deliveryLocationResults.eddRequestable).toEqual(true)
    expect(deliveryLocationResults.status).toEqual(200)
  })

  // Intentionally throw an error from the NYPLApiClient
  it("should return a 500 status if there was an error", async () => {
    const deliveryLocationResults = (await fetchDeliveryLocations(
      "123",
      "456"
    )) as DeliveryLocationsResult

    // expect(deliveryLocationResults.deliveryLocations.length).toEqual(0)
    expect(deliveryLocationResults.status).toEqual(500)
  })
})

describe("postHoldRequest", () => {
  it("should return delivery location data from Discovery API", async () => {
    const holdPostResult = (await postHoldRequest({
      itemId: "123",
      patronId: "456",
      source: "source",
      pickupLocation: "schwarzman",
    })) as HoldPostResult

    expect(holdPostResult.status).toEqual(200)
    expect(holdPostResult.requestId).toEqual("123456")
  })
  it("should return a 500 status if there was an error", async () => {
    const holdPostResult = (await postHoldRequest({
      itemId: "123",
      patronId: "456",
      source: "source",
      pickupLocation: "schwarzman",
    })) as HoldPostResult

    expect(holdPostResult.status).toEqual(500)
  })
})
