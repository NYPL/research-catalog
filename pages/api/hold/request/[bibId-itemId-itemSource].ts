import type { NextApiRequest, NextApiResponse } from "next"
import User from "../../../../src/utils/userUtils"
import { appConfig } from "../../../../src/config/config"
import { postHoldAPI } from "../../../../src/utils/holdUtils"

/**
 * createHoldRequestServer(req, res, pickedUpBibId = '', pickedUpItemId = '')
 * The function to make a server side hold request call.
 *
 * @param {req}
 * @param {res}
 * @param {string} pickedUpBibId
 * @param {string} pickedUpItemId
 * @return {function}
 */
function createHoldRequestServer(
  req,
  res,
  pickedUpBibId = "",
  pickedUpItemId = ""
) {
  res.respond = req.body.serverRedirect === "false" ? res.json : res.redirect
  // Ensure user is logged in
  const requireUser = User.requireUser(req, res)
  const { redirect } = requireUser
  if (redirect) return res.json({ redirect: true })

  // NOTE: pickedUpItemId and pickedUpBibId are coming from the EDD form function below:
  const itemId = req.params.itemId || pickedUpItemId
  const bibId = req.params.bibId || pickedUpBibId
  const itemSource = req.params.itemSource || ""
  const pickupLocation = req.body["delivery-location"]
  const docDeliveryData =
    req.body.form && pickupLocation === "edd" ? req.body.form : null
  const searchKeywordsQuery = req.body["search-keywords"]
    ? `&q=${req.body["search-keywords"]}`
    : ""

  if (!bibId || !itemId) {
    // Dummy redirect for now
    return res.respond(`${appConfig.baseUrl}/someErrorPage`)
  }

  if (pickupLocation === "edd") {
    const eddSearchKeywordsQuery = req.body["search-keywords"]
      ? `?q=${req.body["search-keywords"]}`
      : ""

    return res.respond(
      `${appConfig.baseUrl}/hold/request/${bibId}-${itemId}/edd${eddSearchKeywordsQuery}`
    )
  }

  return postHoldAPI(
    req,
    itemId,
    pickupLocation,
    docDeliveryData,
    itemSource,
    (response) => {
      const data = response.data
      res.respond(
        `${appConfig.baseUrl}/hold/confirmation/${bibId}-${itemId}?pickupLocation=` +
          `${pickupLocation}&requestId=${data.id}${searchKeywordsQuery}`
      )
    },
    (error) => {
      // logger.error(
      //   `Error calling postHoldAPI in createHoldRequestServer, bibId: {bibId}, itemId: ${itemId}`,
      //   error.data.message
      // )
      console.log({ error })
      const errorStatus = error.status ? `&errorStatus=${error.status}` : ""
      const errorMessage =
        error.statusText || searchKeywordsQuery
          ? `&errorMessage=${error.statusText}${searchKeywordsQuery}`
          : ""
      res.respond(
        `${appConfig.baseUrl}/hold/confirmation/${bibId}-${itemId}?pickupLocation=` +
          `${pickupLocation}${errorStatus}${errorMessage}`
      )
    }
  )
}

/**
 * Default API route handler for ResearchNow DRB
 * Expects the same query parameters as the Search endpoint
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(req.query)
  }
}

export default handler
