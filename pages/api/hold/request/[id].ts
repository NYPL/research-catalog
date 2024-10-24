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
    const { patronId, source, pickupLocation, clientSidePost } =
      JSON.parse(body)

    const holdRequestResponse = await postHoldRequest({
      itemId,
      patronId,
      source,
      pickupLocation,
    })

    const { pickupLocation: pickupLocationFromResponse, requestId } =
      holdRequestResponse

    // Body param only set when JS is enabled
    if (clientSidePost) {
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
    return res.status(500).json({
      title: "Error fetching DRB results",
      status: 500,
      detail: error.message,
    })
  }
}

export default handler
