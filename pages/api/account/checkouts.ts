import type { NextApiResponse } from "next"
import type { NextRequest } from "next/server"
import sierraClient from "../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../src/server/auth"

/**
 * API route handler
 */

// TODO: api/account/settings/{patronId}
// TODO: api/account/update-pin/{patronId}

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const patronTokenResponse = await initializePatronTokenAuth(req)
  const patronId = patronTokenResponse.decodedPatron?.sub
  if (!patronId) {
    res.status(403).json({
      message: "No authenticated patron",
    })
  }
  const checkoutRenewalMatch = req.url.match(
    /\/checkouts\/(\d+)\/renewal\/(\d+)$/
  )
  const checkoutId = checkoutRenewalMatch[1]
  const checkoutPatronId = checkoutRenewalMatch[2]
  console.log(checkoutRenewalMatch)
  if (checkoutRenewalMatch && checkoutPatronId == patronId) {
    const response = await checkoutRenewal(checkoutId)
    res.status(response.status)
    res.json(response.message)
  }
  console.log(res)
  return res
}

export async function checkoutRenewal(checkoutId: string) {
  try {
    const client = await sierraClient()
    await client.post(`patrons/checkouts/${checkoutId}/renewal`)
    return { status: 200, message: "Renewed!" }
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
