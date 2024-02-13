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
    const response = await client.post(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    console.log(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "internal server error" })
  }
}
