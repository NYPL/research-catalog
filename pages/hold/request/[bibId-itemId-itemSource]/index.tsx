import Head from "next/head"

import { extractFeatures } from "../../../../src/utils/appUtils"
import { Heading } from "@nypl/design-system-react-components"
import { fetchBib } from "../../../api/bib/index"
import { LibraryItem } from "../../../api/hold/confirmation/[bibId-itemId]"
import isAeonUrl from "../../../../src/utils/aeonLinkUtils"
import User from "../../../../src/utils/userUtils"
import {
  getDeliveryLocations,
  mapLocationDetails,
  modelDeliveryLocationName,
} from "../../../../src/utils/holdUtils"
import { appConfig } from "../../../../src/config/config"

export default function Request() {
  return (
    <>
      <Head>
        <title>Request</title>
      </Head>
      <Heading>Request</Heading>
    </>
  )
}

/**
 * newHoldRequest()
 * The function to return the bib and item data with its delivery locations
 * to the hold request route.
 *
 * This is based on `newHoldRequest` in DFE.
 */
async function newHoldRequest(req, res) {
  const paramString = req.query["bibId-itemId-itemSource"] || ""
  const [bibId, itemId, itemSource] = paramString.split("-")
  const bibAndItemId = (bibId || "") + (itemId ? `-${itemId}` : "")
  const patronId = req.patronTokenResponse?.decodedPatron?.sub || ""
  const { features } = req.query
  const urlEnabledFeatures = extractFeatures(features)
  let barcode

  // Retrieve item
  try {
    const bibResponseData = await fetchBib(
      bibAndItemId,
      {}
      // {
      //   fetchSubjectHeadingData: false,
      //   features: urlEnabledFeatures,
      // }
    )
    const { bib } = bibResponseData
    barcode = LibraryItem.getItem(bib, itemId).barcode
    const urlIsAeon = bib.items
      .map(({ aeonUrl }) => aeonUrl && aeonUrl[0])
      .find(isAeonUrl)

    if (urlIsAeon) {
      res.redirect(urlIsAeon)
      return { redirect: true }
    }

    const { redirect } = User.requireUser(req, res)
    if (redirect) {
      return { redirect: redirect }
    }

    const eligibilityResponse = await User.eligibility(req, res)
    if (eligibilityResponse.redirect) {
      return { redirect: eligibilityResponse.redirect }
    }

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

      return {
        bib,
        deliveryLocations,
        isEddRequestable,
      }
    } catch (error) {
      console.log(error)
      // logger.error(
      //   `Error retrieving serverside delivery locations in newHoldRequest, bibId: ${bibId}`,
      //   error,
      // );
      return {
        bib,
        deliveryLocations: [],
        isEddRequestable: false,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 *
 */
export async function getServerSideProps(req, res) {
  // call newHoldRequest function
  await newHoldRequest(req, res)
  return {}
}
