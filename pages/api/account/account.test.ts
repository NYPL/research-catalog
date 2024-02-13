import { checkoutRenewal } from "./[...id]"
import type { NextApiResponse } from "next"

let mockResponse: NextApiResponse

describe("checkout Renewal", () => {
  it("throws an error for research materials", async () => {
    await checkoutRenewal(mockResponse, "53036283")
  })
})
