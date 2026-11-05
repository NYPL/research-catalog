import { logger } from "@nypl/node-utils"

jest.mock("../../config/appConfig", () => ({
  appConfig: {
    environment: "development",
    apiEndpoints: {
      sierraBase: { development: "https://example.com/sierra" },
    },
  },
}))

jest.mock("../../../lib/bootstrap", () => ({
  bootstrapConfig: jest.fn().mockResolvedValue(undefined),
}))

jest.mock("@nypl/sierra-wrapper", () => ({
  config: jest.fn().mockResolvedValue(undefined),
  get: jest.fn().mockResolvedValue({}),
  post: jest.fn().mockResolvedValue({}),
  put: jest.fn().mockResolvedValue({}),
  deleteRequest: jest.fn().mockResolvedValue({}),
}))

import sierraClient from "../sierraClient"

const findSierraRequestLog = (method: string, path: string) =>
  (logger.info as jest.Mock).mock.calls.find(
    (call) =>
      call[0] === "Sierra request" &&
      call[1].method === method &&
      call[1].path === path
  )

describe("sierraClient request logging", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("redacts sensitive fields before logging request bodies", async () => {
    const client = await sierraClient()
    await client.post("patrons/validate", { barcode: "123", pin: "4321" })

    const log = findSierraRequestLog("POST", "patrons/validate")
    expect(log[1].body).toBe(JSON.stringify({ barcode: "*****", pin: "*****" }))
  })
})
