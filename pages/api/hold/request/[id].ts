import type { NextApiRequest, NextApiResponse } from "next"

import { postHoldRequest } from "../../../../src/server/api/hold"
import { BASE_URL, PATHS } from "../../../../src/config/constants"

/**
 * Default API route handler for Hold requests
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({
      error: "Please use a POST request for the Hold Request API endpoint",
    })
  }

  try {
    const holdId = req.query.id as string
    const [, itemId] = holdId.split("-")

    const body = await req.body
    const { patronId, source, pickupLocation, jsEnabled } = JSON.parse(body)

    const holdRequestResponse = await postHoldRequest({
      itemId,
      patronId,
      source,
      pickupLocation,
    })

    const { pickupLocation: pickupLocationFromResponse, requestId } =
      holdRequestResponse

    if (!pickupLocationFromResponse || !requestId) {
      throw new Error("Malformed response from hold request API")
    }

    // Return a 200 status when the hold request is posted successfully via JS fetch
    if (jsEnabled) {
      return res.status(200).json({
        pickupLocation: pickupLocationFromResponse,
        requestId,
      })
    }

    // Server side redirect in case user has JS disabled
    res.redirect(
      `${BASE_URL}${PATHS.HOLD_CONFIRMATION}${holdId}?pickupLocation=${pickupLocationFromResponse}?requestId=${requestId}`
    )
  } catch (error) {
    const { statusText } = error as Response

    return res.status(500).json({
      title: "Error posting hold request to Discovery API",
      status: 500,
      detail: statusText || error.message,
    })
  }
}

export default handler
