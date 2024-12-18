import type { NextApiRequest, NextApiResponse } from "next"

import {
  postHoldRequest,
  fetchPatronEligibility,
} from "../../../../../src/server/api/hold"
import { BASE_URL, PATHS } from "../../../../../src/config/constants"

/**
 * Default API route handler for Hold requests
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(500).json({
      error: "Please use a POST request for the Hold Request API endpoint",
    })
  }

  try {
    const { patronId, source, pickupLocation, jsEnabled } = JSON.parse(req.body)

    const holdId = req.query.id as string
    const [, itemId] = holdId.split("-")

    const patronEligibilityStatus = await fetchPatronEligibility(patronId)

    if (patronEligibilityStatus.status === 401) {
      switch (jsEnabled) {
        case true:
          return res.status(401).json({
            patronEligibilityStatus,
          })

        // Server side redirect on ineligibility when Js is disabled
        // TODO: Move this to seaprate API route
        // TODO: Parse these query params in getServerSideProps
        default:
          return res.redirect(`${BASE_URL}${PATHS.HOLD_REQUEST}/${holdId}`)
      }
    }

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
    // TODO: Make this a separate API route instead of a fetch attribute
    if (jsEnabled) {
      return res.status(200).json({
        pickupLocation: pickupLocationFromResponse,
        requestId,
      })
    }

    // Server side redirect in case user has JS disabled
    return res.redirect(
      `${BASE_URL}${PATHS.HOLD_CONFIRMATION}/${holdId}?pickupLocation=${pickupLocationFromResponse}?requestId=${requestId}`
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
