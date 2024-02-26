import type { NextApiResponse, NextApiRequest } from "next"
import sierraClient from "../../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../../src/server/auth"

/**
 * API route handler for /api/account/cancel-request/{holdId}
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
    /**  We get the hold id and patron id from the request: */
    const holdId = req.query.id as string
    const holdPatronId = JSON.parse(JSON.stringify(req.body))
    /**  We check that the patron cookie matches the patron id in the request body,
     * i.e.,the logged in user is the owner of the hold. */
    if (holdPatronId == cookiePatronId) {
      const response = await requestCancel(holdId)
      responseStatus = response.status
      responseMessage = response.message
    } else {
      responseStatus = 403
      responseMessage = "Authenticated patron does not own this hold"
    }
  }
  return res.status(responseStatus).json(responseMessage)
}

export async function requestCancel(holdId: string) {
  try {
    const client = await sierraClient()
    await client.delete(`patrons/holds/${holdId}`)
    return { status: 200, message: "Deleted" }
  } catch (error) {
    console.log(error)
    return {
      status: 500,
      message: "No response",
    }
  }
}
