import type { NextApiResponse, NextApiRequest } from "next"
import initializePatronTokenAuth from "../../../../src/server/auth"
import updatePin from "./updatePin"

/**
 * API route handler for /api/account/update-pin/{patronId}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseMessage = "Request error"
  let responseStatus = 400
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const cookiePatronId = patronTokenResponse.decodedPatron?.sub
  if (!cookiePatronId) {
    responseStatus = 403
    responseMessage = "No authenticated patron"
    return res.status(responseStatus).json(responseMessage)
  }
  if (req.method == "GET") {
    responseMessage = "Please make a PUT request to this endpoint."
  }
  if (req.method == "PUT") {
    /**  We get the patron id from the request: */
    const patronId = req.query.id as string
    const { oldPin, newPin, barcode } = req.body
    /**  We check that the patron cookie matches the patron id in the request,
     * i.e.,the logged in user is updating their own PIN. */
    if (patronId == cookiePatronId) {
      const response = await updatePin(patronId, barcode, oldPin, newPin)
      responseStatus = response.status
      responseMessage = response.message
    } else {
      responseStatus = 403
      responseMessage = "Authenticated patron does not match request"
    }
  }
  res.status(responseStatus).json(responseMessage)
}
