import type { NextApiResponse } from "next"
import type { NextRequest } from "next/server"
import sierraClient from "../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../src/server/auth"

/**
 * API route handler for /api/account/checkouts
 */

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const patronTokenResponse = await initializePatronTokenAuth(req)
  const cookiePatronId = patronTokenResponse.decodedPatron?.sub
  if (!cookiePatronId) {
    res.status(403).json({
      message: "No authenticated patron",
    })
  }
  const checkoutRenewalMatch = req.url.match(
    /\/checkouts\/(\d+)\/renewal\/(\d+)$/
  )
  /** The url contains the checkout's id and the patron id from the checkout.
   * We check that the patron cookie matches this id, i.e., the logged in user is the owner
   * of the checkout. */
  if (checkoutRenewalMatch) {
    const checkoutId = checkoutRenewalMatch[1]
    const checkoutPatronId = checkoutRenewalMatch[2]
    if (checkoutPatronId == cookiePatronId) {
      const response = await checkoutRenewal(checkoutId)
      res.status(response.status)
      res.json(response.message)
    } else {
      res.status(403)
      res.json("Authenticated patron does not own this checkout")
    }
  }
}

export async function checkoutRenewal(checkoutId: string) {
  try {
    const client = await sierraClient()
    await client.post(`patrons/checkouts/${checkoutId}/renewal`)
    return { status: 200, message: "Renewed" }
  } catch (error) {
    if (error.response.status === 403) {
      return {
        status: 403,
        message:
          "RENEWAL NOT ALLOWED. Please contact gethelp@nypl.org for assistance.",
      }
    } else return { status: 500, message: "Server error" }
  }
}
