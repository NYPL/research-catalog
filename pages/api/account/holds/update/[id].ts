import type { NextApiResponse, NextApiRequest } from "next"
import sierraClient from "../../../../../src/server/sierraClient"
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

  if (req.method !== "POST") {
    responseMessage = "Please make a POST request to this endpoint."
  }
  if (req.method == "POST") {
    /**  We get the hold id from the request: */
    const holdId = req.query.id as string
    const holdPatronId = req.body.patronId
    const holdData = {
      freeze: req.body.freeze,
      pickupLocation: req.body.pickupLocation,
    }
    /**  We check that the patron cookie matches the patron id in the request,
     * i.e.,the logged in user is updating their own hold. */
    if (holdPatronId == cookiePatronId) {
      const response = await holdUpdate(holdId, holdData)
      responseStatus = response.status
      responseMessage = response.message
    } else {
      responseStatus = 403
      responseMessage = "Authenticated patron does not own this hold"
    }
  }
  res.status(responseStatus).json(responseMessage)
}

export async function holdUpdate(holdId: string, holdData: any) {
  try {
    const client = await sierraClient()
    await client.put(`patrons/holds/${holdId}`, holdData)
    return { status: 200, message: "Updated" }
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message || error.response.data.description,
    }
  }
}
