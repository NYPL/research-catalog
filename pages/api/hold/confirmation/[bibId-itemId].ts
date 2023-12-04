import type { NextApiRequest, NextApiResponse } from "next"

import User from "../../../../src/utils/userUtils"
import { nyplApiClientGet } from "../../../../src/server/nyplApiClient"
import { appConfig } from "../../../../src/config/config"
import { extractFeatures } from "../../../../src/utils/appUtils"
import { fetchBib } from "../../../../src/utils/bibUtils"

/**
 * confirmRequest(req, res, next)
 * The function to return the bib and item data with its delivery locations
 * to confirmation page.
 *
 * @param {req}
 * @param {res}
 */
async function confirmRequest(req, res) {
  const { redirect } = User.requireUser(req, res)
  if (redirect) return false

  const { bibId = "", itemId } = req.params
  const {
    requestId,
    q: searchKeywords,
    features,
    errorStatus,
    errorMessage,
  } = req.query
  const error = { ...errorStatus, ...errorMessage }
  const urlEnabledFeatures = extractFeatures(features)

  // This use to call a redux dispatch to update the local server store
  // with the request and error object. We no longer need to do this and
  // need to a better way to handle this.
  if (!requestId) {
    return false
  }

  const patronId = req.patronTokenResponse?.decodedPatron?.sub
  let barcode

  try {
    const response = await nyplApiClientGet(`/hold-requests/${requestId}`)
    const patronIdFromHoldRequest = response.data.patron

    // The patron who is seeing the confirmation did not make the Hold Request
    if (patronIdFromHoldRequest !== patronId) {
      res.status(404).redirect(`${appConfig.baseUrl}/404`)
      return false
    }
  } catch (error) {
    console.log("Error retrieving hold request information")
  }

  // Retrieve item
  try {
    const bibResponseData = fetchBib({ bibId })
    const { bib } = bibResponseData

    // TODO - implement LibraryItem
    // barcode = LibraryItem.getItem(bib, itemId).barcode
  } catch (error) {
    console.log("Error retrieving bib data")
  }
  //       getDeliveryLocations(
  //         barcode,
  //         patronId,
  //         (deliveryLocations, isEddRequestable) => {
  //           dispatch(
  //             updateHoldRequestPage({
  //               bib,
  //               deliveryLocations,
  //               isEddRequestable,
  //               searchKeywords,
  //             })
  //           )
  //           next()
  //         },
  //         (deliveryLocationError) => {
  //           logger.error(
  //             "Error retrieving server side delivery locations in confirmRequest" +
  //               `, bibId: ${bibId}`,
  //             deliveryLocationError
  //           )

  //           dispatch(
  //             updateHoldRequestPage({
  //               bib,
  //               searchKeywords,
  //               error,
  //               deliveryLocations: [],
  //               isEddRequestable: false,
  //             })
  //           )
  //           next()
  //         }
  //       )
  //     },
  //     (bibResponseError) => {
  //       logger.error(
  //         `Error retrieving server side bib record in confirmRequest, id: ${bibId}`,
  //         bibResponseError
  //       )
  //       dispatch(
  //         updateHoldRequestPage({
  //           bib: {},
  //           searchKeywords,
  //           error,
  //           deliveryLocations: [],
  //         })
  //       )
  //       next()
  //     },
  //     {
  //       fetchSubjectHeadingData: false,
  //       features: urlEnabledFeatures,
  //     }
  //   )
  // })
  // .catch((requestIdError) => {
  //   logger.error(
  //     "Error making a server side Hold Request in confirmRequest",
  //     requestIdError
  //   )

  //   dispatch(
  //     updateHoldRequestPage({
  //       bib: {},
  //       searchKeywords,
  //       error,
  //       deliveryLocations: [],
  //     })
  //   )
  //   next()

  //   return false
  // })
}

/**
 * Default API route handler for Hold Confirmation API
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(req.query)
  }
}

export default handler
