import { mapObject } from "underscore"
import { nyplApiClientGet, nyplApiClientPost } from "../server/nyplApiClient"
import { locationSlugForLocation } from "./locationUtils"
import locationDetails from "../../locations"
import { appConfig } from "../config/config"
// import { isEmail } from "validator"

/**
 * validate(form)
 *
 * @param {object} form
 */
export function validate(form) {
  const fieldsToCheck = {
    emailAddress: {
      // validate: (val) => val.trim().length && isEmail("" + val),
      validate: (val) => val.trim().length,
      errorMessage:
        "Enter a valid email address. Your request will be delivered to " +
        "the email address you enter above.",
    },
    chapterTitle: {
      validate: (val) => !!val.trim().length,
      errorMessage:
        "Indicate the title of the chapter or article you are requesting. ",
    },
    startPage: {
      validate: (val) => !!val.trim().length,
      errorMessage:
        "Enter a page number. You may request a maximum of 50 pages.",
    },
    endPage: {
      validate: (val) => !!val.trim().length,
      errorMessage:
        "Enter a page number. You may request a maximum of 50 pages.",
    },
  }

  const errors = {}
  mapObject(form, (val, key) => {
    const isValid = fieldsToCheck[key] ? fieldsToCheck[key].validate(val) : true

    if (!isValid) {
      errors[key] = fieldsToCheck[key].errorMessage
    }
  })

  return errors
}

/**
 * postHoldAPI(req, pickedUpItemId, pickupLocation, cb, errorCb)
 * The function to make a POST request to the hold request API.
 *
 * @param {req} req
 * @param {string} pickedUpItemId
 * @param {string} pickupLocation
 * @param {object} docDeliveryData
 * @param {string} itemSource The source of the item, either nypl, cul, or pul.
 * @return {function}
 */
export async function postHoldAPI({
  patronId,
  itemId,
  pickupLocation,
  docDeliveryData,
  itemSource,
}) {
  const holdRequestEndpoint = "/hold-requests"
  const updatedItemId = itemId.replace(/\D/g, "")

  const data = {
    patron: patronId,
    record: updatedItemId,
    nyplSource: itemSource,
    requestType: pickupLocation === "edd" ? "edd" : "hold",
    recordType: "i",
    pickupLocation: pickupLocation === "edd" ? null : pickupLocation,
    numberOfCopies: 1,
    docDeliveryData: pickupLocation === "edd" ? docDeliveryData : null,
  }
  // logger.info("Making hold request in postHoldAPI", data)

  return nyplApiClientPost(holdRequestEndpoint, data)
}

/**
 * mapLocationDetails(locations)
 * The function attaches `.address` and `.shortName` properties to the
 * array of locations
 *
 * @param {array} locations
 * @return {array}
 */
function mapLocationDetails(locations) {
  return locations.map((loc) => {
    const slug = locationSlugForLocation(loc)
    if (slug && locationDetails[slug]) {
      const details = locationDetails[slug]

      loc.address = details.address.address1
      loc.shortName = details["short-name"]
    }
    return loc
  })
}

/**
 * modelDeliveryLocationName(prefLabel, shortName)
 * Renders the names of the radio input fields of delivery locations except EDD.
 *
 * @param {String} prefLabel
 * @param {String} shortName
 * @return {String}
 */
function modelDeliveryLocationName(prefLabel, shortName) {
  if (prefLabel && typeof prefLabel === "string" && shortName) {
    const deliveryRoom = prefLabel.split(" - ")[1]
      ? ` - ${prefLabel.split(" - ")[1]}`
      : ""

    return `${shortName}${deliveryRoom}`
  }

  return ""
}

/**
 * getDeliveryLocations(barcode, patronId, cb, errorCb)
 * The function to make a request to get delivery locations of an item.
 *
 * @param {string} barcode
 * @param {string} patronId
 * @param {function} cb - callback when we have valid response
 * @param {function} errorCb - callback when error
 * @return {function}
 */
export async function getDeliveryLocations(barcode, patronId, cb, errorCb) {
  const deliveryEndpoint =
    `/request/deliveryLocationsByBarcode?barcodes[]=${barcode}` +
    `&patronId=${patronId}`

  return nyplApiClientGet(deliveryEndpoint)
    .then((barcodeAPIresponse) => {
      const eddRequestable =
        barcodeAPIresponse &&
        barcodeAPIresponse.itemListElement &&
        barcodeAPIresponse.itemListElement.length &&
        barcodeAPIresponse.itemListElement[0].eddRequestable
          ? barcodeAPIresponse.itemListElement[0].eddRequestable
          : false
      let deliveryLocationWithAddress =
        barcodeAPIresponse &&
        barcodeAPIresponse.itemListElement &&
        barcodeAPIresponse.itemListElement.length &&
        barcodeAPIresponse.itemListElement[0].deliveryLocation
          ? mapLocationDetails(
              barcodeAPIresponse.itemListElement[0].deliveryLocation
            )
          : []

      const { closedLocations } = appConfig
      deliveryLocationWithAddress = deliveryLocationWithAddress.filter(
        (location) =>
          !closedLocations.some((closedLocation) =>
            modelDeliveryLocationName(
              location.prefLabel,
              location.shortName
            ).startsWith(closedLocation)
          )
      )

      cb(deliveryLocationWithAddress, eddRequestable)
    })
    .catch((barcodeAPIError) => {
      // logger.error(
      //   "Error attemping to make server side call using nyplApiClient in getDeliveryLocations" +
      //     `, endpoint: ${deliveryEndpoint}`,
      //   barcodeAPIError
      // )
      errorCb(barcodeAPIError)
    })
}
