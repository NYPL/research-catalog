import Head from "next/head"

export default function Request() {
  return (
    <>
      <Head>
        <title>Request</title>
      </Head>
    </>
  )
}

const extractFeatures = (featuresString) => {
  if (typeof featuresString !== "string") return []
  return featuresString.split(",").reduce((features, feature) => {
    if (feature.length) features.push(feature.trim())
    return features
  }, [])
}

/**
 * newHoldRequest(req, res, next)
 * The function to return the bib and item data with its delivery locations to the
 * hold request route.
 *
 * @param {req}
 * @param {res}
 * @return {function}
 */
function newHoldRequest(req, res, resolve) {
  console.log("newHoldRequest")
  const bibId =
    (req.params.bibId || "") +
    (req.params.itemId ? `-${req.params.itemId}` : "")
  const patronId = req.patronTokenResponse.decodedPatron
    ? req.patronTokenResponse.decodedPatron.sub
    : ""
  let barcode
  const { features } = req.query
  const urlEnabledFeatures = extractFeatures(features)

  // Retrieve item
  return {}
  // return Bib.fetchBib(
  //   bibId,
  //   (bibResponseData) => {
  //     const { bib } = bibResponseData
  //     barcode = LibraryItem.getItem(bib, req.params.itemId).barcode

  //     const urlIsAeon = bib.items
  //       .map(({ aeonUrl }) => aeonUrl && aeonUrl[0])
  //       .find(isAeonUrl)

  //     if (urlIsAeon) {
  //       res.redirect(urlIsAeon)
  //       return resolve({ redirect: true })
  //     }

  //     const userRedirect = User.requireUser(req, res).redirect
  //     if (userRedirect) {
  //       return resolve({ redirect: userRedirect })
  //     }
  //     return User.eligibility(req, res).then((eligibilityResponse) => {
  //       if (eligibilityResponse.redirect) {
  //         return resolve({ redirect: eligibilityResponse.redirect })
  //       }

  //       return getDeliveryLocations(
  //         barcode,
  //         patronId,
  //         (deliveryLocations, isEddRequestable) => {
  //           resolve({
  //             bib,
  //             deliveryLocations,
  //             isEddRequestable,
  //           })
  //         },
  //         (deliveryLocationsError) => {
  //           // logger.error(
  //           //   `Error retrieving serverside delivery locations in newHoldRequest, bibId: ${bibId}`,
  //           //   deliveryLocationsError,
  //           // );

  //           resolve({
  //             bib,
  //             deliveryLocations: [],
  //             isEddRequestable: false,
  //           })
  //         }
  //       )
  //     })
  //   },
  //   (bibResponseError) => resolve(bibResponseError),
  //   {
  //     fetchSubjectHeadingData: false,
  //     features: urlEnabledFeatures,
  //   }
  // )
}

/**
 *
 */
export async function getServerSideProps() {
  // call newHoldRequest function

  return {}
}
