import type { NextApiResponse, NextApiRequest } from "next"
import initializePatronTokenAuth from "../../../../../src/server/auth"
import { renewCheckout } from "../../helpers"

/**
 * API route handler for /api/account/checkouts/renew/{checkoutId}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseMessage = "Request error"
  let responseStatus = 400
  let responseBody = {}
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const cookiePatronId = patronTokenResponse.decodedPatron?.sub
  if (!cookiePatronId) {
    responseStatus = 403
    responseMessage = "No authenticated patron"
    res.status(responseStatus).json(responseMessage)
  }
  if (req.method == "GET") {
    responseMessage = "Please make a POST request to this endpoint."
  }
  if (req.method == "POST") {
    /**  We get the checkout id and patron id from the request: */
    const checkoutId = req.query.id as string
    const reqBody = JSON.parse(req.body)
    const checkoutPatronId = reqBody.patronId
    /**  We check that the patron cookie matches the patron id in the request body,
     * i.e.,the logged in user is the owner of the checkout. */
    if (checkoutPatronId == cookiePatronId) {
      const response = await renewCheckout(checkoutId)
      responseStatus = response.status
      responseMessage = response.message
      // If successful, returns the renewed checkout object in the body.
      if (response.body) {
        responseBody = response.body.dueDate
      }
    } else {
      responseStatus = 403
      responseMessage = "Authenticated patron does not own this checkout"
    }
  }
  // If renewal fails, response body will be empty
  if (JSON.stringify(responseBody) !== "{}") {
    return res.status(responseStatus).json({
      message: responseMessage,
      body: responseBody,
    })
  } else return res.status(responseStatus).json(responseMessage)
}
