import type { NextApiResponse } from "next"
import type { NextRequest } from "next/server"
import { sierraClient } from "../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../src/server/auth"

/**
 * API route handler
 */
export default async function handler(req: NextRequest, res: NextApiResponse) {
  const patronTokenResponse = await initializePatronTokenAuth(req)
  const patronId = patronTokenResponse.decodedPatron?.sub
  if (!patronId) {
    res.status(403).json({
      message: "No authenticated patron",
    })
  }

  // api/account/settings/{patronId}
  // api/account/update-pin/{patronId}

  const checkoutRenewalMatch = req.url.match(/\/checkouts\/(\d+)\/renewal$/)
  if (checkoutRenewalMatch) {
    const checkoutId = checkoutRenewalMatch[1]
    await checkoutRenewal(res, checkoutId)
  }
}

export async function checkoutRenewal(
  res: NextApiResponse,
  checkoutId: string
) {
  try {
    const client = await sierraClient()
    const response = await client.post(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    console.log(response)
    res.status(200).json({ message: "Renewed!" })
  } catch (error) {
    if (error.response.status === 403) {
      res.status(403).json({
        message:
          "RENEWAL NOT ALLOWED. Please contact gethelp@nypl.org for assistance.",
      })
    } else
      res.status(500).json({
        message: "server error",
      })
  }
}
