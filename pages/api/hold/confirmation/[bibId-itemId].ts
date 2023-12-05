import type { NextApiRequest, NextApiResponse } from "next"

import User from "../../../../src/utils/userUtils"
import { nyplApiClientGet } from "../../../../src/server/nyplApiClient"
import { appConfig } from "../../../../src/config/config"
import { extractFeatures } from "../../../../src/utils/appUtils"
import { fetchBib } from "../../../../src/utils/bibUtils"
import { findWhere } from "underscore"
import Item from "../../../../src/models/Item"
import {
  getDeliveryLocations,
  mapLocationDetails,
  modelDeliveryLocationName,
} from "../../../../src/utils/holdUtils"

// TODO - implement LibraryItem which, in this conversion would live in
// the Item class. Taking a closer look, `LibraryItem.getItem` doesn't
// really depend on an item or bib and _could_ be isolated. It's
// separated here until a better place is found.
export const LibraryItem = {
  /**
   * getItem(bib, itemId)
   * Look for specific item in the bib's item array. Return it if found.
   * @param {object} bib
   * @param {string} itemId
   * @return {array}
   */
  getItem: (bib, itemId) => {
    const items = bib && bib.items ? bib.items : []

    if (itemId && items.length) {
      // Will return undefined if not found.
      const item = findWhere(items, { "@id": `res:${itemId}` })
      if (item) {
        return new Item(item, bib)
      }
    }

    return undefined
  },
}

/**
 * confirmRequest(req, res, next)
 * The function to return the bib and item data with its delivery locations
 * to confirmation page.
 *
 * This is based on `confirmRequestServer` function in DFE.
 *
 * @param {req}
 * @param {res}
 */
async function confirmRequest(req, res) {
  const { redirect } = User.requireUser(req, res)
  if (redirect) return false

  const paramString = req.query["bibId-itemId"] || ""
  const [bibId, itemId] = paramString.split("-")
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
    // dispatch(updateHoldRequestPage({
    //   bib: {},
    //   searchKeywords,
    //   error,
    //   deliveryLocations: [],
    // }));
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
    // Retrieve item
    try {
      const bibResponseData = fetchBib(
        { bibId },
        {},
        {
          fetchSubjectHeadingData: false,
          features: urlEnabledFeatures,
        }
      )
      const { bib } = bibResponseData

      barcode = LibraryItem.getItem(bib, itemId).barcode
      try {
        const barcodeAPIresponse = await getDeliveryLocations(barcode, patronId)
        const isEddRequestable =
          barcodeAPIresponse &&
          barcodeAPIresponse.itemListElement &&
          barcodeAPIresponse.itemListElement.length &&
          barcodeAPIresponse.itemListElement[0].eddRequestable
            ? barcodeAPIresponse.itemListElement[0].eddRequestable
            : false
        let deliveryLocations =
          barcodeAPIresponse &&
          barcodeAPIresponse.itemListElement &&
          barcodeAPIresponse.itemListElement.length &&
          barcodeAPIresponse.itemListElement[0].deliveryLocation
            ? mapLocationDetails(
                barcodeAPIresponse.itemListElement[0].deliveryLocation
              )
            : []
        const { closedLocations } = appConfig
        deliveryLocations = deliveryLocations.filter(
          (location) =>
            !closedLocations.some((closedLocation) =>
              modelDeliveryLocationName(
                location.prefLabel,
                location.shortName
              ).startsWith(closedLocation)
            )
        )
        // dispatch(
        //   updateHoldRequestPage({
        //     bib,
        //     deliveryLocations,
        //     isEddRequestable,
        //     searchKeywords,
        //   })
        // )
      } catch (error) {
        // logger.error(
        //   "Error retrieving server side delivery locations in confirmRequest" +
        //     `, bibId: ${bibId}`,
        //   error
        // )
        // dispatch(updateHoldRequestPage({
        //   bib,
        //   searchKeywords,
        //   error,
        //   deliveryLocations: [],
        //   isEddRequestable: false,
        // }));
      }
    } catch (error) {
      console.log("Error retrieving bib data")
      // logger.error(
      //   `Error retrieving server side bib record in confirmRequest, id: ${bibId}`,
      //   bibResponseError
      // )
      // dispatch(updateHoldRequestPage({
      //   bib: {},
      //   searchKeywords,
      //   error,
      //   deliveryLocations: [],
      // }));
    }
  } catch (error) {
    console.log("Error retrieving hold request confirmation")
    // logger.error(
    //   "Error making a server side Hold Request in confirmRequestServer",
    //   requestIdError
    // )
    // dispatch(updateHoldRequestPage({
    //   bib: {},
    //   searchKeywords,
    //   error,
    //   deliveryLocations: [],
    // }));
  }
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
