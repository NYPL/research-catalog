import type { NextApiResponse, NextApiRequest } from "next"
import sierraClient from "../../../../../src/server/sierraClient"
import initializePatronTokenAuth from "../../../../../src/server/auth"

/**
 * API route handler for /api/account/checkouts/renewal/{checkoutId}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let responseMessage
  let responseStatus
  let responseBody = {}
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const cookiePatronId = patronTokenResponse.decodedPatron?.sub
  if (!cookiePatronId) {
    responseStatus = 403
    responseMessage = "No authenticated patron"
    res.status(responseStatus).json({
      message: responseMessage,
      body: responseBody,
    })
  }
  if (req.method == "POST") {
    /**  We get the checkout id and patron id from the request: */
    const checkoutId = req.query.id as string
    const checkoutPatronId = JSON.parse(JSON.stringify(req.body))
    /**  We check that the patron cookie matches the patron id in the request body,
     * i.e.,the logged in user is the owner of the checkout. */
    if (checkoutPatronId == cookiePatronId) {
      const response = await checkoutRenewal(checkoutId)
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
  return res.status(responseStatus).json({
    message: responseMessage,
    body: responseBody,
  })
}

export async function checkoutRenewal(checkoutId: string) {
  try {
    const client = await sierraClient()
    const response = await client.post(
      `patrons/checkouts/${checkoutId}/renewal`
    )
    return { status: 200, message: "Renewed", body: response }
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response.data.message || error.response.data.description,
    }
  }
}
