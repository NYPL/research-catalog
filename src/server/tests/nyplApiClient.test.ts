import { logger } from "@nypl/node-utils"

jest.mock("../../config/appConfig", () => ({
  appConfig: {
    environment: "development",
    apiEndpoints: {
      platform: { development: "https://example.com/platform" },
    },
    urls: { tokenUrl: "https://example.com/token" },
  },
}))

jest.mock("../../../lib/bootstrap", () => ({
  bootstrapConfig: jest.fn().mockResolvedValue(undefined),
}))

const mockGet = jest.fn().mockResolvedValue({})
const mockPost = jest.fn().mockResolvedValue({})
const mockPatch = jest.fn().mockResolvedValue({})
const mockDangerouslyCallDelete = jest.fn().mockResolvedValue({})

jest.mock("@nypl/nypl-data-api-client", () =>
  jest.fn().mockImplementation(() => ({
    get: mockGet,
    post: mockPost,
    patch: mockPatch,
    dangerouslyCallDelete: mockDangerouslyCallDelete,
  }))
)

import nyplApiClient from "../nyplApiClient"

const findPlatformRequestLog = (method: string) =>
  (logger.info as jest.Mock).mock.calls.find(
    (call) => call[0] === "Platform request" && call[1].method === method
  )

describe("nyplApiClient request logging", () => {
  beforeAll(() => {
    const { config } = jest.requireMock("@nypl/node-utils") as any
    // fake creds so it doesnt throw
    config.getConfig.mockReturnValue({
      PLATFORM_API_CLIENT_ID: "id",
      PLATFORM_API_CLIENT_SECRET: "secret",
    })
  })

  afterEach(() => {
    ;(logger.info as jest.Mock).mockClear()
  })

  it("redacts sensitive fields before logging request bodies", async () => {
    const client = await nyplApiClient()
    await client.post("/hold-requests", {
      patron: "123456",
      docDeliveryData: { emailAddress: "patron@example.com" },
    })

    const log = findPlatformRequestLog("POST")
    expect(log[1].body).toEqual({
      patron: "*****",
      docDeliveryData: { emailAddress: "*****" },
    })
  })

  it("redacts sensitive query params and path segments before logging the request path", async () => {
    const client = await nyplApiClient()
    await client.get(
      "/request/deliveryLocationsByBarcode?barcodes[]=123&patronId=456"
    )

    const log = findPlatformRequestLog("GET")
    expect(log[1].path).toBe(
      "https://example.com/platform/v0.1/request/deliveryLocationsByBarcode?barcodes[]=*****&patronId=*****"
    )
  })
})
