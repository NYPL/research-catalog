import type { NextApiRequest, NextApiResponse } from "next"

import { postHoldRequest } from "../../../../src/server/api/hold"

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
    const { patronId, source, pickupLocation } = JSON.parse(body)

    const holdRequestResponse = await postHoldRequest({
      itemId,
      patronId,
      source,
      pickupLocation,
    })
    console.log(holdRequestResponse)
    return res.status(404).json({
      title: "Error posting Hold request",
      status: 404,
    }) // Placeholder response
  } catch (error) {
    return res.status(500).json({
      title: "Error fetching DRB results",
      status: 500,
      detail: error.message,
    })
  }
}

export default handler
