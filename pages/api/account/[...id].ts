import type { NextApiResponse } from "next"
import type { NextRequest } from "next/server"
import { sierraClient } from "../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../src/server/auth"

// Testing with http://local.nypl.org:8080/research/research-catalog/api/account/checkouts/53036284/renewal
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
    if (await patronCookieMatchesCheckout(patronId, checkoutId)) {
      await checkoutRenewal(res, checkoutId)
    } else {
      res.status(403).json({
        message: "Checkout does not belong to patron, renewal failed.",
      })
    }
  }
}

async function patronCookieMatchesCheckout(
  patronId: string,
  checkoutId: string
): Promise<boolean> {
  const client = await sierraClient()
  const checkout = await client.get(`patrons/checkouts/${checkoutId}`)
  const checkoutPatronId = checkout?.patron.match(/\/(\d+)$/)[1]
  return patronId === checkoutPatronId
}

export async function checkoutRenewal(
  res: NextApiResponse,
  checkoutId: string
) {
  try {
    const client = await sierraClient()
    await client.post(`patrons/checkouts/${checkoutId}/renewal`)
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
