import type { NextApiRequest, NextApiResponse } from "next"
import User from "../../../../src/utils/userUtils"
import { extend } from "underscore"
import { nyplApiClientGet } from "../../../../src/server/nyplApiClient"
import { appConfig } from "../../../../src/config/config"

const extractFeatures = (featuresString) => {
  if (typeof featuresString !== "string") return []
  return featuresString.split(",").reduce((features, feature) => {
    if (feature.length) features.push(feature.trim())
    return features
  }, [])
}

/**
 * confirmRequestServer(req, res, next)
 * The function to return the bib and item data with its delivery locations to confirmation page.
 *
 * @param {req}
 * @param {res}
 * @param {next}
 * @return {function}
 */
function confirmRequestServer(req, res, next) {
  const bibId = req.params.bibId || ""
  const requireUser = User.requireUser(req, res)
  const { redirect } = requireUser
  if (redirect) return false
  const requestId = req.query.requestId || ""
  const searchKeywords = req.query.q || ""
  const errorStatus = req.query.errorStatus ? req.query.errorStatus : null
  const errorMessage = req.query.errorMessage ? req.query.errorMessage : null
  const error = extend({}, { errorStatus, errorMessage })
  const { features } = req.query
  const urlEnabledFeatures = extractFeatures(features)

  const { dispatch } = req.store
  if (!requestId) {
    // TODO
    // dispatch(
    //   updateHoldRequestPage({
    //     bib: {},
    //     searchKeywords,
    //     error,
    //     deliveryLocations: [],
    //   })
    // )
    next()
    return false
  }

  const patronId = req.patronTokenResponse.decodedPatron.sub || ""
  let barcode

  return nyplApiClientGet(`/hold-requests/${requestId}`).then((response) => {
    const patronIdFromHoldRequest = response.data.patron

    // The patron who is seeing the confirmation did not make the Hold Request
    if (patronIdFromHoldRequest !== patronId) {
      res.status(404).redirect(`${appConfig.baseUrl}/404`)
      return false
    }
    return true
  })

  // Retrieve item
  //   return Bib.fetchBib(
  //     bibId,
  //     (bibResponseData) => {
  //       const { bib } = bibResponseData
  //       barcode = LibraryItem.getItem(bib, req.params.itemId).barcode
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
  //             "Error retrieving server side delivery locations in confirmRequestServer" +
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
  //         `Error retrieving server side bib record in confirmRequestServer, id: ${bibId}`,
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
  //     "Error making a server side Hold Request in confirmRequestServer",
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
 * Default API route handler for ResearchNow DRB
 * Expects the same query parameters as the Search endpoint
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(req.query)
  }
}

export default handler
