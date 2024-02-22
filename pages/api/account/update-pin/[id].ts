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
    /**  We check that the patron cookie matches the patron id in the request,
     * i.e.,the logged in user is updating their own settings. */
    if (patronId == cookiePatronId) {
      const response = await pinUpdate(oldPin)
      responseStatus = response.status
      responseMessage = response.message
    } else {
      responseStatus = 403
      responseMessage = "Authenticated patron does not match request"
    }
  }
  res.status(responseStatus).json(responseMessage)
}

export async function pinUpdate(oldPin: string) {
  try {
    console.log("old pin", oldPin)
    const client = await sierraClient()
    const response1 = await client.post("patrons/validate", {
      barcode: "23333094983077",
      pin: oldPin,
    })
    console.log(response1)
    return { status: response1.status, message: "Updated" }
  } catch (error) {
    console.log(error)
    return {
      status: error.response.status,
      message: error.response.data.description,
    }
  }
}
