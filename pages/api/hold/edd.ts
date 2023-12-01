import type { NextApiRequest, NextApiResponse } from "next"
import { omit } from "underscore"
import { appConfig } from "../../../src/config/config"
import { postHoldAPI, validate } from "../../../src/utils/holdUtils"
import User from "../../../src/utils/userUtils"

function eddServer(req, res) {
  const { bibId, itemId, searchKeywords, serverRedirect } = req.body

  let { fromUrl } = req.body
  fromUrl = fromUrl ? `&fromUrl=${fromUrl}` : ""

  res.respond = serverRedirect === "false" ? res.json : res.redirect

  const searchKeywordsQuery = searchKeywords ? `&q=${searchKeywords}` : ""

  let serverErrors = {}

  // NOTE: We want to skip over bibId and itemId in the validation. They are hidden fields but
  // only useful for making the actual request and not for the form validation.
  // If the form is not valid, then redirect to the same page but with errors AND the user data:
  if (
    !validate(omit(req.body, ["bibId", "itemId"]), (error) => {
      serverErrors = error
    })
  ) {
    // Very ugly but passing all the error and patron data through the url param.
    // TODO: think of a better way to pass data. For now, this works, but make sure that
    // the data is being passed and picked up by the `ElectronicDelivery` component.
    return res.respond(
      `${appConfig.baseUrl}/hold/request/${bibId}-${itemId}/edd?` +
        `error=${JSON.stringify(serverErrors)}` +
        `&form=${JSON.stringify(req.body)}${fromUrl}`
    )
  }

  // Ensure user is logged in
  const requireUser = User.requireUser(req, res)
  const { redirect } = requireUser

  if (redirect) return false

  return postHoldAPI(
    req,
    req.body.itemId,
    req.body.pickupLocation,
    req.body,
    req.body.itemSource,
    (response) => {
      const data = response.data

      res.respond(
        `${appConfig.baseUrl}/hold/confirmation/${bibId}-${itemId}` +
          `?pickupLocation=${req.body.pickupLocation}&requestId=${data.id}${searchKeywordsQuery}${fromUrl}`
      )
    },
    (error) => {
      // logger.error(
      //   `Error calling postHoldAPI in eddServer, bibID: ${bibId}, itemId: ${itemId}`,
      //   error
      // )
      console.log({ error })
      const errorStatus = error.status ? `&errorStatus=${error.status}` : ""
      const errorMessage =
        error.statusText || searchKeywordsQuery || fromUrl
          ? `&errorMessage=${error.statusText}${searchKeywordsQuery}${fromUrl}`
          : ""
      res.respond(
        `${appConfig.baseUrl}/hold/confirmation/${bibId}-${itemId}?pickupLocation=edd${errorStatus}${errorMessage}`
      )
    }
  )
}

/**
 * Default API route handler for ResearchNow DRB
 * Expects the same query parameters as the Search endpoint
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(200).json(req.query)
  }
}

export default handler
