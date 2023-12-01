import { mapObject, isEmpty } from "underscore"
import { nyplApiClientPost } from "../server/nyplApiClient"
// import { isEmail } from "validator"

/**
 * validate(form, cb)
 *
 * @param {object} form
 * @param {function} cb
 * return {boolean}
 */
export function validate(form, cb) {
  const fieldsToCheck = {
    emailAddress: {
      // validate: (val) => val.trim().length && isEmail("" + val),
      validate: (val) => val.trim().length,
      errorMsg:
        "Enter a valid email address. Your request will be delivered to " +
        "the email address you enter above.",
    },
    chapterTitle: {
      validate: (val) => !!val.trim().length,
      errorMsg:
        "Indicate the title of the chapter or article you are requesting. ",
    },
    startPage: {
      validate: (val) => !!val.trim().length,
      errorMsg: "Enter a page number. You may request a maximum of 50 pages.",
    },
    endPage: {
      validate: (val) => !!val.trim().length,
      errorMsg: "Enter a page number. You may request a maximum of 50 pages.",
    },
  }

  const error = {}
  mapObject(form, (val, key) => {
    const isValid = fieldsToCheck[key] ? fieldsToCheck[key].validate(val) : true

    if (!isValid) {
      error[key] = fieldsToCheck[key].errorMsg
    }
  })

  cb(error)

  if (!isEmpty(error)) {
    return false
  }

  return true
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
 * @param {function} cb - callback when we have valid response
 * @param {function} errorCb - callback when error
 * @return {function}
 */
export function postHoldAPI(
  req,
  pickedUpItemId,
  pickupLocation,
  docDeliveryData,
  itemSource,
  cb,
  errorCb
) {
  // retrieve patron info
  const patronId = req.patronTokenResponse.decodedPatron.sub
  const holdRequestEndpoint = "/hold-requests"

  // get item id and pickup location
  // NOTE: pickedUpItemId and pickedUpBibId are coming from the EDD form function below:
  let itemId = req.params.itemId || pickedUpItemId
  itemId = itemId.replace(/\D/g, "")

  const data = {
    patron: patronId,
    record: itemId,
    nyplSource: itemSource,
    requestType: pickupLocation === "edd" ? "edd" : "hold",
    recordType: "i",
    pickupLocation: pickupLocation === "edd" ? null : pickupLocation,
    // neededBy: "2013-03-20",
    numberOfCopies: 1,
    docDeliveryData: pickupLocation === "edd" ? docDeliveryData : null,
  }
  // logger.info("Making hold request in postHoldAPI", data)

  return nyplApiClientPost(holdRequestEndpoint, data).then(cb).catch(errorCb)
}
