import type { NextApiRequest, NextApiResponse } from "next"
import initializePatronTokenAuth from "../../../../../src/server/auth"

import {
  postEDDRequest,
  fetchPatronEligibility,
} from "../../../../../src/server/api/hold"
import {
  defaultValidatedEDDFields,
  validateEDDForm,
  eddFormIsInvalid,
} from "../../../../../src/utils/holdPageUtils"
import { BASE_URL, PATHS } from "../../../../../src/config/constants"
import { encodeURIComponentWithPeriods } from "../../../../../src/utils/appUtils"

/**
 * Default API route handler for EDD requests
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(500).json({
      error: "Please use a POST request for the EDD Request API endpoint",
    })
  }

  try {
    const { patronId, jsEnabled, ...rest } =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body

    const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
    const cookiePatronId = patronTokenResponse.decodedPatron?.sub

    // Return a 403 if patron cookie does not patch patron id in request
    if (!cookiePatronId || cookiePatronId !== patronId) {
      return res.status(403).json("EDD Request API - No authenticated patron")
    }

    const formState = rest
    const holdId = req.query.id as string

    // Server-side form validation
    const validatedFields = validateEDDForm(
      formState,
      defaultValidatedEDDFields
    )

    const [bibId, itemId] = holdId.split("-")

    const patronEligibilityStatus = await fetchPatronEligibility(patronId)

    if (patronEligibilityStatus.status === 401) {
      switch (jsEnabled) {
        case true:
          return res.status(401).json({
            patronEligibilityStatus,
          })

        // Server side redirect on ineligibility when Js is disabled
        default:
          return res.redirect(
            `${BASE_URL}${
              PATHS.HOLD_REQUEST
            }/${holdId}/edd?patronEligibilityStatus=${JSON.stringify(
              patronEligibilityStatus
            )}`
          )
      }
    }

    const eddRequestResponse = await postEDDRequest({
      ...formState,
      itemId,
      patronId,
      bibId,
    })

    const { requestId } = eddRequestResponse

    if (!requestId) {
      throw new Error("Malformed response from hold request API")
    }

    // Return a 200 status when the hold request is posted successfully via JS fetch
    if (jsEnabled) {
      return res.status(200).json({
        requestId,
      })
    }

    // JS-Disabled error validation/redirect
    const formInvalid = eddFormIsInvalid(validatedFields)

    if (formInvalid) {
      const formInvalidQuery = `formInvalid=${JSON.stringify(formInvalid)}`
      const validatedFieldsQuery = `validatedFields=${JSON.stringify(
        validatedFields
      )}`
      const formStateQuery = `formState=${JSON.stringify(formState)}`

      const invalidFormRedirectUrl = encodeURIComponentWithPeriods(
        `${BASE_URL}${PATHS.HOLD_REQUEST}/${holdId}/edd?${formInvalidQuery}&${validatedFieldsQuery}&${formStateQuery}`
      )

      return res.redirect(invalidFormRedirectUrl)
    }

    // Redirect to confirmation page if there are no errors
    return res.redirect(
      `${BASE_URL}${PATHS.HOLD_CONFIRMATION}/${holdId}?pickupLocation=edd&requestId=${requestId}`
    )
  } catch (error) {
    const { statusText } = error as Response

    return res.status(500).json({
      title: "Error posting EDD request to Discovery API",
      status: 500,
      detail: statusText || error.message,
    })
  }
}

export default handler
