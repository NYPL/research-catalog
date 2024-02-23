import type { NextApiResponse, NextApiRequest } from "next"
import sierraClient from "../../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../../src/server/auth"

/**
 * API route handler for /api/account/update-pin/{patronId}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseMessage
  let responseStatus
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const cookiePatronId = patronTokenResponse.decodedPatron?.sub
  if (!cookiePatronId) {
    responseStatus = 403
    responseMessage = "No authenticated patron"
    return res.status(responseStatus).json(responseMessage)
  }
  if (req.method == "PUT") {
    /**  We get the patron id from the request: */
    const patronId = req.query.id as string
    const oldPin = req.body.old
    const newPin = req.body.new
    const barcode = req.body.barcode
    /**  We check that the patron cookie matches the patron id in the request,
     * i.e.,the logged in user is updating their own PIN. */
    if (patronId == cookiePatronId) {
      const response = await pinUpdate(patronId, barcode, oldPin, newPin)
      responseStatus = response.status
      responseMessage = response.message
    } else {
      responseStatus = 403
      responseMessage = "Authenticated patron does not match request"
    }
  }
  res.status(responseStatus).json(responseMessage)
}

export async function pinUpdate(
  patronId: string,
  barcode: string,
  oldPin: string,
  newPin: string
) {
  try {
    const client = await sierraClient()
    await client.post("patrons/validate", {
      barcode: barcode,
      pin: oldPin,
    })
    await client.put(`patrons/${patronId}`, { pin: newPin })
    return { status: 200, message: `Pin updated to ${newPin}` }
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message || error.response.data.description,
    }
  }
}
