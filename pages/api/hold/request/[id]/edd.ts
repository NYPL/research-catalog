import type { NextApiRequest, NextApiResponse } from "next"

import { postEDDRequest } from "../../../../../src/server/api/hold"
import { BASE_URL, PATHS } from "../../../../../src/config/constants"
import {
  initialEDDInvalidFields,
  getUpdatedInvalidFields,
} from "../../../../../src/utils/holdPageUtils"

/**
 * Default API route handler for EDD requests
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({
      error: "Please use a POST request for the EDD Request API endpoint",
    })
  }

  try {
    const holdId = req.query.id as string
    const [, itemId] = holdId.split("-")

    const { jsEnabled, ...rest } = JSON.parse(req.body)

    const holdRequestResponse = await postEDDRequest({
      ...rest,
      itemId,
    })

    const { requestId } = holdRequestResponse

    if (!requestId) {
      throw new Error("Malformed response from hold request API")
    }

    // Return a 200 status when the hold request is posted successfully via JS fetch
    if (jsEnabled) {
      return res.status(200).json({
        requestId,
      })
    }

    // JS-Disabled functionality

    // TODO: Determine if we can harness validation from discovery response or if we should add it here
    const tempFormInvalid = false

    if (tempFormInvalid) {
      res.redirect(
        `${BASE_URL}${PATHS.HOLD_REQUEST}/${holdId}/edd?formInvalid=true`
      )
    }
    // Redirect to confirmation page if form is valid
    res.redirect(
      `${BASE_URL}${PATHS.HOLD_CONFIRMATION}/${holdId}?pickupLocation=edd?requestId=${requestId}`
    )
  } catch (error) {
    const { statusText } = error as Response

    return res.status(500).json({
      title: "Error posting EDD request to Discovery API",
      status: 500,
      detail: statusText || error.message,
    })
  }
}

export default handler
