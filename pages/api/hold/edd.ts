import type { NextApiRequest, NextApiResponse } from "next"
import { isEmpty, omit } from "underscore"

import { appConfig } from "../../../src/config/config"
import { postHoldAPI, validate } from "../../../src/utils/holdUtils"
import User from "../../../src/utils/userUtils"

/**
 * eddRequest(req, res)
 * The function to make a server side EDD request.
 *
 * This is based on `eddServer` function in DFE.
 */
async function eddRequest(req, res) {
  const {
    bibId,
    itemId,
    searchKeywords,
    pickupLocation,
    itemSource,
    form,
    fromUrl,
  } = req.body
  const fromUrlQueryParam = fromUrl ? `&fromUrl=${fromUrl}` : ""
  const searchKeywordsQuery = searchKeywords ? `&q=${searchKeywords}` : ""
  const serverErrors = validate(omit(req.body, ["bibId", "itemId"]))
  const patronId = req.patronTokenResponse?.decodedPatron?.sub

  // Ensure user is logged in
  const { redirect } = User.requireUser(req, res)
  if (redirect) return false

  // NOTE: We want to skip over bibId and itemId in the validation. They are
  // hidden fields but only useful for making the actual request and not for
  // the form validation. If the form is not valid, then redirect to the same
  // page but with errors AND the user data:
  if (!isEmpty(serverErrors)) {
    // TODO: think of a better way to pass data.
    // Very ugly but passing all the error and patron data through the url
    // param. For now, this works, but make sure that the data is being
    // passed and picked up by the `ElectronicDelivery` component.
    return res.redirect(
      `${appConfig.baseUrl}/hold/request/${bibId}-${itemId}/edd?` +
        `error=${JSON.stringify(serverErrors)}` +
        `&form=${JSON.stringify(req.body)}${fromUrlQueryParam}`
    )
  }

  try {
    const holdData = await postHoldAPI({
      patronId,
      itemId,
      pickupLocation,
      docDeliveryData: form,
      itemSource,
    })

    if (holdData.statusCode === 200) {
      res.redirect(
        `${appConfig.baseUrl}/hold/confirmation/${bibId}-${itemId}` +
          `?pickupLocation=${pickupLocation}&requestId=${holdData.data.id}` +
          `${searchKeywordsQuery}${fromUrl}`
      )
    } else if (holdData.statusCode === 400) {
      // TODO make better error handling
      throw Error("Bad API call")
    }
  } catch (error) {
    // logger.error(
    //   `Error calling postHoldAPI in eddRequest, bibID: ${bibId}, itemId: ${itemId}`,
    //   error
    // )
    console.log({ error })
    const errorStatus = error.status ? `&errorStatus=${error.status}` : ""
    const errorMessage =
      error.statusText || searchKeywordsQuery || fromUrlQueryParam
        ? `&errorMessage=${error.statusText}${searchKeywordsQuery}${fromUrlQueryParam}`
        : ""
    res.redirect(
      `${appConfig.baseUrl}/hold/confirmation/${bibId}-${itemId}` +
        `?pickupLocation=edd${errorStatus}${errorMessage}`
    )
  }
}

/**
 * Default API route handler for Hold EDD API
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await eddRequest(req, res)
    res.status(200).json(req.query)
  }
}

export default handler
