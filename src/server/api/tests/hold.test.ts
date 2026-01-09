import {
  fetchDeliveryLocations,
  postHoldRequest,
  postEDDRequest,
  fetchHoldDetails,
  fetchPatronEligibility,
} from "../hold"
import type { DeliveryLocationsResult } from "../../../types/locationTypes"
import type {
  HoldPostResult,
  HoldDetailsResult,
  PatronEligibilityStatus,
} from "../../../types/holdPageTypes"

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
                    "@id": "loc:mal17",
                    prefLabel: "Schwarzman Building - Scholar Room 217",
                  },
                  {
                    "@id": "loc:mab",
                    prefLabel:
                      "Schwarzman Building - Art & Architecture Room 300",
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
                    "@id": "loc:mal17",
                    prefLabel: "Schwarzman Building - Scholar Room 217",
                  },
                  {
                    "@id": "loc:mab",
                    prefLabel:
                      "Schwarzman Building - Art & Architecture Room 300",
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
          post: () => {
            throw new Error("Error posting EDD request")
          },
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest.fn().mockReturnValueOnce({
            data: {
              id: "123",
              patron: "456",
              pickupLocation: "mal17",
            },
          }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: () => {
            throw new Error("Error getting hold details")
          },
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest.fn().mockReturnValueOnce({
            eligibility: true,
            expired: false,
            moneyOwed: false,
            ptypeDisallowsHolds: false,
            reachedHoldLimit: false,
          }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest.fn().mockReturnValueOnce({
            eligibility: false,
            expired: true,
            moneyOwed: true,
            ptypeDisallowsHolds: false,
            reachedHoldLimit: false,
          }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: () => {
            throw new Error("Error getting patron eligibility status")
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

  it.todo(
    "Add tests for filtering out locations that are not listed in NYPL_LOCATIONS constant (staff-only)"
  )
})

describe("postHoldRequest", () => {
  it("should return delivery location data from Discovery API", async () => {
    const holdPostResult = (await postHoldRequest({
      itemId: "123",
      patronId: "456",
      source: "source",
      bibId: "789",
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
      bibId: "789",
      pickupLocation: "schwarzman",
    })) as HoldPostResult

    expect(holdPostResult.status).toEqual(500)
  })
})

describe("postEDDRequest", () => {
  it("should return a hold request ID from Discovery API", async () => {
    const eddPostResult = (await postEDDRequest({
      itemId: "123",
      patronId: "456",
      source: "source",
      bibId: "789",
      emailAddress: "test@test.com",
      startPage: "1",
      endPage: "2",
      chapterTitle: "Chapter 1",
    })) as HoldPostResult

    expect(eddPostResult.status).toEqual(200)
    expect(eddPostResult.requestId).toEqual("123456")
  })

  it("should return a 500 status if there was an error", async () => {
    const holdPostResult = (await postHoldRequest({
      itemId: "123",
      patronId: "456",
      source: "source",
      bibId: "789",
      // @ts-ignore: Invalid pick up location for a non EDD hold.
      pickupLocation: "edd",
    })) as HoldPostResult

    expect(holdPostResult.status).toEqual(500)
  })
})

describe("fetchHoldDetails", () => {
  it("should return details for a given hold request ID from Discovery API", async () => {
    const holdDetails = (await fetchHoldDetails("123")) as HoldDetailsResult
    expect(holdDetails).toEqual({
      requestId: "123",
      patronId: "456",
      pickupLocation: "mal17",
      status: 200,
    })
  })

  it("should return return a 500 status if there was an error", async () => {
    const holdDetails = (await fetchHoldDetails("123")) as HoldDetailsResult
    expect(holdDetails.status).toEqual(500)
  })
})

describe("fetchPatronEligibility", () => {
  it("should return a patron's hold eligibility status from Discovery API", async () => {
    const patonEligibility = (await fetchPatronEligibility(
      "123"
    )) as PatronEligibilityStatus

    expect(patonEligibility).toEqual({
      status: 200,
      eligibility: true,
      expired: false,
      moneyOwed: false,
      ptypeDisallowsHolds: false,
      reachedHoldLimit: false,
    })
  })
  it("should return a 401 status if the patron is ineligibile", async () => {
    const patonEligibility = (await fetchPatronEligibility(
      "123"
    )) as PatronEligibilityStatus

    expect(patonEligibility.status).toEqual(401)
  })
  it("should return a 500 status if there was an error", async () => {
    const patonEligibility = (await fetchPatronEligibility(
      "123"
    )) as PatronEligibilityStatus

    expect(patonEligibility.status).toEqual(500)
  })
})
