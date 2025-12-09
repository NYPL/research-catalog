import type { NextApiResponse, NextApiRequest } from "next"
import { updateHold } from "../../helpers"
import initializePatronTokenAuth from "../../../../../src/server/auth"

/**
 * API route handler for /api/account/holds/update/{holdId}
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

  if (req.method !== "PUT") {
    responseMessage = "Please make a PUT request to this endpoint."
  }
  if (req.method == "PUT") {
    /**  We get the hold id from the request: */
    const holdId = req.query.id as string
    const reqBody = JSON.parse(req.body)
    const holdPatronId = reqBody.patronId
    const holdData = {
      freeze: reqBody.freeze,
      pickupLocation: reqBody.pickupLocation,
    }
    /**  We check that the patron cookie matches the patron id in the request,
     * i.e.,the logged in user is updating their own hold. */
    if (holdPatronId == cookiePatronId) {
      const response = await updateHold(holdId, holdData, {
        patronId: holdPatronId,
        itemId: reqBody.itemId,
      })
      responseStatus = response.status
      responseMessage = response.message
    } else {
      responseStatus = 403
      responseMessage = "Authenticated patron does not own this hold"
    }
  }
  res.status(responseStatus).json(responseMessage)
}
