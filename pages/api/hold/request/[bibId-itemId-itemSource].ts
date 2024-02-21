import type { NextApiRequest, NextApiResponse } from "next"

import User from "../../../../src/utils/userUtils"
import { postHoldAPI } from "../../../../src/utils/holdUtils"
import { BASE_URL } from "../../../../src/config/constants"

/**
 * createHoldRequest(req, res)
 * The function to make a server side hold request call.
 *
 * This is based on `createHoldRequestServer` function in DFE.
 */
async function createHoldRequest(req, res) {
  // Ensure user is logged in
  const { redirect } = User.requireUser(req, res)
  if (redirect) return res.redirect(`${BASE_URL}/404`)

  const paramString = req.query["bibId-itemId-itemSource"] || ""
  const [bibId, itemId, itemSource] = paramString.split("-")

  const patronId = req.patronTokenResponse?.decodedPatron?.sub

  const pickupLocation = req.body["delivery-location"]
  const docDeliveryData = req.body.form
  const searchKeywordsQuery = req.body["search-keywords"]
    ? `&q=${req.body["search-keywords"]}`
    : ""

  if (!bibId || !itemId) {
    // Dummy redirect for now
    return res.redirect(`${BASE_URL}/404`)
  }

  try {
    const holdData = await postHoldAPI({
      patronId,
      itemId,
      pickupLocation,
      docDeliveryData,
      itemSource,
    })

    if (holdData.statusCode === 200) {
      res.redirect(
        `${BASE_URL}/hold/confirmation/${bibId}-${itemId}?pickupLocation=` +
          `${pickupLocation}&requestId=${holdData.data.id}${searchKeywordsQuery}`
      )
    } else if (holdData.statusCode === 400) {
      // TODO make better error handling
      throw Error("Bad API call")
    }
  } catch (error) {
    // logger.error(
    //   `Error calling postHoldAPI in createHoldRequest,
    // bibId: {bibId}, itemId: ${itemId}`,
    //   error.data.message
    // )
    const errorStatus = error.status ? `&errorStatus=${error.status}` : ""
    const errorMessage =
      error.statusText || searchKeywordsQuery
        ? `&errorMessage=${error.statusText}${searchKeywordsQuery}`
        : ""
    // Perhaps don't redirect if there is an API error call...
    res.redirect(
      `${BASE_URL}/hold/confirmation/${bibId}-${itemId}?pickupLocation=` +
        `${pickupLocation}${errorStatus}${errorMessage}`
    )
  }
}

/**
 * Default API route handler for Hold Request API
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await createHoldRequest(req, res)
    res.status(200).json(req.query)
  }
}

export default handler
