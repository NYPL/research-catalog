import type { NextApiRequest, NextApiResponse } from "next"
import { sierraClient } from "../../../src/server/sierraClient"

// Testing with http://local.nypl.org:8080/research/research-catalog/api/account/checkouts/65060571/renewal
/**
 * API route handler
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const checkoutRenewalMatch = req.url.match(/\/checkouts\/(\d+)\/renewal$/)
  if (checkoutRenewalMatch) {
    console.log("checkout renewal", checkoutRenewalMatch[1])
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
